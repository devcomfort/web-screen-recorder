import { isString } from "fp-ts/string";

/**
 * 현재 브라우저에서 특정 MIME 타입의 지원 여부를 확인합니다.
 *
 * @description
 * - MIME 타입 문자열에 대해 브라우저의 지원 여부를 검증합니다.
 * - 유효하지 않은 입력(문자열이 아닌 값)에 대해 `false`를 반환합니다.
 * - `MediaRecorder.isTypeSupported()` 메서드를 사용하여 최종 지원 여부를 확인합니다.
 *
 * @param mimeType - 지원 여부를 확인할 MIME 타입
 * @returns 해당 MIME 타입의 브라우저 지원 여부 (`true` 또는 `false`)
 *
 * @example
 * // 유효한 MIME 타입 지원 확인
 * const isMp4Supported = isSupportedMimeType('video/mp4');
 *
 * @example
 * // 잘못된 입력 처리
 * const isInvalidSupported = isSupportedMimeType(false); // false 반환
 */

export function isSupportedMimeType(mimeType?: string): boolean {
	return (
		// 입력이 문자열인지 확인, undefined도 허용
		isString(mimeType) &&
		// 문자열이 아니거나 빈 문자열인 경우 false 반환
		mimeType.length >= 1 &&
		// MediaRecorder.isTypeSupported() 메서드를 사용하여 최종 지원 여부를 확인
		MediaRecorder.isTypeSupported(mimeType)
	);
}
