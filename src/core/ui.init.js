export const state = {
  view: {
    modal: {
      queue: [],
      current: undefined,
      progressBar: undefined,
    },
    shiftDown: false,
    theme: "Normal",
    scrollWindow: 0,
    currentContextMenu: null,
    tab: "options",
    subtab: "saving",
    newUI: false,
    news: false,
    initialized: false,
    tutorialState: 0,
    tutorialActive: true,
    h2pForcedTab: undefined,
  },
  notationName: "",
  formatPreBreak: false,
  lastClickTime: 0,
};
