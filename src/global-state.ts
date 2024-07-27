// import { Vector2 } from "./utils/vector2.ts";
// import { Vector2InstanceError } from "./utils/errors.ts";

export const G_STATE_KEYS = {
	playerPos: Symbol(),
	mousePos: Symbol(),
};

export class GlobalState {
	stateStore: Map<symbol, unknown> = new Map();
	setState(key: symbol, newState: unknown) {
		this.stateStore.set(key, newState);
	}
	getState(key: symbol) {
		return this.stateStore.get(key);
	}
}

export const globalState = new GlobalState();
