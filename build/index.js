/**
 * 웹 페이지 녹화 기능 접근을 위한 라이브러리
 *
 * @author devcomfort
 * @link https://yong0810.tistory.com/44 웹 화면 녹화 코드
 * @link https://developer.mozilla.org/ko/docs/Web/Media/Formats/codecs_parameter 웹 codecs 정보
 *
 * @todo 결과물 해상도 지정 기능 추가하기
 * @todo 결과물 포멧 지정 기능 추가하기
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports=function ({ height = 480, width = 640, fileName = "test", }) {
    const download = (url, filename) => {
        const _element = document.createElement("a");
        _element.href = url;
        filename && (_element.download = filename);
        _element.click();
    };
    let blobs;
    let blob;
    let rec;
    let stream;
    let voiceStream;
    let desktopStream;
    const mergeAudioStreams = () => {
        const context = new AudioContext();
        const destination = context.createMediaStreamDestination();
        let hasDesktop = false;
        let hasVoice = false;
        if (desktopStream && desktopStream.getAudioTracks().length > 0) {
            const source = context.createMediaStreamSource(desktopStream);
            const gain = context.createGain();
            gain.gain.value = 0.7;
            source.connect(gain).connect(destination);
            hasDesktop = true;
        }
        if (voiceStream && voiceStream.getAudioTracks().length > 0) {
            const source = context.createMediaStreamSource(voiceStream);
            const gain = context.createGain();
            gain.gain.value = 0.7;
            source.connect(gain).connect(destination);
            hasVoice = true;
        }
        return hasDesktop || hasVoice ? destination.stream.getAudioTracks() : [];
    };
    /** 영상 녹화 시작 함수 */
    const startRecord = () => __awaiter(this, void 0, void 0, function* () {
        /** 비디오 스트림 생성 */
        desktopStream = yield navigator.mediaDevices.getDisplayMedia({
            video: { width, height },
            audio: true,
        });
        /** 오디오 스트림 생성 */
        voiceStream = yield navigator.mediaDevices.getUserMedia({
            video: false,
            audio: true,
        });
        const tracks = [...desktopStream.getVideoTracks(), ...mergeAudioStreams()];
        stream = new MediaStream(tracks);
        blobs = [];
        /** MediaRecorder 객체 생성 */
        rec = new MediaRecorder(stream, {
            mimeType: `video/webm; codecs="vp9, opus"`,
        });
        rec.ondataavailable = (e) => blobs.push(e.data);
        rec.onstop = () => __awaiter(this, void 0, void 0, function* () {
            blob = new Blob(blobs, {
                type: `video/webm`,
            });
            let url = window.URL.createObjectURL(blob);
            download(url, fileName);
        });
        rec.start();
    });
    /** 영상 녹화 종료 함수 */
    const stopRecord = () => {
        rec.stop();
        desktopStream === null || desktopStream === void 0 ? void 0 : desktopStream.getTracks().forEach((s) => s.stop());
        voiceStream === null || voiceStream === void 0 ? void 0 : voiceStream.getTracks().forEach((s) => s.stop());
        desktopStream = undefined;
        voiceStream = undefined;
    };
    return {
        startRecord,
        stopRecord,
    };
}
