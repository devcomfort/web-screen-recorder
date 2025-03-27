import {
	createMediaRecorder,
	createMediaStream,
} from "@devcomfort/web-screen-recorder";

export async function createRecorder(duration: number, fps = 60) {
	try {
		// 비디오 스트림 가져오기
		const videoStream = await createMediaStream("video", {
			video: { width: 1280, height: 720 },
			audio: true,
		});

		const recorder = createMediaRecorder(videoStream, {
			mediaType: "video",
			codec: "h264",
			// TODO: container 역할 이해하기, 필요하면 코드 수정하기 (DX 및 UX를 높여야함)
			container: "webm",
		});

		recorder.startRecord(fps);

		setTimeout(async () => {
			await recorder.stopRecord();
			recorder.saveFile("my-video.webm");
			recorder.stopStream();
		}, duration);
	} catch (error) {
		console.error("녹화 예제 실행 중 오류:", error);
	}
}
