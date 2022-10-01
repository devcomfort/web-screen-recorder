// @ts-check

/**
 * 확장자 열거형 지정
 * @enum {string}
 */
const MEDIA_EXTENSION_T = {
  mp4: "mp4",
  webm: "video/webm",
};

/**
 * MIME 타입 열거형 지정
 * @enum {string}
 */
const MIME_T = {
  mp4: "video/mp4",
  webm: "video/webm",
};

/**
 * 코덱 정보 열거형 지정, (코덱 조합은 여러가지가 될 수 있음. 단, 이 코드에서는 특정 형식으로 지정함)
 * @link https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder#properties MediaRecorder 객체 - Mozilla 문서
 * @enum {string}
 */
const CODEC_T = {
  mp4: "vp9,opus",
  webm: "vp9,opus",
};

/**
 * export default 함수 인자에 대한 자료형 정의
 *
 * @typedef {object} PARSER_FUNCTIONS_ARGS
 * @property { (ext: MEDIA_EXTENSION_T) => string } toFullText
 * @property { (ext: MEDIA_EXTENSION_T) => string } toMimeType
 * @property { (ext: MEDIA_EXTENSION_T) => string } toCodexText
 */

/** @param {MEDIA_EXTENSION_T} ext */
export default function (ext) {
  /** @type {PARSER_FUNCTIONS_ARGS} */
  return {
    toFullText: () => {
      return ext in MIME_T && ext in CODEC_T
        ? [ext in MIME_T && MIME_T[ext], ext in CODEC_T && CODEC_T[ext]].join(
            ";"
          )
        : undefined;
    },
    toMimeType: () => (ext in MIME_T ? MIME_T[ext] : undefined),
    toCodexText: () => (ext in CODEC_T ? CODEC_T[ext] : undefined),
  };
}

export { MEDIA_EXTENSION_T };
