const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
var boundings = canvas.getBoundingClientRect();
var painting = false;
var colorAssigned = false;
var sizeAssigned = false;

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", finishedPosition);
canvas.addEventListener("mousemove", draw);

//eventListeners

//mousedown
function startPosition(e) {
    painting = true;
    draw(e);
}

//mouseup
function finishedPosition() {
    painting = false;
    ctx.beginPath();
}

//draw || mousemove
function draw(event) {
    if (!painting) return;

    //get stroke size from input/user
    var size = document.querySelector('#size_selector');

    if(!sizeAssigned)
        ctx.lineWidth = 5;
    else
        ctx.lineWidth = size.value;


    ctx.lineCap = "round";
    mouseX = event.clientX - boundings.left;
    mouseY = event.clientY - boundings.top;
    ctx.lineTo(mouseX, mouseY);

    //get color from input/user
    var color = document.querySelector('#color_selector');

    if (!colorAssigned)
        ctx.strokeStyle = 'green';
    else
        ctx.strokeStyle =  color.value;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);

}

//stroke colore
var isAlreadyCreated = false;
function color_Stroke() {

    if (!isAlreadyCreated) {
        //create input element type text to accept colors form user
        var color_selector = document.createElement('input');
        color_selector.setAttribute('type', 'text');
        color_selector.setAttribute('value', 'green');
        color_selector.setAttribute('id', 'color_selector');

        var color_List = document.getElementById('strokeClist');
        color_List.appendChild(color_selector);

        colorAssigned = true;
    }
    else {
        var ip = document.getElementById('color_selector');
        ip.value = 'green';
    }

}

//stroke weight/size
function strokeSize() {

    
    //create input element to accept stroke size from user
    var size_selector = document.createElement('input');
    size_selector.setAttribute('type', 'number');
    size_selector.setAttribute('value', '3');
    size_selector.setAttribute('id', 'size_selector');

    var size_Selector_List = document.getElementById('selectStrokeSize');
    size_Selector_List.appendChild(size_selector);

    sizeAssigned = true;
    
}


//brush
function isBrush() {
    var color = document.querySelector('#color_selector');
    var size = document.querySelector('#size_selector');
    //change the color input value to 'black'
    color.value = 'black';
    //get the stroke size and assign it as the size of the brush
    size.value = document.querySelector('#size_selector').value;


    isAlreadyCreated = true;
	
}




//clear drawing board
function clear_Board() {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    //clear the canvvas by build-in clearRect method
    ctx.clearRect(0, 0, canvas.width, canvas.height);

}



//save the drawing board
function save_Picture() {
    var canvas = document.querySelector("#canvas");
    var img_name = prompt('Image Name');
    var canvasDataURL = canvas.toDataURL();
    var a = document.getElementById('save');
    a.href = canvasDataURL;
	if(prompt('Image Name')!= null)
       a.download = img_name + '.jpg' || 'drawing.jpg';
	else
		a = null;

}

//comment || feedback
function feedBack() {
    var form = document.createElement('form');
    signal_fb = true;

    form.setAttribute('id', 'feedback');
    document.getElementById("FeedBack").appendChild(form);

    var input = document.createElement('input');

    input.setAttribute('name', 'feedBack');
    input.setAttribute('type', 'textarea');
    input.setAttribute('id', 'textbox');

    document.getElementById('feedback').appendChild(input);

    var submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('name', 'submit');
    submit.setAttribute('value', 'comment')
    submit.setAttribute('id', 'submitBtn')
    document.getElementById('feedback').appendChild(submit);
}

//about the website
function about_W() {
    window.open('about.html','My Window','height=400,width=800,top=100,left=500');
}

//resizing the canvas
window.addEventListener('resize', resizeCanvas);
function resizeCanvas() {
    canvas.width = 1025;
    canvas.height = 545;
}
resizeCanvas();
