import { GameObject } from "./game-object.ts";
import { events, EVENT_KEYS } from "./events/events.ts";

export type Component = (entity: Entity) => void;

export class Entity extends GameObject {
  color = "black";
  size = 10;
  static components: Component[] = [];
  static addComponent(component: Component) {
    if (this.components.length === 0) {
      this.components = [];
    }
    this.components.push(component);
  }
  runComponents() {
    const components = Object.getPrototypeOf(this)?.constructor.components;
    if (Array.isArray(components)) {
      for (const component of components) {
        component(this);
      }
    }
  }
  detach(): void {
    events.emit(EVENT_KEYS.entity_destroyed, this);
    super.detach();
  }
  draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    _: () => void
  ): void {
    super.draw(ctx, x, y, () => {
      this.runComponents();
    });
  }
}
