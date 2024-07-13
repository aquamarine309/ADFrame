export default {
  name: "HeaderCenterContainer",
  data() {
    return {
      isModern: false,
      currency: new Decimal(0)
    };
  },
  methods: {
    update() {
      this.isModern = player.options.newUI;
      this.currency.copyFrom(Currency.currency);
    },
  },
  template: `
  <div
    class="c-prestige-button-container"
  >
    <span>You have <span class="c-game-header__currency">{{ format(currency, 2, 1) }}</span> [currency].</span>
  </div>
  `
};