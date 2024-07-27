import { GameLoop } from "./game-loop.ts";
import { Input } from "./utils/input.ts";
import { GameObject } from "./game-object.ts";
import { getContext2D } from "./init.ts";
import { Player } from "./player.ts";
import { Vector2 } from "./utils/vector2.ts";
import { EVENT_KEYS, events } from "./events/events.ts";
import { Mob } from "./mob.ts";

const ctx = getContext2D();

const mainScene = new GameObject();
const player = new Player(new Vector2(10, 10));

mainScene.addChild(player);

for (let i = 0; i < 1; ++i) {
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

const draw = () => {
	mainScene.draw(ctx, position.x, position.y);
};

const speed = 2;

const render = () => {
	[position.x, position.y] = input.getDirection();
	ctx.clear();
};

const gameLoop = new GameLoop(draw, render);
gameLoop.start();
