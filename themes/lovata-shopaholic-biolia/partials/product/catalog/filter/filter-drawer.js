import UrlGeneration from '@lovata/url-generation';
import Helper from '@lovata/popup-helper';
import PopupHelper from '../../../../js/popup-helper';
import FilterPanel from '../catalog-list/catalog-list';

export default new class filterDrawer {
  constructor() {
    this.panelSelector = 'filter';
    this.panelOpenSelector = 'filter_open';
    this.drawerBtnSelector = 'js-filter-bar';
    this.drawerParentSelector = 'catalog';
    this.drawerOpenBtnSelector = 'filter__btn-close';
    this.drawerCloseSelector = 'filter__btn-close';
    this.resetBtnSelector = 'filter__reset';
    this.resetBtnVisibSelector = 'filter__reset_visible';
    this.submitSelector = 'filter__submit';

    this.mqString = '(min-width: 769px)';

    this.handler();
  }

  handler() {
    const btn = document.querySelector(`.${this.drawerCloseSelector}`);
    const modal = document.querySelector(`.${this.panelSelector}`);

    PopupHelper.escPressHandler(btn, modal);

    $(document).on('click', `.${this.resetBtnSelector}`, () => {
      const resetButton = document.querySelector(`.${this.resetBtnSelector}`);
      UrlGeneration.clear();
      FilterPanel.updateFilterPanelAjax().send();
      resetButton.classList.remove(this.resetBtnVisibleSelector);
    });

    $(document).on('click', `.${this.submitSelector}`, (e) => {
      e.preventDefault();
      const overlay = Helper.getOverlay();

      if (!overlay) return;

      overlay.click();
    });

    $(document).on('click', `.${this.drawerBtnSelector}`, ({ target }) => {
      const panel = $(target).parents(`.${this.drawerParentSelector}`).find(`.${this.panelSelector}`);
      const focusTarget = $(target).hasClass(this.drawerOpenBtnSelector)
        ? document.querySelector(`.${this.drawerCloseSelector}`)
        : document.querySelector(`.${this.drawerOpenBtnSelector}`);
      const condition = panel.hasClass(this.panelOpenSelector);

      PopupHelper.setBodyScrollState(condition);
      PopupHelper.overlayController(!condition);

      panel.toggleClass(this.panelOpenSelector);

      PopupHelper.overlayClickHandler(focusTarget);
    });

    $(window).on('resize', () => {
      const vpCondition = window.matchMedia(this.mqString).matches;
      const modalCondition = $(`.${this.panelSelector}`).hasClass(this.panelOpenSelector);

      if (vpCondition && modalCondition) {
        btn.click();
      }
    });
  }
}();
