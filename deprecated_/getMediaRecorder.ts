/**
 * 미디어 레코더 사용 예시
 */
export async function recordExample() {
	try {
		// 비디오 스트림 가져오기
		const videoStream = await getMediaStream("video", {
			video: { width: 1280, height: 720 },
			audio: true,
		});

		// 레코더 생성
		const recorder = getMediaRecorder(videoStream, {
			mediaType: "video",
			codec: "h264",
			container: "webm",
		});

		// 녹화 시작
		recorder.startRecord(30);

		// 5초 후 녹화 중지 및 저장
		setTimeout(async () => {
			await recorder.stopRecord();
			recorder.saveFile("my-video.webm");
			recorder.stopStream();
		}, 5000);
	} catch (error) {
		console.error("녹화 예제 실행 중 오류:", error);
	}
}
