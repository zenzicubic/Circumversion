const fac = 1.5;
const scl = 100;

// A basic vector class
class Vector {
	constructor(x_, y_) {
		this.x = x_;
		this.y = y_;
	}

	add(v) {
		return new Vector(this.x + v.x, this.y + v.y);
	}

	sub(v) {
		return new Vector(this.x - v.x, this.y - v.y);
	}

	mul(s) {
		return new Vector(this.x * s, this.y * s);
	}

	div(s) {
		return new Vector(this.x / s, this.y / s);
	}

	normSq() {
		return this.x * this.x + this.y * this.y;
	}
}


// Presets
const presets = [
	{
		restricted: false,
		circles: [
			{x: fac * scl, y: fac * scl, r: fac},
			{x: -fac * scl, y: fac * scl, r: fac},
			{x: fac * scl, y: -fac * scl, r: fac},
			{x: -fac * scl, y: -fac * scl, r: fac},
			{x: 0.5 * fac * scl, y: 0, r: 0.5 * fac},
			{x: -0.5 * fac * scl, y: 0, r: 0.5 * fac},
			{x: 0, y: -0.5 * fac * scl, r: 0.5 * fac}
		]
	},
	{
		restricted: false,
		circles: [
			{x: fac * scl, y: fac * scl, r: fac},
			{x: -fac * scl, y: fac * scl, r: fac},
			{x: fac * scl, y: -fac * scl, r: fac},
			{x: -fac * scl, y: -fac * scl, r: fac},
			{x: 0.5 * fac * scl, y: 0, r: 0.5 * fac},
			{x: -0.5 * fac * scl, y: 0, r: 0.5 * fac}
		]
	},
	{
		restricted: false,
		circles: [
			{x: fac * scl, y: fac * scl, r: fac},
			{x: -fac * scl, y: fac * scl, r: fac},
			{x: fac * scl, y: -fac * scl, r: fac},
			{x: -fac * scl, y: -fac * scl, r: fac},
			{x: 0, y: 0, r: 0.414 * fac}
		]
	},
	{
		restricted: false,
		circles: [
			{x: fac * scl, y: fac * scl, r: fac},
			{x: -fac * scl, y: fac * scl, r: fac},
			{x: fac * scl, y: -fac * scl, r: fac},
			{x: -fac * scl, y: -fac * scl, r: fac},
			{x: 0.5 * fac * scl, y: 0, r: 0.5 * fac},
			{x: -0.5 * fac * scl, y: 0, r: 0.5 * fac},
			{x: 0, y: -0.5 * fac * scl, r: 0.5 * fac},
			{x: 0, y: 0.5 * fac * scl, r: 0.5 * fac}
		]
	},
	{
		restricted: false,
		circles: [
			{x: -scl, y: 1.732 * scl, r: 1},
			{x: -scl, y: -1.732 * scl, r: 1},
			{x: scl, y: 1.732 * scl, r: 1},
			{x: scl, y: -1.732 * scl, r: 1},
			{x: 2 * scl, y: 0, r: 1},
			{x: -2 * scl, y: 0, r: 1},
			{x: 0, y: 0, r: 1}
		]
	},
	{
		restricted: false,
		circles: [
			{x: 2 * fac * scl, y: 0, r: 1.732 * fac},
			{x: -fac * scl, y: -1.732 * fac * scl, r: 1.732 * fac},
			{x: -fac * scl, y: 1.732 * fac * scl, r: 1.732 * fac},
			{x: 0, y: 0, r: 0.268 * fac}
		]
	},
	{
		restricted: false,
		circles: [
			{x: fac * scl, y: fac * scl, r: fac},
			{x: -fac * scl, y: fac * scl, r: fac},
			{x: fac * scl, y: -fac * scl, r: fac},
			{x: -fac * scl, y: -fac * scl, r: fac},
			{x: 0, y: -fac * scl, r: fac},
			{x: 0, y: fac * scl, r: fac}
		]
	},
	{
		restricted: true,
		circles: [
			{x: fac * scl, y: fac * scl, r: fac},
			{x: -fac * scl, y: fac * scl, r: fac},
			{x: fac * scl, y: -fac * scl, r: fac},
			{x: -fac * scl, y: -fac * scl, r: fac},
			{x: 0.5 * fac * scl, y: 0, r: 0.3 * fac},
			{x: -0.5 * fac * scl, y: 0, r: 0.3 * fac},
			{x: 0, y: -0.5 * fac * scl, r: 0.3 * fac},
			{x: 0, y: 0.5 * fac * scl, r: 0.3 * fac}
		]
	},
]