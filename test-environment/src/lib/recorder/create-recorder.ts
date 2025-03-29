import {
	MediaRecorder,
	createMediaStream,
} from "@devcomfort/web-screen-recorder";

export async function createRecorder(duration: number, fps = 60) {
	try {
		// 비디오 스트림 가져오기
		const videoStream = await createMediaStream("video", {
			video: { width: 1280, height: 720 },
			audio: true,
		});

		const recorder = new MediaRecorder(videoStream, {
			mediaType: "video",
			codec: "h264",
			container: "webm",
			fps,
		});

		recorder.start();

		setTimeout(async () => {
			await recorder.stop();
			recorder.saveFile("my-video.webm");
			recorder.stopStream();
		}, duration);
	} catch (error) {
		console.error("녹화 예제 실행 중 오류:", error);
	}
}
