import { events, EVENT_KEYS } from "../events/events.ts";
import { globalState, G_STATE_KEYS } from "../global-state.ts";
import { Vector2 } from "../utils/vector2.ts";
import { calcAngle } from "../utils/math.ts";
// import { GameObjecast } from "../game-object.ts";
import { Entity } from "../entity.ts";

export class Bullet extends Entity {
  static lifespanSeconds = 30;
  static size = 10;
  static speed = 6;
  static color = "black";

  positionChange: Vector2 = new Vector2();
  protected renderSelf() {
    if (this.positionChange.x === 0 && this.positionChange.y === 0) {
      const mousePos = globalState.getState(G_STATE_KEYS.mousePos);

      if (mousePos instanceof Vector2) {
        const angle = calcAngle(
          this.position.x,
          this.position.y,
          mousePos.x,
          mousePos.y
        );

        this.positionChange.y = Math.sin(angle);
        this.positionChange.x = Math.cos(angle);

        setTimeout(() => {
          this.detach();
        }, Bullet.lifespanSeconds * 1000);
      } else {
        console.error("mousePos is not an instance of Vector2");
        this.detach();
        return;
      }
    }
    this.position.x += this.positionChange.x * Bullet.speed;
    this.position.y += this.positionChange.y * Bullet.speed;
  }
  protected drawSelf(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = Bullet.color;
    events.emit(EVENT_KEYS.bullet_move, this);

    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, Bullet.size, 0, 2 * Math.PI);
    ctx.stroke();
  }
}
