import LazyLoad from '../../../node_modules/vanilla-lazyload/dist/lazyload';

export default new class LazyLoadInit {
  constructor() {
    this.lazySelector = 'js-lazy-load';
    this.finishSelector = 'lazy-finish';

    this.handler();
  }

  handler() {
    document.addEventListener('DOMContentLoaded', () => {
      this.init();
    });
  }

  init() {
    const lazyElms = document.querySelector(`.${this.lazySelector}`);

    if (!lazyElms) return;

    this.initLazyLoad();
  }

  update() {
    const lazyElms = document.querySelector(`.${this.lazySelector}`);
    if (!lazyElms) return;

    this.initLazyLoad();
    this.myLazyLoad.update();
  }

  initLazyLoad() {
    if (this.myLazyLoad) return;

    this.myLazyLoad = new LazyLoad({
      elements_selector: `.${this.lazySelector}`,
      class_loaded: this.finishSelector,
      callback_loaded: (node) => {
        const { parentElement } = node;

        if (!parentElement.tagName === 'PICTURE') return;

        parentElement.classList.add(this.finishSelector);
      },
    });
  }

  loadAll() {
    const lazyElms = document.querySelector(`.${this.lazySelector}`);

    if (!lazyElms) return;

    this.myLazyLoad.loadAll();
  }
}();
