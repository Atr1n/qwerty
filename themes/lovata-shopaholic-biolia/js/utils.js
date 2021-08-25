export default new class Utils {
  constructor() {
    this.textForCutSelector = '_js-cutted';
    this.handler();

    this.textLength = 60;
  }

  handler() {
    document.addEventListener('DOMContentLoaded', () => {
      this.init();
    });
  }

  init() {
    const textCollection = document.querySelectorAll(`.${this.textForCutSelector}`);

    if (!textCollection.length) return;

    [...textCollection].forEach(el => this.cutText(el));
  }

  cutText(el) {
    const text = el.textContent;

    if (text.length < this.textLength) return;

    const newText = text.slice(0, this.textLength).concat('...');

    el.setAttribute('title', text);

    /* eslint no-param-reassign: ["error", { "props": false }] */

    el.textContent = newText;
  }
}();
