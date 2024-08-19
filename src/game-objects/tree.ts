import { Entity } from "../entity.ts";
import { Collider } from "../components/collider";

export class Tree extends Entity {
  protected renderSelf() {}
  protected drawSelf(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "green";
    ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }
}
Tree.addComponent(
  Collider({
    size: 10,
  })
);
