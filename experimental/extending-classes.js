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

const mainScene = new GameObject();

class Player extends GameObject {
	parent = mainScene;
	draw() {
		console.log("Running child method");
		super.draw(); // Runs parent draw
	}
}

const player = new Player();
player.draw();
