import ModalWrapper from "./ModalWrapper.js";

export default {
  name: "AutobuyerEditModal",
  components: {
    ModalWrapper
  },
  computed: {
    header() {
      return `Edit Autobuyers`;
    },
    message() {
      // We have to have this edge-case due to a weird happening where you could open this modal
      // during the Reality animation, which would then show an empty modal.
      return Autobuyers.hasAutobuyersForEditModal
        ? `Using this modal, you can edit various values inside your autobuyers.`
        : `You currently have no autobuyers which could be shown here.`;
    },
  },
  template: `
  <ModalWrapper>
    <template #header>
      {{ header }}
    </template>
    <div
      class="c-modal-message__text-fit"
      data-v-autobuyer-edit-modal
    >
      <span>
        {{ message }}
      </span>
    </div>
    <!--
      We only include these autobuyers as these are (probably) the ones that users will want to change
      most often.
    -->
  </ModalWrapper>
  `
};