import ShopaholicSearch from '@lovata/shopaholic-search';
import popupHelper from '../../../js/popup-helper';

export default new class Search {
  constructor() {
    this.panelSelector = 'search-panel';
    this.panelOpenSelector = 'search-panel_visible';
    this.drawerBtnSelector = 'js-search-popup';
    this.drawerParentSelector = 'header__search';
    this.searchResultWrapper = 'search-panel__result';
    this.searchInputSelector = 'search-panel__input-field';
    this.drawerCloseSelector = 'search-panel__close';
    this.preLoaderSelector = '.search-panel__preloader';

    this.init();
    this.handler();
  }

  init() {
    this.obSearchHelper = new ShopaholicSearch();
    this.obSearchHelper.setAjaxRequestCallback((obRequest) => {
      /* eslint-disable no-param-reassign */
      obRequest.update = { 'header/search/search-panel/search-panel-result': `.${this.searchResultWrapper}` };
      obRequest.loading = this.preLoaderSelector;
      /* eslint-enable */

      return obRequest;
    });
    this.obSearchHelper.init();
  }

  handler() {
    const modal = document.querySelector(`.${this.panelSelector}`);
    const searchInput = document.querySelector(`.${this.searchInputSelector}`);

    $(document).on('click', `.${this.drawerBtnSelector}`, ({ currentTarget }) => {
      const btn = document.querySelector(`.${this.drawerCloseSelector}`);
      const panel = $(currentTarget).parents(`.${this.drawerParentSelector}`).children(`.${this.panelSelector}`);
      const isOpen = panel.hasClass(this.panelOpenSelector);

      popupHelper.setBodyScrollState(isOpen);
      popupHelper.overlayHandler(!isOpen, btn, modal);

      panel.toggleClass(this.panelOpenSelector);

      setTimeout(() => {
        popupHelper.focusTrapManager(!isOpen, modal);
      }, 100);
      // this.clearSearchInput(isOpen); // TODO: uncomment
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
      }
    });
  }

  clearSearchInput(isOpen) {
    if (!isOpen) return;
    $(`.${this.searchInputSelector}`).val('');
    const searchResultWrapper = $(`.${this.searchResultWrapper}`);
    const childrenNode = searchResultWrapper.children();
    if (!childrenNode.length) return;
    childrenNode.remove();
  }
}();
