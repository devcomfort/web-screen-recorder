<script lang="ts">
  import { onMount } from "svelte";

  import { AnimationController } from "./lib/animation-controller";

  import "./app.css";
  import { fromStore } from "svelte/store";
  import { pipe } from "fp-ts/lib/function";
  import { match } from "ts-pattern";

  /** 애니메이션 총 진행 시간 (0-{DURATION}) */
  const DURATION = 10;
  /** input:range step size */
  const STEP = 0.001;
  /** 애니메이션 진행 속도 (만약 3이라면, 초당 3씩 진행됩니다) */
  const ANIMATION_INTERVAL = 1;

  // 재생 상태
  let playback: { current: boolean } | undefined = $state(undefined);

  let inputElement: HTMLInputElement;

  let animationController: AnimationController | undefined = $state(undefined);

  onMount(() => {
    animationController = new AnimationController(inputElement, {
      animationConfig: {
        animationInterval: ANIMATION_INTERVAL,
      },
      inputRangeConfig: {
        duration: DURATION,
        step: STEP,
      },
    });

    playback = pipe(
      animationController.getPlayback().asReadable(),
      (readable) => fromStore(readable)
    );
  });
</script>

<div class="space-y-2">
  <div>
    <input
      type="range"
      step="0.001"
      min="0"
      max={DURATION}
      bind:this={inputElement}
    />
  </div>

  <div>
    <button
      onclick={() => {
        if (animationController instanceof AnimationController)
          animationController.setProgress(0);
      }}>0초로</button
    >
    <button
      onclick={() => {
        if (animationController instanceof AnimationController)
          animationController.setProgress(DURATION);
      }}>{DURATION}초로</button
    >
    <button
      onclick={() => {
        if (animationController instanceof AnimationController)
          animationController.togglePlayback();
      }}
      id="play-and-pause-button"
      >{match({ current: playback?.current })
        .with({ current: true }, () => "일시정지")
        .with({ current: false }, () => "재생")
        .otherwise(() => "준비 중")}</button
    >
  </div>

  <div class="grid grid-cols-4 gap-4">
    <button>녹화 시작</button>
    <button>녹화 종료</button>
    <button>다운로드</button>

    <button>{DURATION}초 동안 녹화하기</button>
  </div>
</div>

<style lang="scss">
  input[type="range"] {
    width: 60vw;
  }
</style>
