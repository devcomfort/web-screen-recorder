// @ts-check

/**
 * 웹 페이지 녹화 기능 접근을 위한 라이브러리
 *
 * @author devcomfort
 * @link https://yong0810.tistory.com/44
 *
 * @todo 결과물 해상도 지정 기능 추가하기
 * @todo 결과물 포멧 지정 기능 추가하기
 */

export default function () {
  const _elements = {
    download: document.createElement("a"),
  };

  const _data = {
    /** @type {Blob[]} */
    blobs: [],
    /**
     * 데이터
     * @type {Blob | undefined}
     */
    blob: undefined,
    /**
     * 스트림을 기반으로 통합하는 MediaRecorder 객체
     * @type {MediaRecorder | undefined}
     */
    rec: undefined,
    /**
     * 통합
     * @type {*}
     */
    stream: undefined,
    /**
     * 오디오 스트림
     * @type {*}
     */
    voiceStream: undefined,
    /**
     * 비디오 스트림
     * @type {MediaStream | undefined}
     */
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

  const startRecord = async () => {
    /** 비디오 스트림 생성 */
    _data.desktopStream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        width: 640,
        height: 480,
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
      mimeType: "video/webm; codecs=vp9,opus",
    });
    _data.rec.ondataavailable = (e) => _data.blobs.push(e.data);
    _data.rec.onstop = async () => {
      _data.blob = new Blob(_data.blobs, {
        type: "video/webm",
      });

      let url = window.URL.createObjectURL(_data.blob);

      _elements.download.href = url;
      _elements.download.download = "test.webm";
      _elements.download.click();
    };

    _data.rec.start();
  };

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
