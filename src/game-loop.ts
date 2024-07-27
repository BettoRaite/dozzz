export class GameLoop {
	private isRunning = false;
	private rafId = 0;
	private lastFrame = 0;
	private accumulatedTime = 0;
	private readonly step = 1000 / 60; // 60 FPS
	private readonly render: () => void;
	private readonly draw: () => void;

	constructor(draw: () => void, render: () => void) {
		this.draw = draw;
		this.render = render;
	}

	private loop = (timestamp: number) => {
		if (!this.isRunning) return;

		const deltaTime = timestamp - this.lastFrame;
		this.lastFrame = timestamp;
		this.accumulatedTime += deltaTime;

		while (this.accumulatedTime >= this.step) {
			this.render();
			this.accumulatedTime -= this.step;
		}

		this.draw();
		this.rafId = requestAnimationFrame(this.loop);
	};

	start() {
		if (!this.isRunning) {
			this.isRunning = true;
			this.lastFrame = performance.now();
			this.rafId = requestAnimationFrame(this.loop);
		}
	}

	stop() {
		if (this.isRunning) {
			cancelAnimationFrame(this.rafId);
			this.isRunning = false;
		}
	}
}
