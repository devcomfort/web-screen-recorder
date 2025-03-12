import type { MediaType } from "schemas";

/**
 * 사용자 미디어 장치에 접근하여 미디어 스트림 가져오기
 * @param mediaType 미디어 타입 (video 또는 audio)
 * @param constraints 미디어 제약 조건
 * @returns 미디어 스트림 Promise
 */
export async function createMediaStream(
	mediaType: MediaType = "video",
	constraints?: MediaStreamConstraints,
): Promise<MediaStream> {
	// 비디오 또는 오디오에 따른 기본 제약 조건 설정
	const defaultConstraints: MediaStreamConstraints =
		mediaType === "video" ? { video: true, audio: true } : { audio: true };

	try {
		return await navigator.mediaDevices.getUserMedia(
			constraints || defaultConstraints,
		);
	} catch (error) {
		console.error("미디어 장치 접근에 실패했습니다:", error);
		throw error;
	}
}
