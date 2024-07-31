class Rabbit extends Object {
	constructor(name, ...args) {
		super(...args);
		this.name = name;
	}
}
const rabbit = new Rabbit("Rab");

console.log(rabbit.hasOwnProperty("name")); // Error
