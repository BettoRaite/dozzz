import { Vector2 } from "./utils/vector2.ts";
import { getRandNum, getRandBool, getRandInt } from "./utils/random.ts";
import type { GameObject } from "./game-object.ts";

type GameObjectConstructor = {
  new (position?: Vector2): GameObject;
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
  // constructor(
  //   scene: GameObject,
  //   entities: number,
  //   Constructor: GameObjectConstructor,
  //   start: Vector2,
  //   end: Vector2,
  //   offset = 0,
  //   isOutbounds = false
  // ) {
  //   this.scene = scene;
  //   this.Constructor = Constructor;

  //   Spawner.spawn(
  //     scene,
  //     entities,
  //     Constructor,
  //     start,
  //     end,
  //     offset,
  //     isOutbounds
  //   );
  // }
  spawn(
    scene: GameObject,
    entities: number,
    Constructor: GameObjectConstructor,
    start: Vector2,
    end: Vector2,
    offset = 0,
    isOutbounds = false
  ) {
    for (let i = 0; i < entities; ++i) {
      let position: Vector2;
      if (isOutbounds) {
        position = Spawner.getRandPosOutbounds(start, end, offset);
      } else {
        position = Spawner.getRandPos(start.x, end.x, start.y, end.y);
      }
      const entity = new Constructor(position);
      scene.addChild(entity);
    }
  }
  respawn() {}
  /*
  
  The value of this in User.staticMethod() call is the class constructor User itself (the “object before dot” rule).
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

  static createTodays() {
    // remember, this = Article
    return new this("Today's digest", new Date());
  }
}

let article = Article.createTodays();

alert( article.title ); // Today's digest
As you might have already guessed, extends gives Rabbit the [[Prototype]] reference to Animal.


  */
  static getRandPosOutbounds(start: Vector2, end: Vector2, offset: number) {
    const location = getRandInt(1, 4);
    if (location === 3) console.log(location);
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
