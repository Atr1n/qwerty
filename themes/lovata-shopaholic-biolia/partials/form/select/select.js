import Choices from 'choices.js';

export default new class Select {
  constructor() {
    this.selectSelector = 'select';
    this.selectNoBorderSelector = 'select_no-border';

    this.isInit = false;
    this.desktopBreakpoint = 769;

    this.handler();
  }

  handler() {
    document.addEventListener('DOMContentLoaded', () => {
      this.checkSelect();
    });

    window.addEventListener('resize', () => {
      if (this.isDesktop() && !this.isInit) {
        this.checkSelect();
      }
    });
  }

  isDesktop() {
    return (window.matchMedia(`(min-width: ${this.desktopBreakpoint}px)`).matches);
  }

  checkSelect() {
    const select = $(`.${this.selectSelector}`);

    if (!select.length) return;

    [...select].forEach(el => this.init(el));
  }

  init(el) {
    if (!this.isDesktop()) return;

    const border = $(el).hasClass(this.selectNoBorderSelector) ? '_no-border' : '';

    this.select = new Choices(el, {
      searchEnabled: false,
      shouldSort: false,
      itemSelectText: '',
      classNames: {
        containerOuter: `choices select ${border}`,
        containerInner: `choices__inner select__inner ${border}`,
        listDropdown: 'choices__list--dropdown select__list_dropdown',
        list: 'choices__list custom-scroll_select select__list',
        item: 'choices__item select__item',
      },
      callbackOnInit: this.isInit = true,
    });
  }
}();
