function display() {
	document.getElementById("text").innerHTML 
		= "Thank you…. a confirmation email message will be sent to you soon.";
}
		
function alertMessage() {
	alert("This is working");
}

console.log('canvas');

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		if (Point.count == undefined) { 
			Point.count = 1;
		}
		else if ( Point.count == 1) {
			Point.count = 2;
		}
	}// end constructor
	
	value() {
		return "(" + this.x + ", " + this.y + ")";
	} // end value
	
	static getCount() {
		return (Point.count == undefined ? 0 : Point.count);
	} // end getCount
	
	static distance(pt1, pt2) {
		var xDist, yDist;
		var distance;
		
		if (Point.count == 2) {
			xDist = pt1.x - pt2.x;
			yDist = pt1.y = pt2.y;
			distance = Math.sqrt(xDist * xDist + yDist * yDist);
		}
		else {
			distance = null;
		}
		
		return distance;
	}
}

var point1, point2;

function captureClick (e) {
	if (Point.getCount () == 0) {
		point1 = new Point(e.clientX , e.clientY);
		document.getElementById("pt1").innerHTML = point1.value();
	}
	else if (Point.getCount () == 1) {
		point2 = new Point(e.clientX , e.clientY);
		document.getElementById("pt2").innerHTML = point2.value();
	}
	else {
		point1 = point2;
		point2 = new Point(e.clientX , e.clientY);
		document.getElementById("pt1").innerHTML = point1.value();
		document.getElementById("pt2").innerHTML = point2.value();
	}
} // end captureClick

	var clickArray = [];

	clickArray.push(point1.captureClick(e));

	console.log(clickArray);

function displayDistance(e) {
	var distance;
	var message;
	e.stopPropagation();
	distance = Point.distance (point1, point2);
	if (distance == null) {
		message = "To calculate a distance, you must first create two points!";
	}
	else {
		message = "The two points are " + distance.toFixed (1) + " pixels apart.";
	}
	
	document.getElementById("message").innerHTML = message;
} // end displayDistance


function startGame() {
	document.getElementById("text2").innerHTML 
		= "Please click on 5 arbitrary spots within this box, and see my shape transformation magic to happen.";
	var c = document.getElementById("myCanvas");		
	var ctx = c.getContext("2d");
	console.log(ctx);
	ctx.fillStyle = "#FF0000";
	ctx.fillRect(3, 10, 150, 100);
	
	function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	
	this.draw = function() {
		var c = document.getElementById("myCanvas");		
		var ctx = c.getContext("2d");
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.strokeStyle = "blue";
		ctx.stroke();
		ctx.fillStyle = "yellow";
		ctx.fill();
	}
	
	this.update = function() {
		if ( this.x + this.radius > c.width || this.x - this.radius < 0) {
				this.dx = -this.dx;
		}

		if( this.y + this.radius > c.height || this.y - this.radius < 0) {
				this.dy = -this.dy;
		}
	
		this.x += this.dx;
		this.y += this.dy;
		
		this.draw();
	}
	}

	var circleArray = [];
	var rectArrray = [];

	for (var i = 0; i < 50; i++) {
		var radius = 20;
		var x = Math.random() * (c.width - radius * 2) + radius;
		var y = Math.random() * (c.height - radius * 2) + radius;
		var dx = (Math.random() - 0.5);
		var dy = (Math.random() - 0.5);
		circleArray.push(new Circle(x, y, dx, dy, radius));
	}

	console.log(circleArray);

	function animate() {
		var c = document.getElementById("myCanvas");		
		var ctx = c.getContext("2d");
		requestAnimationFrame(animate);
		ctx.clearRect(0, 0, c.width, c.height);
	
		for (var i = 0; i < circleArray.length; i++) {
			circleArray[i].update();
		}
	}

	animate();
}

function clearCanvas() {
	var c = document.getElementById("myCanvas");		
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
}

//Coordinate function
function drawCanvas(){
	
}

/*function sendEmail(event) {
	event.preventDefault();
	var form = document.getElementById("inquiry-form");
	var name, age, email, telnum, comments;
}*/
