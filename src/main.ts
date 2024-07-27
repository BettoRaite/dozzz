import { GameLoop } from "./game-loop.ts";
import { Input } from "./utils/input.ts";
import { GameObject } from "./game-object.ts";
import { getContext2D } from "./init.ts";
import { Player } from "./objects/player.ts";
import { Vector2 } from "./utils/vector2.ts";
import { EVENT_KEYS, events } from "./events/events.ts";
import { Mob } from "./objects/mob.ts";
import { ctxDebug } from "./debug.ts";

const ctx = getContext2D();
ctx.imageSmoothingEnabled = false;

const mainScene = new GameObject();
const player = new Player(new Vector2(10, 10));

mainScene.addChild(player);
const mobs = 1;
for (let i = 0; i < mobs; ++i) {
	const x = Math.random() * 500;
	const y = Math.random() * 500;
	const mob = new Mob(new Vector2(x, y));
	mainScene.addChild(mob);
}

const input = new Input();

input.on(" ", () => {
	events.emit(EVENT_KEYS.shoot);
});

const position = new Vector2();

const render = () => {
	mainScene.draw(ctx, position.x, position.y);
};

const update = (deltaTime: number) => {
	[position.x, position.y] = input.getDirection();
	mainScene.stepEntry(deltaTime, mainScene);
	ctx.clearCanvas();
};

const gameLoop = new GameLoop(render, update);
gameLoop.start();
