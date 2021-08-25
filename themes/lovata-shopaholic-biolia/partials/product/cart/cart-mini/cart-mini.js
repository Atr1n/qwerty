import popupHelper from '../../../../js/popup-helper';

export default new class cartMini {
  constructor() {
    this.panelSelector = 'cart-info__panel';
    this.panelOpenSelector = 'cart-info__panel_visible';
    this.drawerBtnSelector = 'js-cart-mini';
    this.drawerParentSelector = 'header';
    this.drawerOpenBtnSelector = 'cart-info';
    this.drawerCloseSelector = 'cart-mini-panel__close';
    this.cartMiniAjaxSelector = 'cart-mini-ajax';

    this.handler();
  }

  handler() {
    $(document).on('click', `.${this.drawerBtnSelector}`, ({ target }) => {
      $.request('onAjax', { update: { 'product/cart/cart-mini/cart-mini-panel/cart-mini-panel-ajax': `.${this.cartMiniAjaxSelector}` } });
      const panel = $(target).parents(`.${this.drawerParentSelector}`).find(`.${this.panelSelector}`);
      const focusTarget = $(target).hasClass(this.drawerOpenBtnSelector)
        ? document.querySelector(`.${this.drawerCloseSelector}`)
        : document.querySelector(`.${this.drawerOpenBtnSelector}`);
      const isOpen = panel.hasClass(this.panelOpenSelector);

      panel.toggleClass(this.panelOpenSelector);

      popupHelper.overlayHandler(!isOpen, focusTarget, panel[0]);
      popupHelper.setBodyScrollState(isOpen);
      popupHelper.focusTrapManager(!isOpen, panel[0]);
    });
  }
}();
