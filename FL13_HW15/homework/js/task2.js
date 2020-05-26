const _INTERVAL1 = 2000, _INTERVAL2 = 1500, _DEFFERENT = 30;

const Machine = function(color, engine) {
	this.color = color; 
	this.engine = engine;
	this.isMove = false;
	this.isSlow = false;
	this.isStop = true;
	this.speed = 0;
	this.upgradeEngine = (newEngine, maxSpeed) => {
		if(!this.isStop) {
			return;
		}
		this.engine = newEngine;
		this.maxSpeed = maxSpeed;
	}

	this.changeColor = (newColor) => {
		if(!this.isStop) {
			return;
		}
		
		if(newColor === this.color) {
			console.log('The selected color already used, choose another one');
			return;
		}
		this.color = newColor;
	}

	this.drive = () => {
		if(this.isMove) {
			console.log('Already driving');
			return;
		}

		if(this.isSlow) {
			clearInterval(this.isSlow);
			this.isSlow = false;
		}

		this.isStop = false;
		this.isMove = setInterval(() => {
			if(this.speed >= this.maxSpeed) {
				console.log('speed is too high, SLOW DOWN!');
			}
			this.speed += 20;
			console.log(this.speed);
		}, _INTERVAL1)
	}

	this.stop = () => {
		if(this.isSlow) {
			console.log('Already slows down');
			return;
		}

		if(this.isMove) {
			clearInterval(this.isMove);
			this.isMove = false;
		}
		let maxiSpeed = this.speed;

		this.isSlow = setInterval(() => {
			this.speed -= 20;
			if(this.speed <= 0) {
				this.showSpeed? console.log(this.ms + maxiSpeed) : console.log(this.ms);
				clearInterval(this.isSlow);
				this.speed = 0;
				this.isStop = true;
				this.isSlow = false;
			}
			console.log(this.speed);
		}, _INTERVAL2)
	}
}

const Vehicle = function(color, engine) {
	Machine.call(this, color, engine);
	this.maxSpeed = 70;
	this.showSpeed = true;
	this.ms = `Vehicle is stopped. Maximum speed during the drive was `;
	this.getInfo = () => {
		return {
			engine: this.engine,
			color: this.color,
			maxSpeed: this.maxSpeed
		}
	}
}
Vehicle.prototype = Object.create(Machine.prototype);
Vehicle.prototype.constructor = Vehicle;

const Car = function(model, color, engine) {
	Machine.call(this, color, engine);
	this.model = model;
	this.maxSpeed = 80;
	this.showSpeed = true;
	this.ms = `Car ${this.model} is stopped. Maximum speed during the drive `;
	this.getInfo = () => {
		return {
			engine: this.engine,
			color: this.color,
			maxSpeed: this.maxSpeed,
			model: this.model
		}
	}
}
Car.prototype = Object.create(Machine.prototype);
Car.prototype.constructor = Car;

const Motorcycle = function(model, color, engine) {
	Machine.call(this, color, engine);
	this.model = model;
	this.maxSpeed = 90;
	this.ms = `Motorcycle  ${this.model} is stopped. Good drive`;
	this.getInfo = () => {
		return {
			engine: this.engine,
			color: this.color,
			maxSpeed: this.maxSpeed,
			model: this.model
		}
	}

	this.drive = () => {
		if(this.isMove) {
			console.log('Already driving');
			return;
		}

		if(this.isSlow) {
			clearInterval(this.isSlow);
			this.isSlow = false;
		}

		console.log(`Let's drive!`);
		this.isStop = false;
		this.isMove = setInterval(() => {
			this.speed += 20;
			if(this.speed >= this.maxSpeed) {
				console.log('speed is too high, SLOW DOWN!');
				if(this.speed - this.maxSpeed >= _DEFFERENT) {
					console.log('Engine overheating');
					this.stop();
				}
			}
			console.log(this.speed);
		}, _INTERVAL1)
	}
}
Motorcycle.prototype = Object.create(Machine.prototype);
Motorcycle.prototype.constructor = Motorcycle;