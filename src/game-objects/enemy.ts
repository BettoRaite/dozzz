import { events, EVENT_KEYS } from "../events/events.ts";
import { globalState, G_STATE_KEYS } from "../global-state.ts";
import { GameObject } from "../game-object.ts";
import { Vector2 } from "../utils/vector2.ts";
import { Bullet } from "./bullet.ts";
import { calcAngle } from "../utils/math.ts";
import { ctxDebug, clearDebugCanvas } from "../debug.ts";

/*
  Extending classes 101: 
  Enemy.prototype.__proto__ will be GameObject.prototype, so methods are inherited.
*/

export class Enemy extends GameObject {
  static size = 20;
  static speed = 1;
  constructor(position?: Vector2) {
    // We must call parent constructor as super() in Child constructor before using this.
    super(position);

    events.on(EVENT_KEYS.bullet_move, this, (bullet) => {
      if (bullet instanceof Bullet) {
        const offset = 10;
        const bulletPosX = bullet.position.x + offset;
        const bulletPosY = bullet.position.y + offset;
        const pivotPosX = this.position.x + Enemy.size / 3;
        const pivotPosY = this.position.y + Enemy.size / 3;
        const dx = Math.abs(pivotPosX - bullet.position.x);
        const dy = Math.abs(pivotPosY - bullet.position.y);
        const minDistance = 10;
        if (dx <= minDistance && dy <= minDistance) {
          console.log(bullet.position, this.position);
          console.log("collide");
          bullet.collide();
          this.detach();
          events.unsubscribe(this);
          return;
        }
      }
    });
  }
  protected drawSelf(
    ctx: CanvasRenderingContext2D,
    _x: number,
    _y: number
  ): void {
    const playerPosition = globalState.getState(G_STATE_KEYS.playerPos);
    if (playerPosition instanceof Vector2) {
      const angle = calcAngle(
        this.position.x,
        this.position.y,
        playerPosition.x,
        playerPosition.y
      );

      const x = Math.cos(Math.abs(angle));
      const y = Math.sin(angle);
      this.position.x += x * Enemy.speed;
      this.position.y += y * Enemy.speed;
    }
    ctx.fillStyle = "green";
    ctx.fillRect(this.position.x, this.position.y, Enemy.size, Enemy.size);

    // const offset = Enemy.size / 3;
    // ctxDebug?.fillRect(
    // 	this.position.x + offset,
    // 	this.position.y + offset,
    // 	offset,
    // 	offset,
    // );
  }
}
