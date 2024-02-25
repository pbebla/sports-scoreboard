const display = document.getElementById('clock');
const homeScoreDisplay = document.getElementById('homeScore');
const awayScoreDisplay = document.getElementById('awayScore');
let minutes = 1;
let seconds = 0;
let minutesDisplay = formatTime(minutes);
let secondsDisplay = formatTime(seconds);
let ms = 0;
let isRunning = false;
var interval;
let homeScore = 0;
let awayScore = 0;
var clockDirection = "down";
var homeJsonPath = 'home.json';
var awayJsonPath = 'away.json';

function updateHomeScore(offset) {
    homeScore += offset;
    homeScoreDisplay.innerHTML = homeScore;
}

function updateAwayScore(offset) {
    awayScore += offset;
    awayScoreDisplay.innerHTML = awayScore;
}

function updateClockDirection() {
    if (clockDirection == "down") {
        clockDirection = "up";
        document.getElementById('clockDirection').innerHTML = "Clock Tick Down";
    } else {
        clockDirection = "down";
        document.getElementById('clockDirection').innerHTML = "Clock Tick Up";
    }
}

function updateTime() {
    if (clockDirection == "down" && minutes == 0 && seconds == 0 && ms == 0) {
        isRunning = false;
        clearInterval(interval);
    }
    if (isRunning) {
/*         if (clockDirection == "down") {
            if (seconds == 0) {
                minutes-=1;
                seconds = 59;
            } else {
                seconds -=1;
            }
        } else {
            if (seconds == 59) {
                minutes++;
                seconds = 0;
            } else {
                seconds ++;
            }
        }  */
        if (clockDirection == "down") {
            if(ms == 0) {
                ms = 9;
                if (seconds == 0) {
                    minutes-=1;
                    seconds = 59;
                } else {
                    seconds -=1;
                }
            } else {
                ms -=1;
            }
        } else {
            if(ms == 9) {
                ms = 0;
                if (seconds == 59) {
                    minutes++;
                    seconds = 0;
                } else {
                    seconds ++;
                }
            } else {
                ms++;
            }
        }  
    }
    minutesDisplay = formatTime(minutes);
    secondsDisplay = formatTime(seconds);
    if (minutes > 0) {
        display.innerHTML=`${minutesDisplay} : ${secondsDisplay}`
    } else {
        if (clockDirection == "down") {
            display.innerHTML=`${secondsDisplay}.${ms}`
        } else {
            display.innerHTML=`:${secondsDisplay}`
        }
    }
}

function formatTime(time) {
    if ( time < 10 ) {
        return '0' + time;
    }
    return time;
}

function startStopTimer() {
    isRunning = !isRunning;
    if (isRunning) {
        interval = setInterval(updateTime, 100);
        document.getElementById('timerButton').innerHTML = "Stop";
    } else {
        clearInterval(interval);
        document.getElementById('timerButton').innerHTML = "Start";
    }
}

function setTime() {
    if (document.getElementById("minutes").value=='') {
        document.getElementById("minutes").value = 25;
    }
    if (document.getElementById("seconds").value=='') {
        document.getElementById("seconds").value = 0;
    }
    if (document.getElementById("ms").value=='') {
        document.getElementById("ms").value = 0;
    }
    minutes = document.getElementById("minutes").value;
    seconds = document.getElementById("seconds").value;
    minutesDisplay = formatTime(minutes);
    secondsDisplay = formatTime(seconds);
    if (minutes > 0) {
        display.innerHTML=`${minutesDisplay} : ${secondsDisplay}`
    } else {
        ms = document.getElementById("ms").value;
        display.innerHTML=`${secondsDisplay}.${ms}`
    }
}

function toggleTimeDisplay() {
    var current = window.getComputedStyle(document.getElementById('clock')).getPropertyValue('visibility');
    console.log(current);
    if (current == "visible"){
        document.getElementById('clock').style.visibility = "hidden";
    } else {
        document.getElementById('clock').style.visibility = "visible";
    }
}

function showMe(e) {
    if(e.value == 0){
        document.getElementById("ms").removeAttribute("disabled");
    }
    else{
        document.getElementById("ms").setAttribute("disabled", 'disabled');
        document.getElementById("ms").value = 0;
        ms = 0;
    }
  }

display.innerHTML=`${minutesDisplay} : ${secondsDisplay}`
homeScoreDisplay.innerHTML = homeScore;
awayScoreDisplay.innerHTML = awayScore;
var homeAnimation;
var awayAnimation;

function loadHomeGoalAnimation(){
    console.log(homeJsonPath)
    homeAnimation = bodymovin.loadAnimation({
        container: document.getElementById('homeContainer'), // Required
        path: homeJsonPath, // Required
        renderer: 'svg', // Required
        loop: false, // Optional
        autoplay: false, // Optional
        name: "Hello World", // Name for future reference. Optional.
      });
}

function loadAwayGoalAnimation(){
    console.log(awayJsonPath)
    awayAnimation = bodymovin.loadAnimation({
        container: document.getElementById('awayContainer'), // Required
        path: awayJsonPath, // Required
        renderer: 'svg', // Required
        loop: false, // Optional
        autoplay: false, // Optional
        name: "Hello World", // Name for future reference. Optional.
      });
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

async function homeGoal() {
    if (homeAnimation != null){
        homeAnimation.destroy();
        loadHomeGoalAnimation();
        homeAnimation.play();
    } else {
        loadHomeGoalAnimation();
        homeAnimation.play();
    }
    await sleep(1000);
    homeScore+=1;
    homeScoreDisplay.innerHTML = homeScore;

}

async function awayGoal() {
    if (awayAnimation != null){
        awayAnimation.destroy();
        loadAwayGoalAnimation();
        awayAnimation.play();
    } else {
        loadAwayGoalAnimation();
        awayAnimation.play();
    }
    await sleep(1000);
    awayScore+=1;
    awayScoreDisplay.innerHTML = awayScore;

}

document.getElementById('periodDisplay').innerHTML = document.getElementById('period').value;
function showPeriod() {
    //First grab your select
  var select = document.getElementById('period');
    //Then get it's value
  var period = select.value;
    //After that you just need to write it somewhere in the document
    document.getElementById('periodDisplay').innerHTML = period;
}

let colorPicker;

window.addEventListener("load", startup, false);

function toHexString(num) {
    if (num < 16) {
        return '0' + num;
    }
    else {
        return num;
    }
}

function startup() {
    fetch('/home.json').then((response) => response.json())
        .then((data) => {
        var r = toHexString((data['layers']['10']['shapes']['0']['it']['1']['c']['k']['0'] * 255).toString(16));
        var g = toHexString((data['layers']['10']['shapes']['0']['it']['1']['c']['k']['1'] * 255).toString(16));
        var b = toHexString((data['layers']['10']['shapes']['0']['it']['1']['c']['k']['2'] * 255).toString(16));

        var r2 = toHexString((data['layers']['0']['shapes']['0']['it']['2']['c']['k']['0'] * 255).toString(16));
        var g2 = toHexString((data['layers']['0']['shapes']['0']['it']['2']['c']['k']['1'] * 255).toString(16));
        var b2 = toHexString((data['layers']['0']['shapes']['0']['it']['2']['c']['k']['2'] * 255).toString(16));

        hexString = '#' + r + g + b;
        hexString2 = '#' + r2 + g2 + b2;
        
        document.getElementById('homeColorSelection').setAttribute('value', hexString);
        document.getElementById('homeColor').style.backgroundColor = hexString;
        document.getElementById('home2ndColorSelection').setAttribute('value', hexString2);

        var name = data['layers']['2']['t']['d']['k']['0']['s']['t'];

        document.getElementById('homeFullName').value = name;
        setName('home', 'homeFullName');
        
    });

    fetch('/away.json').then((response) => response.json())
    .then((data) => {
        var r = toHexString((data['layers']['10']['shapes']['0']['it']['1']['c']['k']['0'] * 255).toString(16));
        var g = toHexString((data['layers']['10']['shapes']['0']['it']['1']['c']['k']['1'] * 255).toString(16));
        var b = toHexString((data['layers']['10']['shapes']['0']['it']['1']['c']['k']['2'] * 255).toString(16));

        var r2 = toHexString((data['layers']['0']['shapes']['0']['it']['2']['c']['k']['0'] * 255).toString(16));
        var g2 = toHexString((data['layers']['0']['shapes']['0']['it']['2']['c']['k']['1'] * 255).toString(16));
        var b2 = toHexString((data['layers']['0']['shapes']['0']['it']['2']['c']['k']['2'] * 255).toString(16));

        hexString = '#' + r + g + b;
        hexString2 = '#' + r2 + g2 + b2;

        document.getElementById('awayColorSelection').setAttribute('value', hexString);
        document.getElementById('awayColor').style.backgroundColor = hexString;
        document.getElementById('away2ndColorSelection').setAttribute('value', hexString2);

        var name = data['layers']['2']['t']['d']['k']['0']['s']['t'];

        document.getElementById('awayFullName').value = name;
        setName('away', 'awayFullName');
    });

    homeColorPicker = document.querySelector("#homeColorSelection");
    //homeColorPicker.addEventListener("input", updateFirst, false);
    homeColorPicker.addEventListener("change", updateHomeColors, false);
    homeColorPicker.select();

    home2ndColorPicker = document.querySelector("#home2ndColorSelection");
    //home2ndColorPicker.addEventListener("input", updateFirst, false);
    home2ndColorPicker.addEventListener("change", updateHome2ndColors, false);
    home2ndColorPicker.select();

    awayColorPicker = document.querySelector("#awayColorSelection");
    //awayColorPicker.addEventListener("input", updateFirst, false);
    awayColorPicker.addEventListener("change", updateAwayColors, false);
    awayColorPicker.select();

    away2ndColorPicker = document.querySelector("#away2ndColorSelection");
    //away2ndColorPicker.addEventListener("input", updateFirst, false);
    away2ndColorPicker.addEventListener("change", updateAway2ndColors, false);
    away2ndColorPicker.select();

}

function updateHomeColors(event) {
    var name;
    if (document.getElementById('board-type').value == "Short") {
        name = "short-homeName";
        updateColors(event, './short_home.json', 'homeColor', '/short-homeJSON', name);
    } else {
        name = "homeName";
        updateColors(event, './home.json', 'homeColor', '/homeJSON', name);
    }
}

function updateAwayColors(event) {
    var name;
    if (document.getElementById('board-type').value == "Short") {
        name = "short-awayName";
        updateColors(event, './short_away.json', 'awayColor', '/short-awayJSON', name);
    } else {
        name = "awayName";
        updateColors(event, './away.json', 'awayColor', '/awayJSON', name);
    }
}

function updateHome2ndColors(event) {
    if (document.getElementById('board-type').value == "Short") {
        update2ndColors(event, './short_home.json', 'homeColor', '/short-homeJSON');
    } else {
        update2ndColors(event, './home.json', 'homeColor', '/homeJSON');
    }
}

function updateAway2ndColors(event) {
    if (document.getElementById('board-type').value == "Short") {
        update2ndColors(event, './short_away.json', 'awayColor', '/short-awayJSON');
    } else {
        update2ndColors(event, './away.json', 'awayColor', '/awayJSON');
    }
}

function updateColors(ev, json, id, postURL, name) {
    const color = ev.target.value
    const r = parseInt(color.substr(1,2), 16) / 255
    const g = parseInt(color.substr(3,2), 16) / 255
    const b = parseInt(color.substr(5,2), 16) / 255
    var lightness = (0.2126*r) + (0.7152*g) + (0.0722*b)
    console.log("lightness "+ lightness)
    var fontColor;
    if (lightness > .5) {
        document.getElementById(name).style.color = "black";
        fontColor = 0;
    } else {
        document.getElementById(name).style.color = "white";
        fontColor = 1;
    }

    fetch(json).then((response) => response.json())
    .then((data) => {
        data['layers']['10']['shapes']['0']['it']['1']['c']['k']['0'] = r;
        data['layers']['10']['shapes']['0']['it']['1']['c']['k']['1'] = g;
        data['layers']['10']['shapes']['0']['it']['1']['c']['k']['2'] = b;

        data['layers']['2']['t']['d']['k']['0']['s']['fc']['0'] = fontColor;
        data['layers']['2']['t']['d']['k']['0']['s']['fc']['1'] = fontColor;
        data['layers']['2']['t']['d']['k']['0']['s']['fc']['2'] = fontColor;

        data['layers']['4']['t']['d']['k']['0']['s']['fc']['0'] = fontColor;
        data['layers']['4']['t']['d']['k']['0']['s']['fc']['1'] = fontColor;
        data['layers']['4']['t']['d']['k']['0']['s']['fc']['2'] = fontColor;
        fetch(postURL, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    });
    document.getElementById(id).style.backgroundColor = color;

    console.log(`red: ${r}, green: ${g}, blue: ${b}`)
}

function update2ndColors(ev, json, id, postURL) {
    const color = ev.target.value
    const r = parseInt(color.substr(1,2), 16) / 255
    const g = parseInt(color.substr(3,2), 16) / 255
    const b = parseInt(color.substr(5,2), 16) / 255
    fetch(json).then((response) => response.json())
    .then((data) => {
        data['layers']['0']['shapes']['0']['it']['2']['c']['k']['0'] = r;
        data['layers']['0']['shapes']['0']['it']['2']['c']['k']['1'] = g;
        data['layers']['0']['shapes']['0']['it']['2']['c']['k']['2'] = b;
        fetch(postURL, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    });

    console.log(`red: ${r}, green: ${g}, blue: ${b}`)
}

const homeNameBox = document.getElementById('homeNameBoxClass');
var homeName = document.getElementById("homeName");

const awayNameBox = document.getElementById('awayNameBoxClass');
var awayName = document.getElementById("awayName");

function calcTextWidth(name, nameBox, nameElement) {
	const parentContainerWidth = name.parentNode.clientWidth;

	const currentTextWidth = name.scrollWidth;
	const currentFontStretch = parseInt(window.getComputedStyle(name).fontStretch);
	
	var newValue = 0;
    if (currentTextWidth > parentContainerWidth) {
        newValue = 50;
    } else {
        newValue = 100;
    }

    name.style.setProperty('--fontStretch', newValue + '%');
    const newTextWidth = name.scrollWidth;
    
    if (newTextWidth > parentContainerWidth) {
        calcTextSize(name);
        let { width: ww, height: wh } = nameBox.getBoundingClientRect();
        let { width: cw, height: ch } = nameElement.getBoundingClientRect();
    
        let scaleAmtX = ww / cw;
        let scaleAmtY = wh / ch;
        nameElement.style.setProperty('-webkit-transform', `scale(1, ${scaleAmtY})`);
    }

    console.log('parent: ' + parentContainerWidth + ' textwidth: ' + currentTextWidth + ' stretch: ' +currentFontStretch + ' new width: ' + newTextWidth);

	//const newValue = Math.min(Math.max(300, (parentContainerWidth / currentTextWidth) * currentFontStretch), 500)
}

function calcTextSize(name) {
	const parentContainerWidth = name.parentNode.clientWidth;
	const currentTextWidth = name.scrollWidth;
    if (currentTextWidth == 0) {
        return;
    }
	const currentFontSize = parseInt(window.getComputedStyle(name).fontSize);
	var newValue = Math.min(Math.max(16, (parentContainerWidth / currentTextWidth) * currentFontSize), 500);
    name.style.setProperty('--fontSize', (newValue /parentContainerWidth *100) +'cqw');
    //name.style.setProperty('--fontSize', (newValue) +'px');
    console.log('parent: ' + parentContainerWidth + ' textwidth: ' + currentTextWidth + ' size: ' +currentFontSize + ' new: ' + newValue);
}

function setName(type, abbr) {
    var name = type+"Name";
    var shortName = "short-"+name;
    var nameBox;
    var nameElement = document.getElementById(name);
    var shortNameElement = document.getElementById(shortName);
    var newName = document.getElementById(abbr).value;
    var newShortName = document.getElementById(type+"Abbr").value;
    if (nameElement) {
        nameElement.innerHTML = newName;
        nameElement.style.setProperty('-webkit-transform', `scale(1, 1)`);
        if (document.getElementById('board-type').value == "Short") {
            nameElement.style.setProperty('--fontSize', '42cqw');
        } else {
            nameElement.style.setProperty('--fontSize', '26cqw');
        }
    }
    if (shortNameElement) {
        shortNameElement.innerHTML = newShortName;
        shortNameElement.style.setProperty('-webkit-transform', `scale(1, 1)`);
        if (document.getElementById('board-type').value == "Short") {
            shortNameElement.style.setProperty('--fontSize', '42cqw');
        } else {
            shortNameElement.style.setProperty('--fontSize', '26cqw');
        }
    }
    if (type=="home") {
        nameBox = document.getElementById('homeNameBoxClass');
        if (nameElement) {
            calcTextWidth(homeName, nameBox, nameElement);
        } else {
            calcTextWidth(homeName, nameBox, shortNameElement);
        }
        updateName(homeName, newName, './home.json', '/homeJSON');
        updateName(homeName, newName, './short_home.json', '/short-homeJSON');
    } else if (type=="away") {
        nameBox = document.getElementById('awayNameBoxClass');
        if (nameElement) {
            calcTextWidth(awayName, nameBox, nameElement);
        } else {
            calcTextWidth(awayName, nameBox, shortNameElement);
        }
        updateName(awayName, newName, './away.json', '/awayJSON');
        updateName(awayName, newName, './short_away.json', '/short-awayJSON');
    }
}

function updateName(nameElement, name, json, postURL) {
    fetch(json).then((response) => response.json())
    .then((data) => {
        data['layers']['2']['t']['d']['k']['0']['s']['t'] = name;
        fetch(postURL, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    });
}

var homeForm = document.getElementById("homeForm");
var awayForm = document.getElementById("awayForm");

async function handleHomeForm(event) {
    event.preventDefault();

    var img = new Image();
    var width, height;
    var _URL = window.URL || window.webkitURL;
    console.log(document.getElementById('homeFile'));
    var objectUrl = _URL.createObjectURL((document.getElementById('homeFile').files[0]));
    img.onload = function () {
        width = 205;
        height = (img.height*width) / img.width;
        _URL.revokeObjectURL(objectUrl);
    };
    img.src = objectUrl;

    var data = new FormData(document.getElementById('homeForm'));
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/homePNG", false);
    xhr.send(data);

    fetch('./home.json').then((response) => response.json())
    .then((data) => {
        data['assets']['0']['w'] = width;
        data['assets']['0']['h'] = height;
        fetch('/homeJSON', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    });

    fetch("public/images/homePic.png", {cache: 'reload', mode: 'no-cors'})
    .then(document.getElementById('homePic').src = "public/images/homePic.png");
    return false;
} 

async function handleAwayForm(event) {
    event.preventDefault();

    var img = new Image();
    var width, height;
    var _URL = window.URL || window.webkitURL;
    console.log(document.getElementById('awayFile'));
    var objectUrl = _URL.createObjectURL((document.getElementById('awayFile').files[0]));
    img.onload = function () {
        width = 205;
        height = (img.height*width) / img.width;
        _URL.revokeObjectURL(objectUrl);
    };
    img.src = objectUrl;

    var data = new FormData(document.getElementById('awayForm'));
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/awayPNG", false);
    xhr.send(data);

    fetch('./away.json').then((response) => response.json())
    .then((data) => {
        data['assets']['0']['w'] = width;
        data['assets']['0']['h'] = height;
        fetch('/awayJSON', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    });

    fetch("public/images/awayPic.png", {cache: 'reload', mode: 'no-cors'})
    .then(document.getElementById('awayPic').src = "public/images/awayPic.png");
    return false;
} 


homeForm.addEventListener('submit', handleHomeForm);
awayForm.addEventListener('submit', handleAwayForm);

Mousetrap.bind('space', function(e) {
    e.preventDefault();
    startStopTimer();
});

function changeBoardType() {
    var template = document.getElementById('template');
    var select = document.getElementById('board-type');
    //Then get it's value
    var type = select.value;
    console.log(type);
    if (type == "Short") {
        template.src = "public/images/short-comp.png";

        document.getElementsByClassName("scoreboard")[0].className = "short-scoreboard";

        homeJsonPath = 'short_home.json';
        awayJsonPath = 'short_away.json';

        document.getElementById("homeContainer").className = 'short-videoContainer';
        document.getElementById("awayContainer").className = 'short-videoContainer';

        document.getElementsByClassName("homeColorBox")[0].className = "short-homeColorBox";
        document.getElementsByClassName("awayColorBox")[0].className = "short-awayColorBox";
        
        document.getElementById('homeNameBoxClass').className = "short-homeNameBox";
        document.getElementById('awayNameBoxClass').className = "short-awayNameBox";

        homeName.id = "short-homeName";
        awayName.id = "short-awayName";
        homeName = document.getElementById("short-homeName");
        awayName = document.getElementById("short-awayName");
        console.log(homeName);

        document.getElementsByClassName("awayScoreBox")[0].className = "short-awayScoreBox";
        document.getElementsByClassName("homeScoreBox")[0].className = "short-homeScoreBox";

        document.getElementsByClassName("awayPicBox")[0].className = "short-awayPicBox";
        document.getElementsByClassName("homePicBox")[0].className = "short-homePicBox";

        document.getElementById('clock').className = "short-clockBox";
        document.getElementById('periodDisplay').className = "short-periodBox";
    } else {
        template.src = "public/images/template.png";

        document.getElementsByClassName("short-scoreboard")[0].className = "scoreboard";

        homeJsonPath = 'home.json';
        awayJsonPath = 'away.json';

        document.getElementById("homeContainer").className = 'videoContainer';
        document.getElementById("awayContainer").className = 'videoContainer';

        document.getElementsByClassName("short-homeColorBox")[0].className = "homeColorBox";
        document.getElementsByClassName("short-awayColorBox")[0].className = "awayColorBox";

        document.getElementById('homeNameBoxClass').className = "homeNameBox";
        document.getElementById('awayNameBoxClass').className = "awayNameBox";

        homeName.id = "homeName";
        awayName.id = "awayName";
        homeName = document.getElementById("homeName");
        awayName = document.getElementById("awayName");


        document.getElementsByClassName("short-awayScoreBox")[0].className = "awayScoreBox";
        document.getElementsByClassName("short-homeScoreBox")[0].className = "homeScoreBox";

        document.getElementsByClassName("short-awayPicBox")[0].className = "awayPicBox";
        document.getElementsByClassName("short-homePicBox")[0].className = "homePicBox";

        document.getElementById('clock').className = "clockBox";
        document.getElementsByClassName('short-periodBox')[0].className = "periodBox";
        document.getElementById('short-periodDisplay').className = "periodBox";
    }

}

function setDesc() {
    var newText = document.getElementById('descText').value;
    if (newText == '') {
        document.getElementById('description').style.visibility = "hidden";
    } else {
        document.getElementById('description').style.visibility = "visible";
    }
    document.getElementById('description').innerHTML = document.getElementById('descText').value;
}