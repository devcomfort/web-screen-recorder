/**
 * 브라우저에서 특정 MIME 타입이 지원되는지 확인
 * @param mimeType 확인할 MIME 타입
 * @returns 지원 여부
 */
export function isMimeTypeSupported(mimeType: string): boolean {
	return MediaRecorder.isTypeSupported(mimeType);
}
