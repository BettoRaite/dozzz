import { GameObject } from "./game-object.ts";
import { Bullet } from "./bullet.ts";
import { Vector2 } from "./utils/vector2.ts";
import { events, EVENT_KEYS } from "./events/events.ts";
import { globalState, G_STATE_KEYS } from "./global-state.ts";

export class Player extends GameObject {
	static speed = 2;
	private size;
	private canShoot = true;
	private currentPosition = new Vector2();
	constructor(position?: Vector2, size?: number) {
		super(position);
		this.size = size ?? 10;
		events.on(EVENT_KEYS.shoot, () => {
			if (!this.canShoot) return;
			this.canShoot = false;
			this.spawBullet();
			setTimeout(() => {
				this.canShoot = true;
			}, 300);
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

		ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
	}
	spawBullet() {
		const bullet = new Bullet(this.position.copy());
		this.addChild(bullet);
	}
}
