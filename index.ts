import Recorder from "./module";

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

interface Args {
  height: number;
  width: number;
  /** 파일 이름 */
  fileName: string;
  /** 파일 확장자 */
  ext: string;
}

export default function ({
  height = 480,
  width = 640,
  fileName = "test",
}: Args) {
  const download = (url: string, filename?: string) => {
    const _element = document.createElement("a");
    _element.href = url;
    filename && (_element.download = filename);
    _element.click();
  };

  let blobs: Blob[];
  let blob: Blob;
  let rec: MediaRecorder;
  let stream: MediaStream | undefined;
  let voiceStream: MediaStream | undefined;
  let desktopStream: MediaStream | undefined;

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
  const startRecord = async () => {
    /** 비디오 스트림 생성 */
    desktopStream = await navigator.mediaDevices.getDisplayMedia({
      video: { width, height },
      audio: true,
    });

    /** 오디오 스트림 생성 */
    voiceStream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    });

    const tracks = [...desktopStream.getVideoTracks(), ...mergeAudioStreams()];

    stream = new MediaStream(tracks);
    blobs = [];
    /** MediaRecorder 객체 생성 */
    rec = new MediaRecorder(stream, {
      mimeType: `video/webm; codecs="vp9, vorbis"`,
    });
    rec.ondataavailable = (e) => blobs.push(e.data);
    rec.onstop = async () => {
      blob = new Blob(blobs, {
        type: `video/webm`,
      });

      let url = window.URL.createObjectURL(blob);

      download(url, `${fileName}.webm`);
    };

    rec.start();
  };

  /** 영상 녹화 종료 함수 */
  const stopRecord = () => {
    rec.stop();
    desktopStream?.getTracks().forEach((s) => s.stop());
    voiceStream?.getTracks().forEach((s) => s.stop());
    desktopStream = undefined;
    voiceStream = undefined;
  };

  return {
    startRecord,
    stopRecord,
  };
}
