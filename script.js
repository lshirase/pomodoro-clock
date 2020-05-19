//set global vars
let breakTime = 3, workTime = 5, displayTime = workTime;
let onDeck = "break";
let countDownFlag = true
let startString = 'START&gt;&gt;&gt;', stopString = 'STOP&lt;&lt;&lt;';
let roundCount = 0, goalCount = 0;

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
setDisplayTime()
play.innerHTML=startString

//add event listeners
play.addEventListener('click',e=>{play.innerHTML===startString ? countDown():pause()});

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

function countDown(){
    play.innerHTML = stopString;
    if(countDownFlag) countDownFlag = setInterval(decrement, 1000);
    function decrement() {
        if(displayTime==0) {
            skipSession()
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

function skipSession(e=false){ 
    if(e) play.innerHTML = startString;
    displayTime = onDeck==="break" ? breakTime:workTime;
    onDeck = onDeck==="break" ? "session":"break"; 
    setDisplayTime()
}