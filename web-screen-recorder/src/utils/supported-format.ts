import { isSupportedMimeType } from "validators";

import * as F from 'fp-ts/function'
import * as A from 'fp-ts/Array'
import * as O from 'fp-ts/Option'

import type { MediaType, MIMEType } from "schemas";
import { SYSTEM_SUPPORTED_FORMATS } from "vars";

/**
 * 품질 모드 타입
 */
export type QualityMode = 'high' | 'default';

export class SupportedFormat {
    constructor() {
    }

    /**
     * 미디어 유형에 따라 지원되는 형식 배열을 반환합니다.
     * 
     * @param mediaType - 미디어 유형
     * @returns 지원되는 형식 배열 (MIME 타입 포함됨)
     * 
     * @example
     * // 비디오 형식 가져오기
     * const videoFormats = getSupportedFormatsByMediaType('video');
     * // 예: [
     * //   { mediaType: 'video', mimeType: 'video/webm', codec: 'vp9', container: 'webm' },
     * //   { mediaType: 'video', mimeType: 'video/mp4', codec: 'h264', container: 'mp4' }
     * // ]
     * 
     * @example
     * // 오디오 형식 가져오기  
     * const audioFormats = getSupportedFormatsByMediaType('audio');
     * // 예: [
     * //   { mediaType: 'audio', mimeType: 'audio/webm', codec: 'opus', container: 'webm' },
     * //   { mediaType: 'audio', mimeType: 'audio/mp3', codec: 'mp3', container: 'mp3' }
     * // ]
     * 
     * @example
     * // 지원되는 형식이 없는 경우
     * const unsupportedFormats = getSupportedFormatsByMediaType('video'); 
     * // 예: []
     * // 브라우저가 해당 미디어 유형의 어떤 형식도 지원하지 않는 경우 빈 배열 반환
     */
    static getSupportedFormatsByMediaType(mediaType: MediaType) {
        return F.pipe(
            SYSTEM_SUPPORTED_FORMATS,
            A.filter(format => format.mediaType === mediaType),
            A.filter(format => isSupportedMimeType(format.mimeType)),
        )
    }

    /**
     * 주어진 미디어 유형, 코덱, 컨테이너에 대한 지원되는 형식을 찾습니다.
     * @param mediaType 미디어 타입
     * @param codec 코덱
     * @param container 컨테이너
     * @returns 지원되는 형식 또는 지원되는 형식이 없을 경우 `null`
     * 
     * @example
     * // 비디오 형식 가져오기
     * const videoFormats = getSupportedFormats('video', 'vp9', 'webm');
     * // 예: [
     * //   { mediaType: 'video', mimeType: 'video/webm', codec: 'vp9', container: 'webm' },
     * //   { mediaType: 'video', mimeType: 'video/mp4', codec: 'h264', container: 'mp4' }
     * // ]
     */
    static findSupportedFormats(mediaType: MediaType, codec?: string, container?: string) {
        return F.pipe(
            this.getSupportedFormatsByMediaType(mediaType),
            A.filter(format => format.mediaType === mediaType &&
                (codec ? format.codec === codec : true) &&
                (container ? format.container === container : true))
        )
    }

    /**
     * 고품질 모드에서 사용할 MIME 타입을 반환합니다.
     * 비디오의 경우 vp9 코덱과 webm 컨테이너를 우선적으로 선택합니다.
     * 오디오의 경우 opus 코덱과 webm 컨테이너를 우선적으로 선택합니다.
     * 
     * @param mediaType 미디어 타입 (비디오 또는 오디오)
     * @returns 고품질 모드에서 사용할 MIME 타입 또는 지원되는 형식이 없을 경우 `null`
     */
    static getHighQualityMimeType(mediaType: MediaType): MIMEType | null {
        // 고품질 비디오 설정
        if (mediaType === 'video') {
            // 우선 vp9 + webm 조합을 시도
            const vp9Format = this.findSupportedFormats(mediaType, 'vp9', 'webm');
            if (vp9Format.length > 0) return vp9Format[0];

            // vp9가 없으면 h264 + mp4 조합을 시도
            const h264Format = this.findSupportedFormats(mediaType, 'h264', 'mp4');
            if (h264Format.length > 0) return h264Format[0];
        }

        // 고품질 오디오 설정
        if (mediaType === 'audio') {
            // 우선 opus + webm 조합을 시도
            const opusFormat = this.findSupportedFormats(mediaType, 'opus', 'webm');
            if (opusFormat.length > 0) return opusFormat[0];

            // opus가 없으면 aac + mp4 조합을 시도
            const aacFormat = this.findSupportedFormats(mediaType, 'aac', 'mp4');
            if (aacFormat.length > 0) return aacFormat[0];
        }

        // 위 조건에 맞는 형식이 없으면 기본 형식을 반환
        return F.pipe(
            this.getSupportedFormatsByMediaType(mediaType),
            A.head,
            O.match(
                () => null,
                (format) => format
            )
        );
    }

    /**
     * 기본 모드(최적화된 품질)에서 사용할 MIME 타입을 반환합니다.
     * 비디오의 경우 h264 코덱과 mp4 컨테이너를 우선적으로 선택합니다 (호환성이 좋음).
     * 오디오의 경우 aac 코덱과 mp4 컨테이너를 우선적으로 선택합니다 (호환성이 좋음).
     * 
     * @param mediaType 미디어 타입 (비디오 또는 오디오)
     * @returns 기본 모드에서 사용할 MIME 타입 또는 지원되는 형식이 없을 경우 `null`
     */
    static getDefaultQualityMimeType(mediaType: MediaType): MIMEType | null {
        // 기본 비디오 설정 (호환성 우선)
        if (mediaType === 'video') {
            // 우선 h264 + mp4 조합을 시도 (가장 널리 지원됨)
            const h264Format = this.findSupportedFormats(mediaType, 'h264', 'mp4');
            if (h264Format.length > 0) return h264Format[0];

            // h264가 없으면 vp8 + webm 조합을 시도
            const vp8Format = this.findSupportedFormats(mediaType, 'vp8', 'webm');
            if (vp8Format.length > 0) return vp8Format[0];
        }

        // 기본 오디오 설정 (호환성 우선)
        if (mediaType === 'audio') {
            // 우선 aac + mp4 조합을 시도 (가장 널리 지원됨)
            const aacFormat = this.findSupportedFormats(mediaType, 'aac', 'mp4');
            if (aacFormat.length > 0) return aacFormat[0];

            // aac가 없으면 mp3 조합을 시도
            const mp3Format = this.findSupportedFormats(mediaType, 'mp3', 'mpeg');
            if (mp3Format.length > 0) return mp3Format[0];
        }

        // 위 조건에 맞는 형식이 없으면 기본 형식을 반환
        return F.pipe(
            this.getSupportedFormatsByMediaType(mediaType),
            A.head,
            O.match(
                () => null,
                (format) => format
            )
        );
    }

    /**
     * 품질 모드에 따라 적절한 MIME 타입을 반환합니다.
     * 
     * @param mediaType 미디어 타입 (비디오 또는 오디오)
     * @param qualityMode 품질 모드 ('high' 또는 'default')
     * @returns 선택된 품질 모드에 적합한 MIME 타입 또는 지원되는 형식이 없을 경우 `null`
     */
    static getMimeTypeByQualityMode(mediaType: MediaType, qualityMode: QualityMode = 'default'): MIMEType | null {
        if (qualityMode === 'high') {
            return this.getHighQualityMimeType(mediaType);
        } else {
            return this.getDefaultQualityMimeType(mediaType);
        }
    }
}
