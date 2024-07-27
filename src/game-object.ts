import { Vector2 } from "./utils/vector2.ts";
export class GameObject {
	static size: number;
	static color: number;
	position: Vector2;
	protected parent?: GameObject;
	protected children: GameObject[];

	constructor(position?: Vector2) {
		this.children = [];
		this.position = position ?? new Vector2(0, 0);
	}
	stepEntry(deltaTime: number, root?: GameObject) {
		this.children.map((child) => child.stepEntry(deltaTime, root));
		this.step(deltaTime, root);
	}
	step(_deltaTime: number, _root?: GameObject) {}
	draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
		this.drawSelf(ctx, x, y);
		this.children.map((child) =>
			child.draw(ctx, this.position.x, this.position.y),
		);
	}

	protected drawSelf(ctx: CanvasRenderingContext2D, _x: number, _y: number) {
		ctx.fillStyle = "black";
	}

	addChild(gameObject: GameObject) {
		if (!(gameObject instanceof GameObject)) {
			throw new TypeError("Expected an instance of gameobject.");
		}
		this.children.push(gameObject);
		gameObject.parent = this;
	}

	removeChild(gameObject: GameObject) {
		this.children = this.children.filter((child) => child !== gameObject);
	}

	detach() {
		this.parent?.removeChild(this);
	}
}
