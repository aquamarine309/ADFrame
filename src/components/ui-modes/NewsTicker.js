import { openExternalLink } from "../../utility/open-external-link.js";

export default {
  name: "NewsTicker",
  data() {
    return {
      enableAnimation: false,
    };
  },
  computed: {
    lineClass() {
      return this.enableAnimation ? undefined : "c-disable-ticker-animation";
    }
  },
  beforeCreate() {
    this.recentTickers = [];
  },
  mounted() {
    document.addEventListener("visibilitychange", () => this.restart.bind(this));
    this.restart();
  },
  beforeDestroy() {
    this.clearTimeouts();
  },
  methods: {
    update() {
      if (this.currentNews?.dynamic) {
        this.$refs.line.innerHTML = this.currentNews.text;
      }
      this.enableAnimation = player.options.news.includeAnimated;
    },
    restart() {
      if (!GameUI.initialized) {
        setTimeout(this.restart.bind(this), 100);
        return;
      }
      this.clearTimeouts();
      if (document.hidden) {
        return;
      }
      this.prepareNextMessage();
    },
    clearTimeouts() {
      clearTimeout(this.delayTimeout);
      clearTimeout(this.scrollTimeout);
    },
    prepareNextMessage() {
      const line = this.$refs.line;
      if (line === undefined) return;

      // Prevent tickers from repeating if they aren't unlocked or were seen recently
      const canShow = news => (news.unlocked ?? true) && !this.recentTickers.includes(news.id);

      if (nextNewsMessageId && GameDatabase.news.find(message => message.id === nextNewsMessageId)) {
        this.currentNews = GameDatabase.news.find(message => message.id === nextNewsMessageId);
        nextNewsMessageId = undefined;
      } else {
        const isAI = Math.random() < player.options.news.AIChance;
        this.currentNews = GameDatabase.news
          .filter(message => message.id.includes("ai") === isAI)
          .filter(message => canShow(message))
          .randomElement();
      }
      
      if (!this.currentNews) return;

      this.recentTickers.push(this.currentNews.id);
      while (this.recentTickers.length > player.options.news.repeatBuffer) this.recentTickers.shift();

      if (this.currentNews.reset) {
        this.currentNews.reset();
      }

      let text = this.currentNews.text;
      line.innerHTML = text;

      line.style["transition-duration"] = "0ms";
      line.style.transform = "translateX(0)";

      const DELAY = 1000;
      this.delayTimeout = setTimeout(this.scrollMessage.bind(this), DELAY);
    },
    scrollMessage() {
      const line = this.$refs.line;

      // SCROLL_SPEED is in pixels per second
      const SCROLL_SPEED = player.options.news.speed * 100;
      const scrollDuration = (this.$refs.ticker.clientWidth + line.clientWidth) / SCROLL_SPEED;

      line.style["transition-duration"] = `${scrollDuration}s`;
      line.style.transform = "translateX(-100%)";

      NewsHandler.addSeenNews(this.currentNews.id);

      this.scrollTimeout = setTimeout(this.prepareNextMessage.bind(this), scrollDuration * 1000);
    },
    onLineClick() {
      if (this.currentNews.onClick === undefined) {
        return;
      }
      const updatedText = this.currentNews.onClick();
      if (updatedText !== undefined) {
        this.$refs.line.innerHTML = updatedText;
      }
    }
  },
  template: `
  <div
    ref="ticker"
    class="c-news-ticker"
  >
    <span
      ref="line"
      class="c-news-line c-news-ticker__line"
      :class="lineClass"
      @click="onLineClick"
    />
  </div>
  `
};