export default {
  name: "HowToPlay",
  data() {
    return {
      isModern: false,
    };
  },
  computed: {
    h2pClassObject() {
      return {
        "o-tab-btn l-help-me": true,
      };
    },
    topMargin() {
      return {
        "margin-top": this.isModern ? "4.5rem" : "1rem",
      };
    }
  },
  methods: {
    update() {
      this.isModern = player.options.newUI;
    },
    showH2P() {
      Modal.h2p.show();
    },
    showInfo() {
      Modal.information.show();
    }
  },
  template: `
  <div>
    <div
      :class="h2pClassObject"
      :style="topMargin"
      @click="showH2P"
      data-v-how-to-play
    >
      ?
    </div>
    <div
      class="o-tab-btn l-information l-help-me"
      @click="showInfo"
      data-v-how-to-play
    >
      i
    </div>
  </div>
  `
};