import { GameObject } from "../game-object.ts";
import { Bullet } from "../objects/bullet.ts";
import type { Vector2 } from "../utils/vector2.ts";
import { events, EVENT_KEYS } from "../events/events.ts";
import { globalState, G_STATE_KEYS } from "../global-state.ts";

export class Player extends GameObject {
	static speed = 2;
	static size = 10;

	private canShoot = true;
	private cooldownSeconds = 0.5;

	constructor(position?: Vector2) {
		super(position);

		events.on(EVENT_KEYS.shoot, this, () => {
			this.shoot();
		});
	}
	protected drawSelf(
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
	): void {
		this.position.x += x * Player.speed;
		this.position.y += y * Player.speed;
		globalState.setState(G_STATE_KEYS.playerPos, this.position);

		ctx.fillRect(this.position.x, this.position.y, Player.size, Player.size);
	}
	shoot() {
		if (!this.canShoot) return;
		this.canShoot = false;

		setTimeout(() => {
			this.canShoot = true;
		}, this.cooldownSeconds * 1000);
		this.spawBullet();
	}
	spawBullet() {
		const bullet = new Bullet(this.position.copy());
		this.addChild(bullet);
	}
}
