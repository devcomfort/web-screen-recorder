/**
 * 화면 공유 스트림 가져오기
 * @param audio 오디오 포함 여부
 * @returns 화면 공유 스트림 Promise
 */
export async function getDisplayMedia(audio = false): Promise<MediaStream> {
	try {
		return await navigator.mediaDevices.getDisplayMedia({
			video: true,
			audio,
		});
	} catch (error) {
		console.error("화면 공유 접근에 실패했습니다:", error);
		throw error;
	}
}
