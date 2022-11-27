<h1>web-screen-recorder</h1>

`web-screen-recorder`는 브라우저의 화면 녹화 기능에 접근하기 위한 라이브러리입니다.

## 설치

```bash
# npm
npm i @devcomfort/web-screen-recorder
# yarn
yarn add @devcomfort/web-screen-recorder
# pnpm
pnpm i @devcomfort/web-screen-recorder
```

## 사용

아래와 같이 사용할 수 있습니다.

```javascript
import Recorder from "@devcomfort/web-screen-recorder";

const _Recorder = Recorder({
  height: 1080,
  width: 1920,
  fileName: "test.webm",
});

/** 영상 녹화 시작 */
await Recorder.startRecord();

/** 영상 녹화 종료 */
Recorder.stopRecord();
```

## 확장자 목록

- [x] `webm`
- [ ] `mp4`
