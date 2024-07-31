import { Vector2 } from "./utils/vector2.ts";
import { getRandNum, getRandBool, getRandInt } from "./utils/random.ts";
import type { GameObject } from "./game-object.ts";
import { events, EVENT_KEYS } from "./events/events.ts";
import { isObject } from "./utils/type.ts";

type GameObjectConstructor = {
  new (position?: Vector2): GameObject;
};

type SpawnerParams = {
  scene: GameObject;
  Constructor: GameObjectConstructor;
  start: Vector2;
  end: Vector2;
  growthRate?: number;
  entitiesToSpawn?: number;
  offset?: number;
  isOutbounds?: boolean;
};
export class Spawner {
  // scene: GameObject;
  // Constructor: GameObjectConstructor;
  /**
   *
   * @param scene
   * @param entities
   * @param Constructor
   * @param position
   * @param offset - If offset is specified then the entity will be spawned outbounds, in
   * other words at possitions Xmin - offset
   */
  scene: GameObject;
  entitiesToSpawn: number;
  EntityConstructor: GameObjectConstructor;
  start: Vector2;
  end: Vector2;
  growthRate;
  offset;
  isOutbounds;

  private canSpawn = true;
  private entitiesCounter: number = 0;
  constructor({
    scene,
    Constructor,
    start,
    end,
    growthRate = 10,
    entitiesToSpawn = growthRate,
    offset = 0,
    isOutbounds = false,
  }: SpawnerParams) {
    this.scene = scene;
    this.EntityConstructor = Constructor;
    this.start = start;
    this.end = end;
    this.offset = offset;
    this.entitiesToSpawn = Math.floor(entitiesToSpawn);
    this.isOutbounds = isOutbounds;
    this.growthRate = Math.floor(growthRate);
  }

  spawn() {
    this.entitiesCounter = this.entitiesToSpawn;
    console.log(this.entitiesToSpawn);
    Spawner.spawn(
      this.scene,
      this.EntityConstructor,
      this.start,
      this.end,
      this.entitiesToSpawn,
      this.offset,
      this.isOutbounds
    );

    events.on(EVENT_KEYS.entity_destroyed, this, (entity) => {
      if (!isObject(entity)) {
        throw new TypeError("entity must be an instance of gameObject");
      }
      if (
        entity instanceof this.EntityConstructor &&
        this.entitiesCounter > 0
      ) {
        this.entitiesCounter -= 1;
        this.respawn();
      }
    });
  }
  static spawn(
    scene: GameObject,
    Constructor: GameObjectConstructor,
    start: Vector2,
    end: Vector2,
    entitiesNumber: number,
    offset = 0,
    isOutbounds = false
  ) {
    for (let i = 0; i < entitiesNumber; ++i) {
      let position: Vector2;
      if (isOutbounds) {
        //  The value of 'this' in Spawner.staticMethod() call is the class constructor itself.
        position = Spawner.getRandPosOutbounds(start, end, offset);
      } else {
        position = Spawner.getRandPos(start.x, end.x, start.y, end.y);
      }
      const entity = new Constructor(position);
      scene.addChild(entity);
    }
  }
  respawn() {
    if (this.entitiesCounter === 0) {
      console.log(this.entitiesCounter);
      this.entitiesToSpawn += this.growthRate;
      this.entitiesCounter = this.entitiesToSpawn;
      this.spawn();
    }
  }
  static getRandPosOutbounds(start: Vector2, end: Vector2, offset: number) {
    const location = getRandInt(1, 4);
    switch (location) {
      case 1: {
        return Spawner.getRandPos(start.x, end.x, start.y - offset, start.y);
      }
      case 2: {
        const isLeft = getRandBool();

        const xMin = isLeft ? start.x - offset : end.x;
        const xMax = isLeft ? start.x : end.x + offset;

        return Spawner.getRandPos(xMin, xMax, start.y, end.y);
      }
      case 3: {
        return Spawner.getRandPos(start.x, end.x, end.y, end.y + offset);
      }
      default: {
        throw new Error(`Invalid location: ${location}`);
      }
    }
  }
  static getRandPos(
    xMin: number,
    xMax: number,
    yMin: number,
    yMax: number
  ): Vector2 {
    return new Vector2(getRandNum(xMin, xMax), getRandNum(yMin, yMax));
  }
}
/* Study notes
#Rule about extend:
Extends gives SomeChildClass the [[Prototype]] reference to Spawner.
  
Example:
class Spawner {
  static spawnerAt(position: Vector2) {
    // remember, this = Spawner
    return new this(position);
  }
}

const spawner = Spawner.spawnerAt();

*/
