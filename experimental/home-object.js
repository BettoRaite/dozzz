/*
    
When a function is specified as a class or object method, 
its [[HomeObject]] property becomes that object.

[[HomeObject]] is defined for methods both in classes and in plain objects. 
But for objects, methods must be specified exactly as method(), not as "method: function()".

*/
const makeEggsWithCPU = false;
if (makeEggsWithCPU) {
	// DEATH FROM CALLSSTACK EXID...
	const gameObject = {
		drawSelf() {
			console.log("Drawself br...");
		},
	};

	const entity = {
		health: 100,
		__proto__: gameObject,
		drawSelf() {
			// this.__proto__ = entity
			this.__proto__.drawSelf.call(this);
		},
	};

	const player = {
		__proto__: entity,
		drawSelf() {
			// this.__proto__ = entity
			this.__proto__.drawSelf.call(this);
		},
	};
	player.drawSelf();
} else {
	const gameObject = {
		drawSelf() {
			// health taken from the entity.
			console.log("Drawself br...", this.health);
		},
	};

	const entity = {
		health: 100,
		__proto__: gameObject,
		drawSelf() {
			// [[homeobject]] === entity; // to resolve the 'this' problem (*)
			// super === entity.__proto__
			super.drawSelf(); // pass the 'this' value, in other words 'this' === 'player'.
		},
	};

	const player = {
		__proto__: entity,
		drawSelf() {
			// (*?)
			super.drawSelf();
		},
	};
	player.drawSelf();
}
const noHomieHuh = true;
if (noHomieHuh) {
	const jackiejack = {
		pen: "10cm",
		popp() {
			console.log(this.pen);
		},
	};

	const uwahahaha = {
		__proto__: jackiejack,
		// biome-ignore lint/complexity/useArrowFunction: <f*ckyiself>
		popp: function () {
			// no [[homeobject]] for this thing:_)
			console.log("shshhhhh");
			super.popp();
		},
	};
	uwahahaha.popp();
}

/*
Totally not copied from ANYWHERE!!!! P.SS GO TO jsinfo. (god place, js i love you so much that my brain hurts.)

To extend a class: class Child extends Parent:
That means Child.prototype.__proto__ will be Parent.prototype, so methods are inherited.
When overriding a constructor:
We must call parent constructor as super() in Child constructor before using this.
When overriding another method:
We can use super.method() in a Child method to call Parent method.
Internals:
Methods remember their class/object in the internal [[HomeObject]] property. That’s how super resolves parent methods.
So it’s not safe to copy a method with super from one object to another.
Also:

Arrow functions don’t have their own this or super, so they transparently fit into the surrounding context.
 */
