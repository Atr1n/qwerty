import popupHelper from '../../../js/popup-helper';

export default new class wishList {
  constructor() {
    this.panelSelector = 'wish-list-info__panel';
    this.panelOpenSelector = 'wish-list-info__panel_visible';
    this.drawerBtnSelector = 'js-wish-list';
    this.drawerParentSelector = 'header';
    this.drawerOpenBtnSelector = 'wish-list-info';
    this.drawerCloseSelector = 'wish-list-panel__close';
    this.sWishListAjaxClass = 'wish-list-ajax';
    this.handler();
  }

  handler() {
    $(document).on('click', `.${this.drawerBtnSelector}`, ({ target }) => {
      $.request('onAjax', { update: { 'product/wish-list/wish-list-panel/wish-list-panel-ajax': `.${this.sWishListAjaxClass}` } });
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
