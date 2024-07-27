import type { GameObject } from "../game-object.ts";
export const EVENT_KEYS = {
	shoot: Symbol("An event key for when user wants to shoot"),
	player_move: Symbol(
		"An event key for all listeners to listen to current player position",
	),
	bullet_move: Symbol(
		"An event key for all listeners to listen to current bullet position",
	),
};

type Listener<T> = {
	key: T;
	caller: GameObject;
	handler: (...values: unknown[]) => void;
};

export class Events<T> {
	listeners: Listener<T>[] = [];
	emit(key: T, ...values: unknown[]) {
		for (const listener of this.listeners) {
			if (listener.key === key) {
				listener.handler(...values);
			}
		}
	}
	on(key: T, caller: GameObject, handler: (...values: unknown[]) => void) {
		this.listeners.push({
			key,
			handler,
			caller,
		});
	}
	unsubscribe(caller: GameObject) {
		this.listeners = this.listeners.filter(
			(listener) => listener.caller !== caller,
		);
	}
}

export const events = new Events<symbol>();
