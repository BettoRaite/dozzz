import { events, EVENT_KEYS } from "./events/events.ts";
import { globalState, G_STATE_KEYS } from "./global-state.ts";
import { GameObject } from "./game-object.ts";
import { Vector2 } from "./utils/vector2.ts";
import { calcAngle } from "./utils/math.ts";

export class Bullet extends GameObject {
	static lifespanSeconds = 30;
	static size = 10;
	static speed = 6;
	positionChange: Vector2 = new Vector2();
	constructor(position?: Vector2) {
		super(position);
		const mousePos = globalState.getState(G_STATE_KEYS.mousePos);
		if (mousePos instanceof Vector2) {
			console.log(mousePos, this.position);
			const angle = calcAngle(
				this.position.x,
				this.position.y,
				mousePos.x,
				mousePos.y,
			);
			this.positionChange.y = Math.sin(angle);
			this.positionChange.x = Math.cos(angle);

			setTimeout(() => {
				this.detach();
			}, Bullet.lifespanSeconds * 1000);
		} else {
			console.error("mousePos is not an instance of Vector2");
			this.detach();
		}
	}
	protected drawSelf(
		ctx: CanvasRenderingContext2D,
		_x: number,
		_y: number,
	): void {
		this.position.x += this.positionChange.x * Bullet.speed;
		this.position.y += this.positionChange.y * Bullet.speed;
		ctx.fillStyle = "red";
		events.emit(EVENT_KEYS.bullet_move, this);
		ctx.fillRect(this.position.x, this.position.y, Bullet.size, Bullet.size);
	}
	collide() {
		this.detach();
	}
}
