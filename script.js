//set global vars
let breakTime = 1, workTime = 2, displayTime = workTime;
let onDeck = "break";
let countDownFlag = true
let startString = 'START&gt;&gt;&gt;', stopString = 'STOP&lt;&lt;&lt;';
let roundCount=0, goalCount=0, firstRoundFlag=true;

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

//add event listeners
play.addEventListener('click',e=>{play.innerHTML===startString ? countDown():pause()}); //runCountown function or pause function 

//functions
function secToSting(secInt){ //converts seconds to string
    let minutes = 0;
    let seconds = 0;

    minutes = Math.floor(secInt / 60);
    seconds = secInt - (60*minutes)

    return n(minutes) + ":" + n(seconds);
    //function to add leading 0
    function n(n) {
      return n > 9 ? "" + n : "0" + n;
    }
}

function setDisplayTime(){
    time.innerHTML = secToSting(displayTime)
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
}

function pause(){
    play.innerHTML = startString;
    clearInterval(countDownFlag);
    countDownFlag=true;
}

function nextSession(){ 
    if(onDeck==='break'){
        displayTime = breakTime;
        onDeck = "work";
    }
    else { //onDeck is work
        displayTime = workTime;
        onDeck = "break";
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