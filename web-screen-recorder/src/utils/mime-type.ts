import * as F from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as E from 'fp-ts/Either'
import * as A from 'fp-ts/Array'

import type { MediaType, MIMEType } from "schemas";

import { SupportedFormat, type QualityMode } from "./supported-format";

export class MimeType {
    constructor() {
    }

    /**
     * 미디어 유형에 따라 기본 지원 MIME 타입을 반환합니다.
     * 
     * @param mediaType 미디어 유형
     * @returns 기본 지원 MIME 타입 또는 지원되는 형식이 없을 경우 `null`
     */
    static getDefaultMimeType(mediaType: MediaType) {
        return F.pipe(
            SupportedFormat.findSupportedFormats(mediaType),
            A.head,
            O.match(
                () => null,
                (format): MIMEType => format
            )
        )
    }

    /**
     * 품질 모드에 따른 MIME 타입을 반환합니다.
     * 
     * @param mediaType 미디어 유형
     * @param qualityMode 품질 모드 ('high': 고품질, 'default': 최적화된 품질)
     * @returns 선택된 품질 모드에 적합한 MIME 타입 또는 지원되는 형식이 없을 경우 `null`
     */
    static getMimeTypeByQuality(mediaType: MediaType, qualityMode: QualityMode = 'default') {
        return SupportedFormat.getMimeTypeByQualityMode(mediaType, qualityMode);
    }

    /**
     * 
     * @param mediaType 
     * @param codec 
     * @param container 
     * @returns 
     */
    static getMimeType(mediaType: MediaType, codec: string, container: string): E.Either<string, MIMEType> {
        // 입력된 미디어 유형, 코덱, 컨테이너에 맞는 설정을 찾습니다.
        const format = SupportedFormat.findSupportedFormats(mediaType, codec, container);

        // 반환할 값이 없는 경우 오류를 반환합니다.
        if (format.length === 0) return E.left("지원되는 형식이 없습니다.");

        // 반환할 값이 있는 경우 첫 번째 값을 반환합니다.
        return E.right(format[0]);
    }
}

export default MimeType;