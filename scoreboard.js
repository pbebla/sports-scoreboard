const display = document.getElementById('clock');
const homeScoreDisplay = document.getElementById('homeScore');
const awayScoreDisplay = document.getElementById('awayScore');
const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
audio.loop = true;
let alarmTime = null;
let alarmTimeout = null;
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
    if (!document.getElementById("minutes")) {
        document.getElementById("minutes").value = 20;
    }
    if (!document.getElementById("seconds")) {
        document.getElementById("seconds").value = 0;
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
    homeAnimation = bodymovin.loadAnimation({
        container: document.getElementById('homeContainer'), // Required
        path: 'home.json', // Required
        renderer: 'svg', // Required
        loop: false, // Optional
        autoplay: false, // Optional
        name: "Hello World", // Name for future reference. Optional.
      });
}

function loadAwayGoalAnimation(){
    awayAnimation = bodymovin.loadAnimation({
        container: document.getElementById('awayContainer'), // Required
        path: 'away.json', // Required
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

function startup() {
    fetch('/home.json').then((response) => response.json())
        .then((data) => {
        var r = (data['layers']['10']['shapes']['0']['it']['1']['c']['k']['0'] * 255).toString(16);
        var g = (data['layers']['10']['shapes']['0']['it']['1']['c']['k']['1'] * 255).toString(16);
        var b = (data['layers']['10']['shapes']['0']['it']['1']['c']['k']['2'] * 255).toString(16);

        var r2 = (data['layers']['0']['shapes']['0']['it']['2']['c']['k']['0'] * 255).toString(16);
        var g2 = (data['layers']['0']['shapes']['0']['it']['2']['c']['k']['1'] * 255).toString(16);
        var b2 = (data['layers']['0']['shapes']['0']['it']['2']['c']['k']['2'] * 255).toString(16);

        hexString = '#' + r + g + b;
        hexString2 = '#' + r2 + g2 + b2;
        
        document.getElementById('homeColorSelection').setAttribute('value', hexString);
        document.getElementById('homeColor').style.backgroundColor = hexString;
        document.getElementById('home2ndColorSelection').setAttribute('value', hexString2);
    });

    fetch('/away.json').then((response) => response.json())
    .then((data) => {
        var r = (data['layers']['10']['shapes']['0']['it']['1']['c']['k']['0'] * 255).toString(16);
        var g = (data['layers']['10']['shapes']['0']['it']['1']['c']['k']['1'] * 255).toString(16);
        var b = (data['layers']['10']['shapes']['0']['it']['1']['c']['k']['2'] * 255).toString(16);

        var r2 = (data['layers']['0']['shapes']['0']['it']['2']['c']['k']['0'] * 255).toString(16);
        var g2 = (data['layers']['0']['shapes']['0']['it']['2']['c']['k']['1'] * 255).toString(16);
        var b2 = (data['layers']['0']['shapes']['0']['it']['2']['c']['k']['2'] * 255).toString(16);

        hexString = '#' + r + g + b;
        hexString2 = '#' + r2 + g2 + b2;

        document.getElementById('awayColorSelection').setAttribute('value', hexString);
        document.getElementById('awayColor').style.backgroundColor = hexString;
        document.getElementById('away2ndColorSelection').setAttribute('value', hexString2);
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

/*function updateFirst(event) {
    console.log(event.target.value);
}*/

function updateHomeColors(event) {
    updateColors(event, './home.json', 'homeColor', '/homeJSON', 'homeName');
}

function updateAwayColors(event) {
    updateColors(event, './away.json', 'awayColor', '/awayJSON', 'awayName');
}

function updateHome2ndColors(event) {
    update2ndColors(event, './home.json', 'homeColor', '/homeJSON');
}

function updateAway2ndColors(event) {
    update2ndColors(event, './away.json', 'awayColor', '/awayJSON');
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

// !!!! This code is experimental...don't blame me if your performance tanks.

const homeNameBox = document.getElementById('homeNameBoxClass');
const homeName = document.getElementById("homeName");

const awayNameBox = document.getElementById('awayNameBoxClass');
const awayName = document.getElementById("awayName");

function calcTextWidth(name) {
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

function setName(name, abbr) {
    var nameElement = document.getElementById(name);
    var newName = document.getElementById(abbr).value;
    nameElement.innerHTML = newName;
    if (name == "homeName") {
        console.log(window.getComputedStyle(homeName).fontSize);
        nameElement.style.setProperty('--fontSize', '26cqw');
        calcTextWidth(homeName);
        updateName(homeName, newName, './home.json', '/homeJSON');
    } else if (name == "awayName") {
        console.log(window.getComputedStyle(awayName).fontSize);
        nameElement.style.setProperty('--fontSize', '26cqw');
        calcTextWidth(awayName);
        updateName(awayName, newName, './away.json', '/awayJSON');
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

    fetch("images/homePic.png", {cache: 'reload', mode: 'no-cors'})
    .then(document.getElementById('homePic').src = "images/homePic.png");
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

    fetch("images/awayPic.png", {cache: 'reload', mode: 'no-cors'})
    .then(document.getElementById('awayPic').src = "images/awayPic.png");
    return false;
} 


homeForm.addEventListener('submit', handleHomeForm);
awayForm.addEventListener('submit', handleAwayForm);

Mousetrap.bind('space', function(e) {
    e.preventDefault();
    startStopTimer();
});

