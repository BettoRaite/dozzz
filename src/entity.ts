import { GameObject } from "./game-object.ts";
import { events, EVENT_KEYS } from "./events/events.ts";
export class Entity extends GameObject {
  detach(): void {
    events.emit(EVENT_KEYS.entity_destroyed, this);
    super.detach();
  }
}
