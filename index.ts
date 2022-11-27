import Recorder from "./module";

// @ts-ignore
globalThis.Recorder = Recorder({
  height: 1080,
  width: 1080,
  fileName: "video.webm",
});
