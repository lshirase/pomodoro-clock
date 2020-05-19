function typeEffect(element, speed) {
	var text = element.innerHTML;
	element.innerHTML = "";
	
	var i = 0;
	var timer = setInterval(animateDots, speed);


    function animateDots() {
        if (i < text.length) {
        element.append(text.charAt(i));
        i++;
        } else {
        clearInterval(timer);
        typeEffect(action,speed);
        }
    }
}
// application
let speed = 400;


// type affect to header
typeEffect(action, speed);


// incrementing not working yet // 

const workIncrement = set.querySelector("#session .increment");
workIncrement.addEventListener('click', (e)=>{
    if (e.target.innerHTML == upArrow){ 
        console.log('yo');
    workTime+= 1;
    console.log(workTime);
    workIncrement.parentElement.firstChild.innerHTML = workTime;
    }
    incrementTime(e.target, 'work');
    

});


function incrementTime(x, incrementType){
    console.log(x)
    if (incrementType == "work"){
        if (x.class == "up"){
            workTime += 1;
            incrementDisplay.innerHTML = workTime;
            console.log('hi');
        }
    }
}


