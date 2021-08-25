import ShopaholicProductList from '@lovata/shopaholic-product-list/shopaholic-product-list';
import ShopaholicPagination from '@lovata/shopaholic-product-list/shopaholic-pagination';
import ShopaholicFilterPanel from '@lovata/shopaholic-filter-panel/shopaholic-filter-panel';
import ShopaholicFilterPrice from '@lovata/shopaholic-filter-panel/shopaholic-filter-price';
import ShopaholicSorting from '@lovata/shopaholic-product-list/shopaholic-sorting';
import LazyLoad from '../../../../js/lazy-load';
import Select from '../../../form/select/select';


export default new class FilterPanel {
  constructor() {
    this.sCatalogWrapper = '.catalog__wrapper';
    this.sFilterAjax = '.filter';
    this.preLoaderSelector = '.catalog__preloader';
    this.filterPreLoaderElector = '.filter__preloader';
    this.brandWrapperSelector = '._shopaholic-brand-filter-wrapper';
    this.saleFilterWrapper = '._shopaholic-sale-filter-wrapper';
    this.filterBtnWrapperSelector = '.filter-bar__filter-btn-wrapper';
    this.filterPanelWrapper = '.filter__wrapper';
    this.filterBarSelector = '.filter-bar';
    this.resetBtnSelector = '.filter__reset';
    this.resetBtnVisibleSelector = 'filter__reset_visible';

    this.handlers();
  }

  handlers() {
    this.initFilterHandlers();

    this.obListHelper = this.updateAllAjax();

    this.instanceArray.forEach((el) => {
      el.obProductListHelper = this.obListHelper; // eslint-disable-line no-param-reassign
    });
  }

  updateAllAjax() {
    const obListHelper = new ShopaholicProductList();

    obListHelper.setAjaxRequestCallback((obRequestData) => {
      /* eslint-disable  no-param-reassign */
      obRequestData.update = {
        'product/catalog/filter/filter-ajax': this.sFilterAjax,
        'product/catalog/catalog-list/catalog-list': this.sCatalogWrapper,
        'product/catalog/filter-bar/filter-bar': this.filterBarSelector,
      };

      obRequestData.complete = () => {
        const resetButton = document.querySelector(this.resetBtnSelector);
        LazyLoad.update();
        Select.checkSelect();
        resetButton.classList.add(this.resetBtnVisibleSelector);

        if (!this.checkWindowPosition()) {
          const bar = $(this.filterBarSelector);
          if (!bar.length) return;
          const distance = bar.offset().top;
          $('body, html').animate({ scrollTop: distance }, 350);
        }
      };
      /* eslint-enable */

      return obRequestData;
    });

    return obListHelper;
  }

  checkWindowPosition() {
    const docViewTop = $(window).scrollTop();
    const docViewBottom = docViewTop + $(window).height();
    const bar = $(this.filterBarSelector);

    if (!bar.length) return true;

    const elemTop = $(this.filterBarSelector).offset().top;
    const elemBottom = elemTop + $(this.filterBarSelector).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }

  initFilterHandlers() {
    const obListHelper = this.updateAllAjax();

    const obFilterPanel = new ShopaholicFilterPanel();
    obFilterPanel.init();

    const obBrandFilterPanel = new ShopaholicFilterPanel();
    obBrandFilterPanel
      .setWrapperSelector(this.brandWrapperSelector)
      .setFieldName('brand')
      .init();

    const obSaleFilterPanel = new ShopaholicFilterPanel();
    obSaleFilterPanel
      .setWrapperSelector(this.saleFilterWrapper)
      .setFieldName('sale')
      .init();

    const obPaginationHelper = new ShopaholicPagination(obListHelper);
    obPaginationHelper.init();

    const obSortingHelper = new ShopaholicSorting(obListHelper);
    obSortingHelper.init();
    const obFilterPrice = new ShopaholicFilterPrice();
    obFilterPrice
      .setEventType('input')
      .init();

    this.instanceArray = [
      obFilterPanel,
      obBrandFilterPanel,
      obSaleFilterPanel,
      obFilterPrice,
    ];
  }

  updateFilterPanelAjax() {
    const obListHelper = new ShopaholicProductList();

    obListHelper.setAjaxRequestCallback((obRequestData) => {
      /* eslint-disable  no-param-reassign */
      obRequestData.update = {
        'product/catalog/filter/filter-ajax': this.sFilterAjax,
        'product/catalog/catalog-list/catalog-list': this.sCatalogWrapper,
        'product/catalog/filter-bar/filter-bar': this.filterBarSelector,
      };
      obRequestData.loading = this.filterPreLoaderElector;

      obRequestData.complete = () => {
        LazyLoad.update();
        Select.checkSelect();
      };
      /* eslint-enable */

      return obRequestData;
    });

    return obListHelper;
  }
}();
