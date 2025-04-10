# Web Screen Recorder Schemas

이 디렉토리는 Web Screen Recorder 프로젝트에서 사용되는 다양한 스키마 정의를 포함하고 있습니다. 이 스키마들은 [Zod](https://github.com/colinhacks/zod) 라이브러리를 사용하여 정의되었으며, 타입 안정성과 런타임 데이터 검증을 제공합니다.

## media-type

미디어 타입을 정의하는 스키마입니다.

```typescript
// "video" 또는 "audio" 값을 가질 수 있는 열거형
export const MediaType_ = z.enum(["video", "audio"]);
```

이 스키마는 미디어가 비디오인지 오디오인지를 구분하는 데 사용됩니다. 다른 스키마에서 미디어 타입을 참조할 때 기본 타입으로 활용됩니다.

## mime-type

MIME 타입에 대한 상세 정보를 포함하는 스키마입니다.

```typescript
export const MIMEType_ = z.object({
  mediaType: MediaType_.describe("미디어 타입. 어떤 미디어에 대한 MIME 타입인지 정의함. (예시: video, audio)"),
  codec: z.string().describe("코덱 정보. (예시: h264, h265, etc.)"),
  container: z.string().describe("컨테이너 정보. (예시: webm, mp4, avi, etc.)"),
  mimeType: z.string().describe("MIME 타입. (예시: video/webm, video/mp4, audio/webm, audio/mp3, etc.)"),
});
```

이 스키마는 미디어의 MIME 타입뿐만 아니라 코덱, 컨테이너 등의 추가 정보를 포함하여 더 자세한 미디어 형식 정보를 제공합니다.

## video-type

비디오 특화 타입을 정의하는 스키마입니다.

```typescript
export const VideoType_ = z.object({
  mediaType: MediaType_.describe("비디오 타입"),
  mimeType: MIMEType_.describe("비디오 타입의 MIME 타입"),
});
```

이 스키마는 비디오 미디어를 위한 특화된 정보를 제공하며, `MediaType_`과 `MIMEType_`을 함께 사용합니다.

## media-recorder-options.ts

브라우저의 `MediaRecorder` API 생성자 파라미터를 위한 스키마입니다. 이 스키마는 웹 브라우저의 MediaRecorder 클래스 생성자에 전달되는 옵션들을 정의합니다.

```typescript
export const MediaRecorderOptions_ = z.object({
  audioBitsPerSecond: z.enum(["64000", "96000", "128000", "192000", "256000", "320000"]),
  videoBitsPerSecond: z.enum(["1000000", "2500000", "5000000", "8000000", "12000000", "20000000"]),
  bitsPerSecond: z.enum(["1500000", "3000000", "6000000", "10000000", "15000000"]),
  mimeType: z.string(),
}).partial();
```

### 비트레이트 설정 구조

이 스키마의 비트레이트 설정(audioBitsPerSecond, videoBitsPerSecond, bitsPerSecond)은 계층 구조로 작동합니다:

- **audioBitsPerSecond**: 오디오 스트림에만 적용되는 비트레이트입니다. 낮은 값(64kbps)은 음성에 적합하고, 높은 값(320kbps)은 고품질 음악에 적합합니다.
- **videoBitsPerSecond**: 비디오 스트림에만 적용되는 비트레이트입니다. 값에 따라 저화질(1Mbps)부터 4K 고화질(20Mbps)까지 설정할 수 있습니다.
- **bitsPerSecond**: 전체 미디어 스트림(오디오+비디오)의 총 대역폭 제한 역할을 합니다. 개별 스트림의 비트레이트를 설정했더라도, 이 값이 설정되면 모든 스트림의 총합은 이 값을 초과할 수 없습니다.

이 옵션들을 통해 녹화되는 미디어의 품질과 파일 크기를 세밀하게 제어할 수 있습니다.
