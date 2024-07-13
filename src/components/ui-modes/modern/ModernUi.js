import HeaderPrestigeGroup from "../HeaderPrestigeGroup.js";
import NewsTicker from "../NewsTicker.js";

import GameSpeedDisplay from "../../GameSpeedDisplay.js";


export default {
  name: "ModernUi",
  components: {
    NewsTicker,
    HeaderPrestigeGroup,
    GameSpeedDisplay,
  },
  computed: {
    news() {
      return this.$viewModel.news;
    },
    topMargin() {
      return this.$viewModel.news ? "" : "margin-top: 3.9rem";
    }
  },
  template: `
  <div id="page">
    <link
      rel="stylesheet"
      type="text/css"
      href="./public/stylesheets/new-ui-styles.css"
    >
    <div
      class="game-container"
      :style="topMargin"
    >
      <NewsTicker
        v-if="news"
      />
      <div
        class="tab-container"
      >
        <HeaderPrestigeGroup />
        <div class="information-header">
          <GameSpeedDisplay />
        </div>
        <slot />
      </div>
    </div>
  </div>
  `
};