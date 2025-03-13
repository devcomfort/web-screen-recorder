<script lang="ts">
  import { assert } from "@toss/assert";
  import * as F from "fp-ts/function";
  import { onDestroy, onMount } from "svelte";

  import { isHTMLInputElement, logger } from "./lib";
  import { get, writable } from "svelte/store";
  import { isNumber } from "fp-ts/lib/number";

  const MIN_VALUE = 0;
  const MAX_VALUE = 10;

  /** 애니메이션 진행 속도 (만약 3이라면, 초당 3씩 진행됩니다) */
  const ANIMATION_INTERVAL = 1;
  const PREVIOUS_TIMESTAMP_KEY_NAME = "previousTimeStamp";

  let inputElement: HTMLInputElement;
  /** 재생/일시정지 상태 */
  const playback = writable(false);

  const getInputRangeProgress = () => {
    if (!isHTMLInputElement(inputElement)) return null;
    const currentRangeValue = Number.parseFloat(inputElement.value) + MIN_VALUE;
    const duration = MAX_VALUE - MIN_VALUE;

    return currentRangeValue / duration;
  };

  /** input:range 값 변경 함수 */
  const setInputRangeValueInto = (newValue: number) => {
    assert(isHTMLInputElement(inputElement), "아직 준비되지 않았습니다.");
    inputElement.value = newValue.toString();
  };

  /** 재생/일시정지 상태를 토글하는 함수 */
  const togglePlayback = () => playback.update(($playback) => !$playback);

  /**
   * 애니메이션을 진행시키는 함수
   *
   * @description
   * 현재 시간과 이전 호출 시간의 차이를 계산하여 애니메이션을 일정한 속도로 진행합니다.
   * {@link ANIMATION_INTERVAL}을 기준으로 경과 시간에 비례하는 진행량을 계산합니다.
   * 프레임 속도와 관계없이 일관된 애니메이션 속도를 유지합니다.
   *
   * @example
   * // 애니메이션 프레임마다 호출
   * requestAnimationFrame(() => {
   *   progressAnimation();
   * });
   *
   * @returns {void} 리턴값 없음
   * @see ANIMATION_INTERVAL - 애니메이션 간격(ms)
   * @see PREVIOUS_TIMESTAMP_KEY_NAME - 이전 타임스탬프를 저장하는 세션스토리지 키
   */
  const progressAnimation = (): void => {
    // === 데이터 호출 ===
    /** 이전 함수 호출 시각 */
    const previousTimeStamp = F.pipe(
      sessionStorage.getItem(PREVIOUS_TIMESTAMP_KEY_NAME), // 데이터 호출 시도
      // 데이터가 null이면 현재 시간으로 대치 & 데이터가 있으면 숫자로 변환
      (time) => (time === null ? new Date().getTime() : Number.parseFloat(time))
    );
    /** 현재 시점 */
    const currentTimeStamp = new Date().getTime();

    // === 애니메이션 데이터 계산 ===
    /** 계산된 시차 (단위: ms) */
    const timeDeviation = currentTimeStamp - previousTimeStamp;
    /** 업데이트 할 input:range 크기 계산 (시차 기반) */
    const step = (timeDeviation / 1000) * ANIMATION_INTERVAL;

    // === 애니메이션 수행 ===
    // 기존 input:range 값 호출
    const value = Number.parseFloat(inputElement.value);
    // 값 반영
    setInputRangeValueInto(value + step);

    logger.info({
      value,
      step,
    });

    // === 데이터 업데이트 ===
    // 시간값 업데이트
    sessionStorage.setItem(
      PREVIOUS_TIMESTAMP_KEY_NAME,
      currentTimeStamp.toString()
    );
  };

  const startAnimationLoop = () => {
    sessionStorage.removeItem(PREVIOUS_TIMESTAMP_KEY_NAME);

    const loop = () => {
      /** 종료 필요 여부 */
      const shouldTerminate =
        // 1. 사용자 요청에 의한 종료
        !get(playback) ||
        // 2. 애니메이션 완료에 의한 종료
        F.pipe(
          getInputRangeProgress(),
          (progressRatio) => isNumber(progressRatio) && progressRatio >= 1
        );

      if (shouldTerminate) return;

      progressAnimation();

      window.requestAnimationFrame(loop);
    };

    loop();
  };

  // === 상태 구독 ===
  const unsubscribePlayback = playback.subscribe(($playback) => {
    if (isHTMLInputElement(inputElement) && $playback) {
      startAnimationLoop();
    }
  });

  onMount(() => {
    setInputRangeValueInto(0);
  });

  onDestroy(() => {
    unsubscribePlayback();
  });
</script>

<div>
  <div>
    <input
      type="range"
      step="0.001"
      min={MIN_VALUE}
      max={MAX_VALUE}
      bind:this={inputElement}
    />
  </div>

  <div>
    <button on:click={() => setInputRangeValueInto(MIN_VALUE)}
      >{MIN_VALUE}초로</button
    >
    <button on:click={() => setInputRangeValueInto(MAX_VALUE)}
      >{MAX_VALUE}초로</button
    >
    <button on:click={() => togglePlayback()}
      >{$playback ? "일시정지" : "재생"}</button
    >
  </div>
</div>

<style lang="scss">
  input[type="range"] {
    width: 60vw;
  }
</style>
