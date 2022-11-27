<h1>WebScreenRecorder</h1>

`WebScreenRecorder`는 브라우저의 화면 녹화 기능에 접근하기 위한 라이브러리입니다. <br>
함수형으로 프로그래밍 되었습니다.

아래와 같이 사용할 수 있습니다.

```javascript
import WebScreenRecorder from "./index.mjs";

const ScreenRecorder = WebScreenRecorder({
  height: 1920,
  width: 1080,
  fileName: "test",
  ext: "webm",
});

/** 영상 녹화 시작 */
await ScreenRecorder.startRecord();

/** 영상 녹화 종료 */
ScreenRecorder.stopRecord();
```

## 기능

- 화면 녹화 기능
- 세부 설정
  - 영상 해상도 지정
  - 영상 포멧 지정
  - 출력 영상 파일 제목 지정 <br>
    세부 설정 예시:
    ```json
    {
      "height": 1920,
      "width": 1080,
      "fileName": "test",
      "ext": "mp4"
    }
    ```

## 확장자 목록

- [x] `webm`
- [ ] `mp4`
