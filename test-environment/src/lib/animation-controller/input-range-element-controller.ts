import type { InputRangeConfig } from "../schemas/input-range-config";

export class InputRangeElementController {
	private element: HTMLInputElement;

	constructor(element: HTMLInputElement, options?: InputRangeConfig) {
		this.element = element;
		this.init(options);
	}

	// === 초기화 로직 ===
	init(options?: InputRangeConfig) {
		const { duration = 10, step = 0.001 } = options ?? {};

		// 속성 설정
		[this.element.min, this.element.max] = [
			(0).toString(),
			duration.toString(),
		];
		this.element.step = step.toString();

		// 값 설정
		this.element.value = this.element.min;
	}

	// === getter/setters ===
	get min() {
		return Number.parseFloat(this.element.min);
	}

	get max() {
		return Number.parseFloat(this.element.max);
	}

	get step() {
		return Number.parseFloat(this.element.step);
	}

	get duration() {
		return this.max - this.min;
	}

	get progress() {
		return Number.parseFloat(this.element.value);
	}

	set progress(newProgress: number) {
		this.element.value = newProgress.toString();
	}

	getProgress() {
		return this.progress;
	}

	setProgress(newProgress: number) {
		this.progress = newProgress;
	}
}
