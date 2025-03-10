import { sha512_256 } from "../../modules/sha512.js";

import { DEV } from "../env.js";

import FullScreenAnimationHandler from "./full-screen-animation-handler.js";

export class GameOptions {

  static toggleNews() {
    player.options.news.enabled = !player.options.news.enabled;
    ui.view.news = player.options.news.enabled;
    GameStorage.save();
  }

  static toggleUI() {
    player.options.newUI = !player.options.newUI;
    ui.view.newUI = player.options.newUI;
    // This is needed because .s-base--dark is on newUI/normal but not on oldUI/normal
    // So the classes on body need to be updated
    Themes.find(Theme.currentName()).set();
    GameStorage.save();
  }

  static refreshUpdateRate() {
    GameIntervals.gameLoop.restart();
  }

  static refreshAutosaveInterval() {
    GameIntervals.save.restart();
  }
}

const secretImports = [
  "80b7fdc794f5dfc944da6a445a3f21a2d0f7c974d044f2ea25713037e96af9e3",
  "857876556a230da15fe1bb6f410ca8dbc9274de47c1a847c2281a7103dd2c274",
  "be88e62eb68758cd7381104977c0d3d5d81e19c72a848f0d79d1963c1e39221f",
  "c784c9c0a82b5f3c13884842fa6e6a8f5aed994ef401e6476c30b1adfe439b22",
];

function secretImportIndex(data) {
  const sha = sha512_256(data.replace(/\s/gu, "").toUpperCase());
  return secretImports.indexOf(sha);
}

export function isSecretImport(data) {
  return secretImportIndex(data) !== -1;
}

export function tryImportSecret(data) {
  const index = secretImportIndex(data);

  switch (index) {
    default:
      return false;
  }
}
