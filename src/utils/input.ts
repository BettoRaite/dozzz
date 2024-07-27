import { Events, events, EVENT_KEYS } from "../events/events.ts";

const keyValueMap: Record<string, number> = {
	w: -1,
	s: 1,
	a: -1,
	d: 1,
};

const getKeyValue = (key: string): number => keyValueMap[key] ?? 0;
const hasKey = (key: string): boolean => keyValueMap[key] !== undefined;

export class Input extends Events<string> {
	private keyX = "";
	private keyY = "";
	private _currentKey: string | null = "";
	constructor() {
		super();
		const handleKeyUp = (e: KeyboardEvent) => {
			const key = e.key;
			this.currentKey = null;

			if (getKeyValue(key)) {
				// if key === current key y or key x
				if (this.keyY === key) this.keyY = "";
				if (this.keyX === key) this.keyX = "";
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			const key = e.key;
			if (hasKey(key)) {
				const keyLowCase = key.toLowerCase();
				if (keyLowCase.includes("w") || keyLowCase.includes("s")) {
					this.keyY = key;
				} else {
					this.keyX = key;
				}
			}
			this.emit(key);
		};

		const handleClick = (e: MouseEvent) => {
			events.emit(EVENT_KEYS.shoot);
		};

		window.addEventListener("keyup", handleKeyUp);
		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("click", handleClick);
	}
	onKey(key: string, handler: () => void) {
		this.on(key, handler);
	}
	get currentKey() {
		return this._currentKey;
	}
	set currentKey(key: string | null) {
		this._currentKey = key;
	}
	getDirection(): number[] {
		return [getKeyValue(this.keyX), getKeyValue(this.keyY)];
	}
}
