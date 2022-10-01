// @ts-check

import extHandler, { MEDIA_EXTENSION_T } from "./parser.mjs";

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

/**
 * 함수 내부 데이터 타입 지정
 *
 * @typedef {object} RECORDER_CACHE_T
 * @property {Blob[]} blobs
 * @property {Blob | undefined} blob
 * @property {MediaRecorder | undefined} rec
 * @property {*} stream
 * @property {*} voiceStream
 * @property {MediaStream | undefined} desktopStream
 */

/**
 * @typedef {object} T_ARGS
 * @property {number} height
 * @property {number} width
 * @property {MEDIA_EXTENSION_T} ext
 *
 * @param {T_ARGS} args
 *
 */
export default function (args) {
  /** 기본값 지정 */
  args.height ??= 480;
  args.width ??= 640;

  const { height, width } = args;

  let { ext } = args;

  const finalType = extHandler(ext).toFullText();

  const _elements = {
    download: document.createElement("a"),
  };

  /** @type {RECORDER_CACHE_T} */
  const _data = {
    blobs: [],
    /** 데이터 */
    blob: undefined,
    /** 스트림을 기반으로 통합하는 MediaRecorder 객체 */
    rec: undefined,
    /** 통합 */
    stream: undefined,
    /** 오디오 스트림 */
    voiceStream: undefined,
    /** 비디오 스트림 */
    desktopStream: undefined,
  };

  const mergeAudioStreams = (desktopStream, voiceStream) => {
    const context = new AudioContext();
    const destination = context.createMediaStreamDestination();
    /** @type {boolean} */
    let hasDesktop = false;
    /** @type {boolean} */
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
  const startRecord = async () => {
    /** 비디오 스트림 생성 */
    _data.desktopStream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        width: width,
        height: height,
      },
      audio: true,
    });

    /** 오디오 스트림 생성 */
    _data.voiceStream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    });

    const tracks = [
      ..._data.desktopStream.getVideoTracks(),
      ...mergeAudioStreams(_data.desktopStream, _data.voiceStream),
    ];

    _data.stream = new MediaStream(tracks);
    _data.blobs = [];
    /** MediaRecorder 객체 생성 */
    _data.rec = new MediaRecorder(_data.stream, {
      mimeType: finalType,
    });
    _data.rec.ondataavailable = (e) => _data.blobs.push(e.data);
    _data.rec.onstop = async () => {
      _data.blob = new Blob(_data.blobs, {
        type: extHandler(ext).toMimeType(),
      });

      let url = window.URL.createObjectURL(_data.blob);

      _elements.download.href = url;
      _elements.download.download = "test.webm";
      _elements.download.click();
    };

    _data.rec.start();
  };

  /** 영상 녹화 종료 함수 */
  const stopRecord = () => {
    _data.rec?.stop();

    _data.desktopStream?.getTracks().forEach((s) => s.stop());
    _data.voiceStream?.getTracks().forEach((s) => s.stop());

    _data.desktopStream = undefined;
    _data.voiceStream = undefined;
  };

  return {
    startRecord,
    stopRecord,
  };
}
