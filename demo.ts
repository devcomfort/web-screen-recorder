import { getMediaStreams } from "./src/getMediaStream";
import { getMediaRecorder } from "./src/getMediaRecorder";

getMediaStreams({
	audio: {
		autoGainControl: false,
		echoCancellation: true,
		noiseSuppression: true,
	},
	video: {
		width: { ideal: window.screen.width },
		height: { ideal: window.screen.height },
		frameRate: {
			ideal: 60,
		},
		aspectRatio: 16 / 9,
	},
})
	.then((stream) => getMediaRecorder(stream).startRecord(60))
	.then((recorder) => {
		window.setTimeout(() => {
			recorder.stopRecord();

			const blob = recorder.assembleChunks();
			console.log(blob);
			const url = URL.createObjectURL(blob);
			window.open(url);
			console.log(url);
		}, 10_000);
	});
