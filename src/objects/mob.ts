import { events, EVENT_KEYS } from "../events/events.ts";
import { globalState, G_STATE_KEYS } from "../global-state.ts";
import { GameObject } from "../game-object.ts";
import { Vector2 } from "../utils/vector2.ts";
import { Bullet } from "../objects/bullet.ts";
import { calcAngle } from "../utils/math.ts";
import { ctxDebug, clearDebugCanvas } from "../debug.ts";

export class Mob extends GameObject {
	static size = 20;
	static speed = 1;
	constructor(position?: Vector2) {
		super(position);

		events.on(EVENT_KEYS.bullet_move, (bullet) => {
			if (bullet instanceof Bullet) {
				const offset = 10;
				const bulletPosX = bullet.position.x + offset;
				const bulletPosY = bullet.position.y + offset;

				const dx = Math.abs(this.position.x + Mob.size - bullet.position.x);
				const dy = Math.abs(this.position.y + Mob.size - bullet.position.y);
				const minDistance = 10;
				if (dx <= minDistance && dy <= minDistance) {
					console.log(bullet.position, this.position);

					console.log("collide");
					// this.detach();
					bullet.collide();
					return;
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
		ctx.fillRect(this.position.x, this.position.y, Mob.size, Mob.size);

		const offset = Mob.size;
		ctxDebug?.fillRect(this.position.x, this.position.y, offset, offset);
	}
}
