import { events, EVENT_KEYS } from "./events/events.ts";
import { globalState, G_STATE_KEYS } from "./global-state.ts";
import { GameObject } from "./game-object.ts";
import { Vector2 } from "./utils/vector2.ts";
import { Bullet } from "./bullet.ts";
import { calcAngle } from "./utils/math.ts";

export class Mob extends GameObject {
	size = 20;
	static speed = 1;
	constructor(position?: Vector2) {
		super(position);

		events.on(EVENT_KEYS.bullet_move, (bullet) => {
			if (bullet instanceof Bullet) {
				const dx = bullet.position.x - this.position.x;
				const dy = bullet.position.y - this.position.y;
				const diff = 1;
				if (dx <= diff && dx >= -diff) {
					console.log("collide");
					this.detach();
					bullet.collide();
					return;
				}
				if (dy <= diff && dy >= -diff) {
					console.log("collide");
					this.detach();
					bullet.collide();
				}
			}
		});
	}
	protected drawSelf(
		ctx: CanvasRenderingContext2D,
		_x: number,
		_y: number,
	): void {
		const playerPosition = globalState.getState(G_STATE_KEYS.playerPos);
		if (playerPosition instanceof Vector2) {
			const angle = calcAngle(
				this.position.x,
				this.position.y,
				playerPosition.x,
				playerPosition.y,
			);

			const x = Math.cos(Math.abs(angle));
			const y = Math.sin(angle);
			this.position.x += x * Mob.speed;
			this.position.y += y * Mob.speed;
		}
		ctx.fillStyle = "green";
		ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
	}
}
