teamTableDict = {};
teamColors = {
    "ASHUR": "#ca5425",
    "ISHTAR": "#dc1917",
    "NIMROD": "#f6d40f",
    "HAKKARI": "#1c1c1c",
    "NINEVEH": "#ffffff",
    "BABYLON": "#2747f4"
}
function addEntry() {
    teamTableDict[team] = points;
    var team = document.getElementById("teamName").value;
    var points = document.getElementById("teamPoints").value;
    var table = document.getElementById("teamTable");
    // Create an empty <tr> element and add it to the 1st position of the table:
    var row = table.insertRow(-1);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    // Add some text to the new cells:
    cell1.innerHTML = team;
    cell2.innerHTML = points;

    if (team in teamColors){
        cell1.style.backgroundColor = teamColors[team];
        cell2.style.backgroundColor = darkenTeamColor(teamColors[team]); 
        cell1.style.color = determineFontColor(teamColors[team]);
        cell2.style.color = "white";
    }

    document.getElementById("teamName").value = "";
    document.getElementById("teamPoints").value = "";
    sortTable();
}

function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("teamTable");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("td")[1];
        y = rows[i + 1].getElementsByTagName("td")[1];
        console.log(x.innerHTML);
        // Check if the two rows should switch place:
        if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }

function darkenTeamColor(color) {
    [h, s, l] = HEXtoHSL(color);
    l-=Math.max(0, l-23);
    return HSLToHex(h, s, l);
}

function determineFontColor(teamColor) {
    const r = parseInt(teamColor.substr(1,2), 16) / 255
    const g = parseInt(teamColor.substr(3,2), 16) / 255
    const b = parseInt(teamColor.substr(5,2), 16) / 255
    var lightness = (0.2126*r) + (0.7152*g) + (0.0722*b)
    console.log("lightness "+ lightness)
    var fontColor;
    if (lightness > .5) {
        return "black";
    } else {
        return "white";
    }
}

function HEXtoHSL(H) {
  // Convert hex to RGB first
  let r = 0, g = 0, b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
}

function HSLToHex(h,s,l) {
    s /= 100;
    l /= 100;
  
    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c/2,
        r = 0,
        g = 0, 
        b = 0; 
  
    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);
  
    // Prepend 0s, if necessary
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
  }