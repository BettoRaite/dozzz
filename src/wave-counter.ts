import { events, EVENT_KEYS } from "./events/events.ts";
import type { Spawner } from "./spawner.ts";
const waveCountText = document.getElementById("wave-counter");

export class WaveCounter {
  private spawner: Spawner;
  private count = 1;
  constructor(spawner: Spawner) {
    this.spawner = spawner;
    events.on(EVENT_KEYS.new_wave, this, (spawner) => {
      if (spawner === this.spawner) {
        this.increaseCount();
      }
    });
  }
  increaseCount() {
    if (waveCountText instanceof HTMLParagraphElement) {
      waveCountText.textContent = `Wave: ${this.count}`;
      this.count++;
    } else {
      console.error("'wave-count' node does not exists.");
    }
  }
}
