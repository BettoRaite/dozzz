globalThis.alert = console.log;
class GameObject {
	parent = null;
	constructor() {
		console.log(this.parent);
	}
	draw() {
		console.log("Running parent method");
		console.log(this.parent);
	}
}

// const mainScene = new GameObject();

class Player extends GameObject {
	parent = mainScene;
	draw() {
		console.log("Running child method");
		super.draw(); // Runs parent draw
	}
}

// const player = new Player();
// player.draw();

const animal = {
	name: "Animal",
	eat() {
		alert(`${this.name} eats.`);
	},
};

const rabbit = {
	__proto__: animal,
	name: "Rabbit",
	eat() {
		// that's how super.eat() could presumably work
		this.__proto__.eat.call(this); // (*)
	},
};

rabbit.eat(); // Rabbit eats.
