import { type Readable, type Writable, writable, get } from "svelte/store";

export type CustomReadable<T> = Readable<T> & {
	get: () => T;
};

export class Playback {
	private playback: Writable<boolean>;

	constructor(defaultPlayback = false) {
		this.playback = writable(defaultPlayback);
	}

	get() {
		return get(this.playback);
	}

	asWritable() {
		return this.playback;
	}

	asReadable(): Readable<boolean> {
		return {
			subscribe: this.playback.subscribe,
		};
	}

	setPlayback(newPlayback: boolean) {
		this.playback.set(newPlayback);
	}

	togglePlayback() {
		this.playback.update((oldPlayback) => !oldPlayback);
	}
}
