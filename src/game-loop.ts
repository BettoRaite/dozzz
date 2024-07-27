export class GameLoop {
	private isRunning = false;
	private rafId = 0;
	private lastFrame = 0;
	private accumulatedTime = 0;
	private readonly step = 1000 / 60; // 60 FPS
	private readonly render: () => void;
	private readonly update: (deltaTime: number) => void;

	constructor(render: () => void, update: (deltaTime: number) => void) {
		this.render = render;
		this.update = update;
	}

	private loop = (timestamp: number) => {
		if (!this.isRunning) return;

		const deltaTime = timestamp - this.lastFrame;
		this.lastFrame = timestamp;
		this.accumulatedTime += deltaTime;

		while (this.accumulatedTime >= this.step) {
			this.update(deltaTime);
			this.accumulatedTime -= this.step;
		}

		this.render();
		this.rafId = requestAnimationFrame(this.loop);
	};

	start() {
		if (!this.isRunning) {
			this.isRunning = true;
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
