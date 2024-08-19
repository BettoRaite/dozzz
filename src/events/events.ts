export const EVENT_KEYS = {
  shoot: Symbol("An event key for when user wants to shoot."),
  player_move: Symbol(
    "An event key for all listeners to listen to current player position."
  ),
  bullet_move: Symbol(
    "An event key for all listeners to listen to current bullet position."
  ),
  entity_destroyed: Symbol("An event key for when an entity is destroy."),
  new_wave: Symbol("An event key for when a new wave of enemies is spawned."),
};

type Listener<T> = {
  key: T;
  caller: object;
  handler: (...values: unknown[]) => void;
};

export class Events<T> {
  listeners: Listener<T>[] = [];
  callers: WeakMap<object, T> = new WeakMap();
  emit(key: T, ...values: unknown[]) {
    for (const listener of this.listeners) {
      if (listener.key === key) {
        listener.handler(...values);
      }
    }
  }
  on(key: T, caller: object, handler: (...values: unknown[]) => void) {
    this.listeners.push({
      key,
      caller,
      handler,
    });
    this.callers.set(caller, key);
  }
  unsubscribe(caller: object) {
    this.listeners = this.listeners.filter(
      (listener) => listener.caller !== caller
    );
    // Might be unnecessary to do so, but I decided to do it anyway)
    this.callers.delete(caller);
  }
  has(caller: object): T | undefined {
    return this.callers.get(caller);
  }
}

export const events = new Events<symbol>();
