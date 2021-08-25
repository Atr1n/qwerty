export default new class ErrorPage {
  constructor() {
    this.errorSelector = 'error';
    this.btnSelector = 'error__btn';
    this.errorLinkSelector = 'error__link-back';

    this.handler();
  }

  handler() {
    document.addEventListener('DOMContentLoaded', () => {
      const errorWrap = document.querySelector(`.${this.errorSelector}`);

      if (!errorWrap) return;

      const btn = errorWrap.querySelector(`.${this.btnSelector}`);

      btn.addEventListener('click', (e) => {
        if (btn.matches(`.${this.errorLinkSelector}`)) {
          e.preventDefault();
          window.history.back();
        } else {
          document.location.reload(true);
        }
      });
    });
  }
}();
