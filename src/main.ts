import { GameLoop } from "./game-loop.ts";
import { Input } from "./utils/input.ts";
import { GameObject } from "./game-object.ts";
import { getContext2D } from "./init.ts";
import { Player } from "./game-objects/player.ts";
import { Vector2 } from "./utils/vector2.ts";
import { Enemy } from "./game-objects/enemy.ts";
import { Spawner } from "./spawner.ts";
import { canvas } from "./init.ts";

const ctx = getContext2D();
ctx.imageSmoothingEnabled = false;

const mainScene = new GameObject();
const player = new Player(new Vector2(100 * 2, 100 * 2));
mainScene.addChild(player);
const spawner = new Spawner({
  scene: mainScene,
  Constructor: Enemy,
  start: new Vector2(0, 0),
  end: new Vector2(canvas?.height, canvas?.width),
  growthRate: 1,
  offset: 100,
  isOutbounds: true,
});

spawner.spawn();

const input = new Input();

input.on(" ", player, () => {
  player.shoot();
});

input.on("shoot", player, () => {
  player.shoot();
});

const position = mainScene.position;

const gameLoop = new GameLoop(
  function render() {
    mainScene.draw(ctx, position.x, position.y);
  },

  function update(deltaTime: number) {
    [position.x, position.y] = input.getDirection();
    mainScene.stepEntry(deltaTime, mainScene);
    // spawner.respawn();
    ctx.clearCanvas();
  }
);
gameLoop.start();
