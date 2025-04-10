import { z } from "zod";

/**
 * 브라우저에 존재하는 미디어 레코더 옵션 스키마
 *
 * @note 브라우저에 존재하는 미디어 레코더 옵션 스키마임.
 *       따라서 이 타입을 사용하는 것은 브라우저 호환성을 위해 필요함.
 *
 * @note 비트레이트 설정(audioBitsPerSecond, videoBitsPerSecond, bitsPerSecond)은 계층 구조로 작동합니다:
 *       - audioBitsPerSecond와 videoBitsPerSecond: 각 스트림에 독립적으로 적용
 *       - bitsPerSecond: 전체 미디어 스트림의 총 대역폭 제한 역할 (최대 상한선)
 *       - 개별 설정이 없는 경우 bitsPerSecond가 해당 스트림의 기본값으로 사용됨
 *
 * @example
 * // 미디어 레코더 옵션 스키마 가져오기
 * const mediaRecorderOptions = MediaRecorderOptions_;
 * // 예: { audioBitsPerSecond: 128000, bitsPerSecond: 128000, mimeType: "video/mp4", videoBitsPerSecond: 128000, fps: 30 }
 */
export const MediaRecorderOptions_ = z
	.object({
		audioBitsPerSecond: z
			.enum(["64000", "96000", "128000", "192000", "256000", "320000"])
			.describe(
				"오디오 비트 속도 (bps). 낮은 값(64000)은 음성에 적합하고, 높은 값(320000)은 고품질 음악에 적합함. " +
					"이 값은 오디오 스트림에만 적용되며, 미설정 시 bitsPerSecond 값이 오디오 스트림의 기본값으로 사용됨. " +
					"단, bitsPerSecond가 설정된 경우 모든 스트림의 총합은 이 값을 초과할 수 없음",
			),
		videoBitsPerSecond: z
			.enum([
				"1000000", // 1Mbps - 낮은 화질
				"2500000", // 2.5Mbps - 중간 화질
				"5000000", // 5Mbps - 고화질
				"8000000", // 8Mbps - HD
				"12000000", // 12Mbps - Full HD
				"20000000", // 20Mbps - 4K
			])
			.describe(
				"비디오 비트 속도 (bps). 낮은 값(1Mbps)은 저화질/모바일에 적합하고, 높은 값(20Mbps)은 4K 고화질 녹화에 적합함. " +
					"이 값은 비디오 스트림에만 적용되며, 미설정 시 bitsPerSecond 값이 비디오 스트림의 기본값으로 사용됨. " +
					"단, bitsPerSecond가 설정된 경우 모든 스트림의 총합은 이 값을 초과할 수 없음",
			),
		bitsPerSecond: z
			.enum([
				"1500000", // 1.5Mbps - 기본 화질
				"3000000", // 3Mbps - 중간 화질
				"6000000", // 6Mbps - 고화질
				"10000000", // 10Mbps - Full HD
				"15000000", // 15Mbps - 4K
			])
			.describe(
				"전체 미디어의 총 비트 속도 제한값(상한선). audioBitsPerSecond와 videoBitsPerSecond를 모두 설정한 경우에도 " +
					"이 값이 설정되면 두 스트림의 합계가 이 값을 초과하지 않도록 제한됨. " +
					"즉, 이 값은 오디오와 비디오를 포함한 전체 데이터 대역폭의 최대치를 설정함. " +
					"audioBitsPerSecond 또는 videoBitsPerSecond가 설정되지 않은 경우 각각의 기본값으로도 사용됨",
			),
		mimeType: z.string().describe("MIME 타입 (예시: video/mp4)"),
	})
	.partial();
