import { GameObject } from "../game-object.ts";
import { Bullet } from "./bullet.ts";
import type { Vector2 } from "../utils/vector2.ts";
import { events, EVENT_KEYS } from "../events/events.ts";
import { globalState, G_STATE_KEYS } from "../global-state.ts";

export class Player extends GameObject {
  static speed = 2;
  static size = 10;

  private canShoot = true;
  static cooldownSeconds = 0.5;

  constructor(position?: Vector2) {
    /*
		
		[[ConstructorKind]]:"derived". That’s a special internal label.

That label affects its behavior with new.

When a regular function is executed with new, it creates an empty object and assigns it to this.
But when a derived constructor runs, it doesn’t do this. It expects the parent constructor to do this job.
So a derived constructor must call super in order to execute its parent (base) constructor, otherwise the object for this won’t be created. And we’ll get an error.
		*/
    super(position);
    /*
		
		In other words, the parent constructor always uses its own field value, not the overridden one.
		with method it's different
		
		*/
    events.on(EVENT_KEYS.shoot, this, () => {
      this.shoot();
    });
  }
  protected drawSelf(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number
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
    }, Player.cooldownSeconds * 1000);
    this.spawBullet();
  }
  spawBullet() {
    const bullet = new Bullet(this.position.copy());
    this.addChild(bullet);
  }
}
