export const sidebarResources = [
  // Note: ID 0 is interpreted in the Vue component as "the largest unlocked ID" - do not use ID 0
  {
    id: 1,
    optionName: "Blob",
    isAvailable: () => Themes.available().map(t => t.name).includes("S11"),
    // This is a dummy value to prevent vue errors
    value: () => new Decimal(1),
    formatValue: () => "\uE010",
    formatClass: "o-sidebar-currency--antimatter",
  },
  {
    id: 2,
    optionName: "Test Currency",
    isAvailable: () => true,
    value: () => Currency.currency.value,
    formatValue: value => format(value, 2),
    formatClass: "o-sidebar-currency--test-currency"
  }
];
