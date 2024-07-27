import { Bullet } from "./objects/bullet.ts";
import { Mob } from "./objects/mob.ts";
import { globalState, G_STATE_KEYS } from "./global-state.ts";
import { Vector2 } from "./utils/vector2.ts";

Bullet.speed = 5;
Bullet.size = 5;
Mob.speed = 0.3;

type Context2DMixin = {
	clearCanvas: () => void;
};

export function getContext2D(): CanvasRenderingContext2D & Context2DMixin {
	const canvas: HTMLCanvasElement | null = document.getElementById(
		"canvas",
	) as HTMLCanvasElement | null;
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
				new Vector2(e.clientX, e.clientY),
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
