let canvas, ctx;
let size, hSize;

let restricted = false;
let v = new Vector(0.1, 0.1);

const numSteps = 300;

document.addEventListener("DOMContentLoaded", function() {
	// Initialize the canvas and load everything else
	canvas = document.querySelector("#canvas");
	ctx = canvas.getContext("2d");

	size = window.innerHeight;
	canvas.width = canvas.height = size;
	hSize = size / 2;

	ctx.translate(hSize, hSize);
	ctx.fillStyle = "white";
	load();
	loop();
});

function resetCanv() {
	// Reset the canvas
	ctx.clearRect(-hSize, -hSize, size, size);
}

function loop() {
	// Main loop
	for (let i = 0; i < numSteps; i ++) {
		step();
	}
	window.requestAnimationFrame(loop);
}

function step() {
	// Perform the iterated inversion
	if (circles.length > 0) {
		let j = Math.floor(Math.random() * circles.length);

		let c = circles[j];
		let rSq = c.r * c.r;
	  	let n = v.sub(c.p).mul(rSq);
	  	let d = v.sub(c.p).normSq();

	  	// Handle the restricted case
		if (restricted && d < rSq) return;
		v = n.div(d).add(c.p);

		ctx.fillRect(v.x * scl, v.y * scl, 0.2, 0.2);
	}
}