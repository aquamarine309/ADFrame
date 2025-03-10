import { GameMechanicState } from "../game-mechanics/index.js";

class AchievementState extends GameMechanicState {
  constructor(config) {
    super(config);
    this._row = Math.floor(this.id / 10);
    this._column = this.id % 10;
    this._bitmask = 1 << (this.column - 1);
    this._inverseBitmask = ~this._bitmask;
    this.registerEvents(config.checkEvent, args => this.tryUnlock(args));
  }

  get name() {
    return this.config.name;
  }

  get row() {
    return this._row;
  }

  get column() {
    return this._column;
  }

  get isPreReality() {
    return this.row < 14;
  }

  get isPrePelle() {
    return this.row < 18;
  }

  get isUnlocked() {
    return (player.achievementBits[this.row - 1] & this._bitmask) !== 0;
  }

  get isDisabled() {
    return true;
  }

  get isEffectActive() {
    return this.isUnlocked && !this.isDisabled;
  }

  tryUnlock(args) {
    if (this.isUnlocked) return;
    if (!this.config.checkRequirement(args)) return;
    this.unlock();
  }

  lock() {
    player.achievementBits[this.row - 1] &= this._inverseBitmask;
  }

  unlock(auto) {
    if (this.isUnlocked) return;
    player.achievementBits[this.row - 1] |= this._bitmask;
    if (auto) {
      GameUI.notify.reality(`Automatically unlocked: ${this.name}`);
    } else {
      GameUI.notify.success(`Achievement: ${this.name}`);
    }
    Achievements._power.invalidate();
    EventHub.dispatch(GAME_EVENT.ACHIEVEMENT_UNLOCKED);
  }
}

/**
 * @param {number} id
 * @returns {AchievementState}
 */
export const Achievement = AchievementState.createAccessor(GameDatabase.achievements.normal);

export const Achievements = {
  /**
   * @type {AchievementState[]}
   */
  all: Achievement.index.compact(),

  /**
   * @type {AchievementState[]}
   */
  get preReality() {
    return Achievements.all.filter(ach => ach.isPreReality);
  },

  /**
   * @type {AchievementState[]}
   */
  get prePelle() {
    return Achievements.all.filter(ach => ach.isPrePelle);
  },

  get allRows() {
    const count = Achievements.all.map(a => a.row).max();
    return Achievements.rows(1, count);
  },

  get preRealityRows() {
    const count = Achievements.preReality.map(a => a.row).max();
    return Achievements.rows(1, count);
  },

  get prePelleRows() {
    const count = Achievements.prePelle.map(a => a.row).max();
    return Achievements.rows(1, count);
  },

  rows: (start, count) => Array.range(start, count).map(Achievements.row),

  row: row => Array.range(row * 10 + 1, 8).map(Achievement),

  get effectiveCount() {
    const unlockedAchievements = Achievements.all.countWhere(a => a.isUnlocked);
    return unlockedAchievements;
  },

  get period() {
    return GameCache.achievementPeriod.value;
  },

  autoAchieveUpdate(diff) {
    if (!PlayerProgress.realityUnlocked()) return;
    if (!player.reality.autoAchieve || RealityUpgrade(8).isLockingMechanics) {
      player.reality.achTimer = Math.clampMax(player.reality.achTimer + diff, this.period);
      return;
    }
    if (Achievements.preReality.every(a => a.isUnlocked)) return;

    player.reality.achTimer += diff;
    if (player.reality.achTimer < this.period) return;

    for (const achievement of Achievements.preReality.filter(a => !a.isUnlocked)) {
      achievement.unlock(true);
      player.reality.achTimer -= this.period;
      if (player.reality.achTimer < this.period) break;
    }
    player.reality.gainedAutoAchievements = true;
  },

  get timeToNextAutoAchieve() {
    if (!PlayerProgress.realityUnlocked()) return 0;
    if (GameCache.achievementPeriod.value === 0) return 0;
    if (Achievements.preReality.countWhere(a => !a.isUnlocked) === 0) return 0;
    return this.period - player.reality.achTimer;
  },

  _power: new Lazy(() => {
    const unlockedRows = Achievements.allRows
      .countWhere(row => row.every(ach => ach.isUnlocked));
    const power = Math.pow(1.25, unlockedRows) * Math.pow(1.03, Achievements.effectiveCount);
    return power;
  }),

  get power() {
    return Achievements._power.value;
  },
};