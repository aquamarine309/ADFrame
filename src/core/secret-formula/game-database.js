import { achievements } from "./achievements/index.js";
import { awayProgressTypes } from "./away-progress-types.js";
import { changelog } from "./changelog.js";
import { confirmationTypes } from "./confirmation-types.js";
import { credits } from "./credits.js";
import { h2p } from "./h2p.js";
import { news } from "./news.js";
import { sidebarResources } from "./sidebar-resources.js";
import { tabNotifications } from "./tab-notifications.js";
import { tabs } from "./tabs.js";

export const GameDatabase = {
  achievements,
  awayProgressTypes,
  changelog,
  confirmationTypes,
  credits,
  h2p,
  news,
  sidebarResources,
  tabNotifications,
  tabs
};

window.GameDatabase = GameDatabase;

window.mapGameData = function mapGameData(gameData, mapFn) {
  const result = [];
  for (const data of gameData) {
    result[data.id] = mapFn(data);
  }
  return result;
};

window.mapGameDataToObject = function mapGameDataToObject(gameData, mapFun) {
  const array = Object.entries(gameData);
  const out = {};
  for (let idx = 0; idx < array.length; idx++) {
    out[array[idx][0]] = mapFun(array[idx][1]);
  }
  return {
    all: Object.values(out),
    ...out
  };
};
