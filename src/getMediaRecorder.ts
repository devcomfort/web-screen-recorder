/**
 *
 * @param mediaStream
 * @param mimeType 영상 mime 타입
 * @returns
 */
export function getMediaRecorder(
	mediaStream: MediaStream,
	options?: MediaRecorderOptions,
	// mimeType = "video/mp4",
	mimeType = "video/webm;codecs=h264",
) {
	// declare chunk variable.
	let recordedChunks: Blob[] = [];
	let _fps = 60;

	// create instance.
	const mediaRecorder = new MediaRecorder(mediaStream, {
		...options,
		mimeType,
	});

	mediaRecorder.ondataavailable = (event) => {
		if (event.data.size > 0) {
			recordedChunks = [...recordedChunks, event.data];
		}
	};

	function wrapper() {
		// create methods.
		function startRecord(fps: number) {
			_fps = fps;
			mediaRecorder.start(1000 / fps);
			return wrapper();
		}

		function stopRecord() {
			mediaRecorder.stop();
			return wrapper();
		}

		function flushChunks() {
			recordedChunks = [];
			return wrapper();
		}

		function assembleChunks(): Blob {
			return new Blob(recordedChunks, {
				type: mimeType,
			});
		}

		function getFps() {
			return _fps;
		}

		return {
			getMediaRecorder: () => mediaRecorder,
			startRecord,
			stopRecord,
			flushChunks,
			assembleChunks,
			getFps,
		};
	}

	return wrapper();
}
