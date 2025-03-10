import HeaderPrestigeGroup from "../HeaderPrestigeGroup.js";
import NewsTicker from "../NewsTicker.js";

import BackgroundAnimations from "../../BackgroundAnimations.js";
import GameUiComponentFixed from "../../GameUiComponentFixed.js";

import GameSpeedDisplay from "../../GameSpeedDisplay.js";

import { S12Windows } from "./windows.js";


export default {
  name: "S12Ui",
  components: {
    NewsTicker,
    HeaderPrestigeGroup,
    GameSpeedDisplay,

    GameUiComponentFixed,
    BackgroundAnimations,
  },
  data() {
    return {
      tabName: "",
      S12Windows,
    };
  },
  computed: {
    news() {
      return this.$viewModel.news;
    },
    topPadding() {
      return this.$viewModel.news ? "" : "padding-top: 3.9rem";
    },
    isOldUi() {
      return !this.$viewModel.newUI;
    },
  },
  methods: {
    update() {
      this.tabName = Tabs.current[this.$viewModel.subtab].name;
    },
  },
  template: `
  <div
    id="page"
    class="c-s12-window__outer"
    :class="S12Windows.isMinimised ? 'c-s12-window__outer--minimised' : ''"
    data-v-s12-ui
  >
    <link
      rel="stylesheet"
      type="text/css"
      :href="isOldUi ? './public/stylesheets/old-ui.css' : './public/stylesheets/new-ui-styles.css'"
    >
    <span
      class="c-s12-close-button"
      @click="S12Windows.isMinimised = true"
      data-v-s12-ui
    />
    <span
      class="c-modal__title"
      data-v-s12-ui
    >
      {{ tabName }}
    </span>
    <div
      :key="newGameKey"
      class="game-container c-s12-window__inner"
      :class="isOldUi ? 'c-old-ui l-old-ui' : ''"
      :style="topPadding"
      data-v-s12-ui
    >
      <GameUiComponentFixed />
      <BackgroundAnimations />
      <div
        class="c-s12-window__content-container"
        data-v-s12-ui
      >
        <NewsTicker
          v-if="news"
        />
        <div
          class="tab-container"
        >
          <HeaderPrestigeGroup />
          <div
            class="information-header"
            data-v-s12-ui
          >
            <GameSpeedDisplay />
          </div>
          <slot />
        </div>
      </div>
    </div>
  </div>
  `
};