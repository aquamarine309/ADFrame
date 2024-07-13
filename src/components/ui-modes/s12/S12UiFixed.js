import ModalProgressBar from "../../modals/ModalProgressBar.js";
import PopupModal from "../../modals/PopupModal.js";

import S12Taskbar from "./S12Taskbar.js";

export default {
  name: "S12UiFixed",
  components: {
    PopupModal,
    ModalProgressBar,
    S12Taskbar,
  },
  computed: {
    view() {
      return this.$viewModel;
    }
  },
  template: `
  <span>
    <div
      class="c-game-ui--fixed"
      data-v-s12-ui-fixed
    >
      <ModalProgressBar v-if="view.modal.progressBar" />
      <PopupModal
        v-else-if="view.modal.current"
        :modal="view.modal.current"
      />
    </div>
    <S12Taskbar />
  </span>
  `
};