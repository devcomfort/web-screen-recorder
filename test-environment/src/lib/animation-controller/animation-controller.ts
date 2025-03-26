import { get } from "svelte/store";
import type { AnimationParams } from "../schemas";
import { InputRangeElementController } from "./input-range-element-controller";
import { Playback } from "./playback-store";

export class AnimationController extends InputRangeElementController {
	private playback: Playback;
	/** 초당 애니메이션 진행도 (1이라면 초당 1만큼 진행함) */
	private animationInterval: number;
	/** 애니메이션이 마지막으로 갱신된 시간 */
	private previousTimestamp: number | undefined;

	constructor(element: HTMLInputElement, options?: AnimationParams) {
		// 애니메이션 관련 설정
		const { animationConfig, inputRangeConfig } = options ?? {};
		const { animationInterval = 1 } = animationConfig ?? {};

		super(element, inputRangeConfig);

		// 애니메이션이 마지막으로 갱신된 시간
		this.previousTimestamp = undefined;
		// 초당 애니메이션 진행도
		this.animationInterval = animationInterval;
		// 재생 관련 변수 설정
		this.playback = new Playback(false);
	}

	getPlayback() {
		return this.playback;
	}

	// === playback 관련 메소드들 (위임 기반 구현) ===
	setPlayback(newPlayback: boolean) {
		this.playback.setPlayback(newPlayback);
	}

	togglePlayback() {
		this.playback.togglePlayback();

		// 애니메이션을 시작합니다 (재생 상태인 경우에만)
		if (this.playback.get()) this.initLoop();
	}

	// === 애니메이션 관련 함수들 ===

	/** 이전 타임스탬프와 현재 타임스탬프 간의 시차를 통해 진행도를 반환합니다. */
	private proceedAnimation() {
		const previousTimestamp = this.previousTimestamp ?? new Date().getTime();
		const currentTimestamp = new Date().getTime();

		// 소요 시간 (단위: 초)
		const timeDeviation = (currentTimestamp - previousTimestamp) / 1000;

		// 진행도 변화량 ("input:range를 이만큼 변화시키면 됩니다")
		const progress = timeDeviation * this.animationInterval;

		this.previousTimestamp = currentTimestamp;

		return progress;
	}

	initLoop() {
		this.previousTimestamp = new Date().getTime();

		const animationLoop = () => {
			// === 함수 정지 여부 결정 ===
			const isPaused = !get(this.playback.asReadable());
			const isDone = this.duration <= this.progress;
			const shouldTerminate = isPaused || isDone;

			if (shouldTerminate) return;

			// === 애니메이션 진행 ===
			const timeProgress = this.proceedAnimation();
			const newProgress = this.progress + timeProgress;
			this.progress = newProgress;

			// === 애니메이션 처리 함수 대기열에 올리기 ===
			window.requestAnimationFrame(animationLoop);
		};

		animationLoop();
	}
}
