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

