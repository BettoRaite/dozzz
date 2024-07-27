import { Bullet } from "./bullet.ts";
import { Mob } from "./mob.ts";
import { globalState, G_STATE_KEYS } from "./global-state.ts";
import { Vector2 } from "./utils/vector2.ts";

Bullet.speed = 3;
Mob.speed = 0.3;
Bullet.size = 20;

type Context2DMixin = {
	clear: () => void;
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
		clear() {
			if (this instanceof CanvasRenderingContext2D) {
				this.clearRect(0, 0, canvas.width, canvas.height);
			}
		},
	};

	Object.assign(Object.getPrototypeOf(ctx), mixin);

	return ctx as CanvasRenderingContext2D & Context2DMixin;
}
