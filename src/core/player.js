import { DC } from "./constants.js";
import { deepmergeAll } from "../utility/deepmerge.js";

// This is actually reassigned when importing saves
// eslint-disable-next-line prefer-const
window.player = {
  // basic currency for test
  currency: DC.D0,
  achievementBits: Array.repeat(0, 17),
  secretAchievementBits: Array.repeat(0, 4),
  auto: {
    autobuyersOn: true
  },
  news: {
    // This is properly handled in NewsHandler.addSeenNews which adds properties as needed
    seen: {},
    specialTickerData: {
      uselessNewsClicks: 0,
      paperclips: 0,
      newsQueuePosition: 1000,
      eiffelTowerChapter: 0
    },
    totalSeen: 0,
  },
  lastUpdate: new Date().getTime(),
  backupTimer: 0,
  break: false,
  secretUnlocks: {
    themes: new Set(),
    cancerAchievements: false,
  },
  records: {
    gameCreatedTime: Date.now(),
    totalTimePlayed: 0,
    realTimePlayed: 0,
    realTimeDoomed: 0,
    fullGameCompletions: 0,
    previousRunRealTime: 0
  },
  version: 0,
  tabNotifications: new Set(),
  triggeredTabNotificationBits: 0,
  tutorialState: 0,
  tutorialActive: true,
  options: {
    news: {
      enabled: true,
      repeatBuffer: 40,
      AIChance: 0,
      speed: 1,
      includeAnimated: true,
    },
    notation: "Mixed scientific",
    notationDigits: {
      comma: 5,
      notation: 9
    },
    sidebarResourceID: 0,
    retryChallenge: false,
    showAllChallenges: false,
    syncSaveIntervals: true,
    hotkeys: true,
    themeClassic: "Normal",
    themeModern: "Normal",
    updateRate: 33,
    newUI: true,
    offlineProgress: true,
    loadBackupWithoutOffline: false,
    automaticTabSwitching: true,
    respecIntoProtected: false,
    hibernationCatchup: true,
    offlineTicks: 1e5,
    statTabResources: 0,
    multiplierTab: {
      currTab: 0,
      showAltGroup: false,
      replacePowers: false,
    },
    autosaveInterval: 30000,
    showTimeSinceSave: true,
    saveFileName: "",
    exportedFileCount: 0,
    hideCompletedAchievementRows: false,
    headerTextColored: false,
    showHintText: {
      showPercentage: true,
      achievements: true,
      achievementUnlockStates: true,
    },
    animations: {
      background: true,
      blobSnowflakes: 16
    },
    confirmations: {},
    awayProgress: {},
    hiddenTabBits: 0,
    hiddenSubtabBits: Array.repeat(0, 1),
    lastOpenTab: 0,
    lastOpenSubtab: Array.repeat(0, 1)
  }
};

export const Player = {
  defaultStart: deepmergeAll([{}, player])
};

export function guardFromNaNValues(obj) {
  function isObject(ob) {
    return ob !== null && typeof ob === "object" && !(ob instanceof Decimal);
  }

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    let value = obj[key];
    if (isObject(value)) {
      guardFromNaNValues(value);
      continue;
    }

    if (typeof value === "number") {
      Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: () => value,
        set: function guardedSetter(newValue) {
          if (newValue === null || newValue === undefined) {
            throw new Error("null/undefined player property assignment");
          }
          if (typeof newValue !== "number") {
            throw new Error("Non-Number assignment to Number player property");
          }
          if (!isFinite(newValue)) {
            throw new Error("NaN player property assignment");
          }
          value = newValue;
        }
      });
    }

    if (value instanceof Decimal) {
      Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: () => value,
        set: function guardedSetter(newValue) {
          if (newValue === null || newValue === undefined) {
            throw new Error("null/undefined player property assignment");
          }
          if (!(newValue instanceof Decimal)) {
            throw new Error("Non-Decimal assignment to Decimal player property");
          }
          if (!isFinite(newValue.mantissa) || !isFinite(newValue.exponent)) {
            throw new Error("NaN player property assignment");
          }
          value = newValue;
        }
      });
    }
  }
}
