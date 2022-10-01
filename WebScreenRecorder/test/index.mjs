import WebScreenRecorder from "../index.mjs";

/**
 * JSON 해석본
 * @type {import("../index.mjs").T_ARGS}
 */
const config = await (await fetch("./config.json")).json();

console.log(config);

globalThis.ScreenRecorder = WebScreenRecorder(config);
