import { Bullet } from "./game-objects/bullet.ts";
import { Enemy } from "./game-objects/enemy.ts";
import { Player } from "./game-objects/player.ts";
import { globalState, G_STATE_KEYS } from "./global-state.ts";
import { Vector2 } from "./utils/vector2.ts";

Bullet.speed = 5;
Bullet.size = 5;
Player.cooldownSeconds = 0.2;
Enemy.speed = 0.5;

export const canvas = document.getElementById(
  "canvas"
) as HTMLCanvasElement | null;

type Context2DMixin = {
  clearCanvas: () => void;
};
export function getContext2D(): CanvasRenderingContext2D & Context2DMixin {
  if (!canvas) {
    throw new TypeError("canvas is null");
  }

  const handleMouseMove = (e: MouseEvent) => {
    const mousePos = globalState.getState(G_STATE_KEYS.mousePos);
    if (mousePos instanceof Vector2) {
      mousePos.x = e.offsetX;
      mousePos.y = e.offsetY;
    } else {
      globalState.setState(
        G_STATE_KEYS.mousePos,
        new Vector2(e.clientX, e.clientY)
      );
    }
  };
  canvas.addEventListener("mousemove", handleMouseMove);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new TypeError("context is null");
  }
  // Adding mixin.
  const mixin: Context2DMixin = {
    clearCanvas() {
      if (this instanceof CanvasRenderingContext2D) {
        this.clearRect(0, 0, canvas.width, canvas.height);
      }
    },
  };

  Object.assign(Object.getPrototypeOf(ctx), mixin);

  return ctx as CanvasRenderingContext2D & Context2DMixin;
}
