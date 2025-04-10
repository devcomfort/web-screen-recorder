import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';

/**
 * 화면 공유 스트림 가져오기
 * 
 * @param audio 오디오 포함 여부
 * @returns 화면 공유 스트림 Either Promise
 * 
 * @example
 * // 화면 공유 스트림 가져오기
 * const displayMedia = await getDisplayMedia(true);
 */
export const getDisplayMedia = (audio = false): TE.TaskEither<Error, MediaStream> =>
	pipe(
		TE.tryCatch(
			// navigator.mediaDevices.getDisplayMedia() 메서드를 사용하여 화면 공유 스트림 가져오기
			() => navigator.mediaDevices.getDisplayMedia({
				video: true,
				audio,
			}),
			// 화면 공유 접근에 실패한 경우 에러 반환
			(error) => {
				console.error("화면 공유 접근에 실패했습니다:", error);
				return error instanceof Error ? error : new Error(String(error));
			}
		)
	); 