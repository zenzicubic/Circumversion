let svg, listDiv;
let restrictedBox, presetBox, download;

let baseURL;
let circles = [];
let index = 0; 

const maxCircles = 12, maxSlider = 2.5, minSlider = 0.2;
const sliderPrec = 1000;

function load() {
	// Check for mobile
	if (window.innerWidth < 1100) {
		window.location.href = "mobile-landing.html";
	}

	// Load all of the DOM elements
	svg = document.querySelector("#widgets");
	listDiv = document.querySelector("#circles");

	presetBox = document.querySelector("#presets");
	restrictedBox = document.querySelector("#restricted");
	download = document.querySelector("#downloadBtn");

	svg.addEventListener("contextmenu", addCircle);
	loadCircles();
}


/*
URL and preset things.
*/


function loadCircles() {
	// Add circles from data packet if there is one
	let tokens = window.location.href.split("#");
	let data;
	baseURL = tokens[0];

	if (tokens.length > 1) {
		data = JSON.parse(atob(tokens[1]));
		restricted = data.restricted;
		restrictedBox.checked = restricted;

		index = 0;
		for (let c of data.circles) {
			circles.push(new Circle(new Vector(c.x, c.y), c.r, index));
			index++;
		}
	}
}

function getLink() {
	// Convert the current canvas to a shareable link
	let circs = [];
	for (let c of circles) {
		circs.push({x: c.c.x, y: c.c.y, r: c.r});
	}
	let data = {circles: circs, restricted:  restricted}
	navigator.clipboard.writeText(baseURL + "#" + btoa(JSON.stringify(data)));
}

function loadPreset() {
	// Load presets
	let p = presets[presetBox.selectedIndex];
	window.location.href = "#" + btoa(JSON.stringify(p));
	window.location.reload();
}


/*
Event listeners and button functions.
*/

function showDropdown(id) {
	// Show/hide menu dropdowns
	let lbl = document.querySelector("#" + id);
	let text = document.querySelector(`#${id}Text`);

	if (text.hidden) {
		lbl.innerHTML = lbl.innerHTML.replace("+", "-");
	} else {
		lbl.innerHTML = lbl.innerHTML.replace("-", "+");
	}
	text.hidden = !text.hidden;
}

function changeRad(i) {
	// Change radius of given circle
	let c = circles[getIndex(i)];
	c.r = c.radSlider.value / sliderPrec;
	c.radLbl.innerHTML = "Radius: " + c.r.toFixed(3);

	c.drawCircles();
	resetCanv();
}

function deleteCircle(i) {
	// Delete given circle

	resetCanv();
	let j = getIndex(i);
	circles[j].deleteSelf();
	circles.splice(j, 1);
}

function changeRestricted() {
	// Apply restrictions to the chaos game
	resetCanv();
	restricted = restrictedBox.checked;
}

function saveImg() {
	download.href = canvas.toDataURL().replace("png", "octet-stream");
}

function addCircle(e) {
	// Add a circle on user click
	e.preventDefault();
	if (circles.length < maxCircles) {
		circles.push(new Circle(getCoords(e), 1, index));
		index++;

		resetCanv();
	}
}

function deleteCircles() {	
	// Delete all circles
	index = 0;
	for (let circle of circles) {
		circle.deleteSelf();
	}
	circles = [];
	resetCanv();
}


/*
Utility functions and the circle class.
*/

const getIndex = (j) => {
	// Get circle by index
	for (let i = 0; i < circles.length; i ++) {
		if (circles[i].index == j) {
			return i;
		}
	}
	return null;
}

const mapToScreen = (v) => v.div(scl);
const getCoords = (e) => {
	let mat = svg.getScreenCTM();
	return new Vector(
		((e.clientX - mat.e) / mat.a) - hSize,
		((e.clientY - mat.f) / mat.d) - hSize);
}

class Circle {
	constructor(v_, r_, ind_) {
		this.c = v_;
		this.index = ind_;
		this.p = mapToScreen(this.c);
		this.r = r_;

		this.dragging = false;

		this.addElts();
		this.addCircles();
		this.drawCircles();
	}

	deleteSelf() {
		this.innerCirc.remove();
		this.outerCirc.remove();
		this.break.remove();	
		this.deleteBtn.remove();
		this.radSlider.remove();
		this.radLbl.remove();
		this.div.remove();
	}

	addElts() {
		// Add div and delete button
		this.div = document.createElement("div");
		this.div.classList.add("circleBox");
		listDiv.appendChild(this.div);

		this.deleteBtn = document.createElement("button");
		this.deleteBtn.innerHTML = "Delete";
		this.deleteBtn.setAttribute("onclick", "deleteCircle(" + this.index + ")");
		this.div.appendChild(this.deleteBtn);

		this.break = document.createElement("br");
		this.div.appendChild(this.break);

		// Add input sliders
		this.radSlider = document.createElement("input");
		this.radSlider.id = "slider" + this.index;
		this.radSlider.setAttribute("onchange", "changeRad(" + this.index + ")");

		this.radSlider.type = "range";
		this.radSlider.min = minSlider * sliderPrec;
		this.radSlider.max = maxSlider * sliderPrec;
		this.radSlider.value = this.r * sliderPrec;
		this.div.appendChild(this.radSlider);

		this.radLbl = document.createElement("label");
		this.radLbl.for = this.radSlider.id;
		this.radLbl.innerHTML = "Radius: " + this.r.toFixed(3);
		this.div.appendChild(this.radLbl); 
	}

	select() {
		this.div.classList.add("selected");
	}

	addCircles() {
		// add the circles and set their attributes
		this.outerCirc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		this.innerCirc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		svg.appendChild(this.outerCirc);
		svg.appendChild(this.innerCirc);

		this.outerCirc.setAttribute("stroke", "white");
		this.outerCirc.setAttribute("stroke-width", 5);
		this.outerCirc.setAttribute("fill", "none");
		this.innerCirc.setAttribute("fill", "white");

		// add evt listeners
		this.innerCirc.addEventListener("mousedown", this.startDrag.bind(this));
		this.innerCirc.addEventListener("mousemove", this.mouseOver.bind(this));
		this.innerCirc.addEventListener("mouseleave", this.endDrag.bind(this));
		this.innerCirc.addEventListener("mouseup", this.endDrag.bind(this));
	}

	drawCircles() {
		// draw the circle
		this.innerCirc.setAttribute("cx", this.c.x + hSize);
		this.outerCirc.setAttribute("cx", this.c.x + hSize);
		this.innerCirc.setAttribute("cy", this.c.y + hSize);
		this.outerCirc.setAttribute("cy", this.c.y + hSize);

		this.innerCirc.setAttribute("r", 10);
		this.outerCirc.setAttribute("r", scl * this.r);
	}

	startDrag(e) {
		// begin drag
		this.c = getCoords(e);
		this.p = mapToScreen(this.c);
		resetCanv();

		this.select();
		this.dragging = true;
	}

	mouseOver(e) {
		// move when dragged
		this.select();

		let v = getCoords(e);
		if (this.dragging) {
			this.c = v;
			this.p = mapToScreen(this.c);

			this.drawCircles();
			resetCanv();
		}
	}

	endDrag(e) {
		// stop dragging when mouse is released or leaves
		this.div.classList.remove("selected");

		this.dragging = false;
	}
}