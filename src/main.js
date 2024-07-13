import "./env.js";
import "../modules/drag-drop-touch.js";
import "./shims.js";
import "./merge-globals.js";
import { browserCheck, init } from "./game.js";

if (browserCheck()) init();