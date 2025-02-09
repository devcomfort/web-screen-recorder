/**
 * 사용자가 선택한 `MediaStream` 객체들을 반환합니다.
 * @param displayMediaOptions
 * @returns
 */
export async function getMediaStreams(
	displayMediaOptions?: DisplayMediaStreamOptions,
) {
	return navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
}
