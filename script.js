//set global vars
let breakTime = 60, workTime = 120, displayTime = workTime;
let onDeck = "break";
let countDownFlag = true
let startString = 'STAR&gt;&gt;&gt;', stopString = 'STOP&lt;&lt;&lt;';
let roundCount=0, goalCount=0, firstRoundFlag=true;
let initalMessage = 'LET\'S START WORKING . . .', pauseMessage = 'GET BACK TO WORK ! ! !', breakMessage = 'TIME TO CHILL . . . z z z', workMessage = 'WORKING . . .';
let messageFlag; 

// application
let workUpper = 3600, workLower = 0;
let breakLower = 0, breakUpper = 1800;


//select DOM items 
const container = document.querySelector('#container');
const skip = container.querySelector('#skip');
const play = container.querySelector('#play');
const set = container.querySelector('#set');
const time = container.querySelector('#time');
const action = container.querySelector('#action');
const round = container.querySelector('#round');
const goal = container.querySelector('#goal');

//set initial time to workTime
setDisplayTime();
setPlayButton(startString);
setMessage(initalMessage);

//add event listeners
play.addEventListener('click',e=>{play.innerHTML===startString ? countDown():pause()}); //runCountown function or pause function 
skip.addEventListener('click',nextSession); //runCountown function or pause function 

const workIncrement = set.querySelector("#session .increment");
workIncrement.addEventListener('click', e=>{incrementTime(e,'work')});

const breakIncrement = set.querySelector("#break .increment");
breakIncrement.addEventListener('click', e=>{incrementTime(e,'break')});

//functions
function secToString(secInt, includeZeros=true){ //converts seconds to string
    let minutes = 0;
    let seconds = 0;

    minutes = Math.floor(secInt / 60);
    seconds = secInt - (60*minutes)

    if(!includeZeros){
        return String(minutes);
    }    

    return n(minutes) + ":" + n(seconds);
    //function to add leading 0
    function n(n) {
      return n > 9 ? "" + n : "0" + n;  
    }  
}    



function setDisplayTime(increment=false){
    if(increment){
        onDeck==='break'? displayTime=workTime : displayTime=breakTime;
    }    
    time.innerHTML = secToString(displayTime)
}    

function setPlayButton(buttonString){
    play.innerHTML=buttonString;
}    

function countDown(){
    play.innerHTML = stopString;
    if (firstRoundFlag) setRound(), firstRoundFlag=false;
    if(countDownFlag) countDownFlag = setInterval(decrement, 1000);
    function decrement() {
        if(displayTime==0) {
            nextSession()
        }    
        else{
            displayTime--;
            setDisplayTime();
        }    
    }
    onDeck==='break' ? setMessage(workMessage) : setMessage(breakMessage);
}    

function pause(){
    play.innerHTML = startString;
    setMessage(pauseMessage)
    clearInterval(countDownFlag);
    countDownFlag=true;
}    

function nextSession(){ 
    if(onDeck==='break'){
        displayTime = breakTime;
        onDeck = "work";
        setMessage(breakMessage)
    }    
    else { //onDeck is work
        displayTime = workTime;
        onDeck = "break";
        setMessage(workMessage)
        setRound()
    }    
    setDisplayTime();
}    

function setRound(){
    roundCount++
    if(roundCount>4) roundCount=0, goalCount++;
    round.innerHTML = fractionString('ROUND', roundCount, 4)
    goal.innerHTML = fractionString('GOAL', goalCount, 12)
    function fractionString(type,numerator,denominator){
        return `${type}: ${numerator}/${denominator}`
    }    
}    



function setMessage(messageString){
    action.innerHTML=""
    clearInterval(messageFlag);
    messageFlag=setInterval(typeEffect, 200)
    var i = 0;
    function typeEffect(){
        if (i < messageString.length) {
            action.append(messageString.charAt(i));
            i++;
        }
        else {
            action.innerHTML = ""
            i=0;
        }
    }
}





function incrementTime(e, type){
    let inc = 0
    if (e.target.classList.contains("up")){
        inc=60
    }
    else {
        inc=-60
    }
    type==='work'? workTime+=inc:breakTime+=inc;

    if(workTime>workUpper) workTime=workUpper;
    else if (workTime<workLower) workTime=workLower;

    if(breakTime>breakUpper) breakTime=breakUpper;
    else if (breakTime<breakLower) breakTime=breakLower;

    e.target.parentElement.parentElement.querySelector(".incrementDisplay").innerHTML = type==='work'? secToString(workTime, includeZeros=false) : secToString(breakTime, includeZeros=false);    
    if(type!==onDeck) setDisplayTime(true);
}

