import HowToPlay from "./HowToPlay.js";
import ModalProgressBar from "./modals/ModalProgressBar.js";
import ModernSidebar from "./ui-modes/modern/ModernSidebar.js";
import PopupModal from "./modals/PopupModal.js";
import SaveTimer from "./SaveTimer.js";

export default {
  name: "GameUiComponentFixed",
  components: {
    HowToPlay,
    ModernSidebar,
    SaveTimer,
    PopupModal,
    ModalProgressBar
  },
  computed: {
    view() {
      return this.$viewModel;
    },
    hideIfMatoFullscreen() {
      return {
        visibility: "visible"
      };
    }
  },
  template: `
  <div
    id="ui-fixed"
    class="c-game-ui--fixed"
    data-v-game-ui-component-fixed
  >
    <div
      id="notification-container"
      class="l-notification-container"
    />
    <HowToPlay :style="hideIfMatoFullscreen" />
    <ModernSidebar
      v-if="view.newUI && view.theme !== 'S12'"
      :style="hideIfMatoFullscreen"
    />
    <SaveTimer :style="hideIfMatoFullscreen" />
    <template v-if="view.theme !== 'S12'">
      <ModalProgressBar v-if="view.modal.progressBar" />
      <PopupModal
        v-else-if="view.modal.current"
        :modal="view.modal.current"
      />
      <ModalProgressBar v-if="view.modal.progressBar" />
    </template>
  </div>
  `
};