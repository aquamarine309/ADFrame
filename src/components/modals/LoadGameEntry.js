import PrimaryButton from "../PrimaryButton.js";

export default {
  name: "LoadGameEntry",
  components: {
    PrimaryButton
  },
  props: {
    saveId: {
      type: Number,
      required: true
    }
  },
  data() {
    const save = GameStorage.saves[this.saveId];
    return {
      currency: new Decimal(save ? save.currency : 10),
      fileName: save ? save.options.saveFileName : ""
    };
  },
  computed: {
    isSelected() {
      return GameStorage.currentSlot === this.saveId;
    }
  },
  methods: {
    load() {
      GameStorage.loadSlot(this.saveId);
    },
    formatCurrency(currency) {
      return formatPostBreak(currency, 2, 1);
    },
    update() {
      if (this.isSelected) {
        this.currency.copyFrom(Currency.currency);
      }
    }
  },
  template: `
  <div class="l-modal-options__save-record">
    <h3>Save #{{ saveId + 1 }}:<span v-if="isSelected"> (selected)</span></h3>
    <span v-if="fileName">File name: {{ fileName }}</span>
    <span>Antimatter: {{ formatCurrency(currency) }}</span>
    <PrimaryButton
      class="o-primary-btn--width-medium"
      @click="load"
    >
      Load
    </PrimaryButton>
  </div>
  `
};

// TODO replace currency to your game currency