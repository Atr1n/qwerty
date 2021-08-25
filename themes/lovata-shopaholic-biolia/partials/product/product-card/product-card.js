import ShopaholicCartAdd from '@lovata/shopaholic-cart/shopaholic-cart-add';

export default new class ProductCard {
  constructor() {
    this.sProductAddButton = '_shopaholic-cart-add';
    this.sCartInfoAjax = 'cart-info-ajax';
    this.wrapperSelector = '_shopaholic-product-wrapper';
    this.tooltipSelector = 'product-add__tooltip';
    this.tooltipVisibleSelector = 'tooltip_visible';
    this.preLoaderClass = 'product-card__preloader';

    this.obShopaholicCartAdd = new ShopaholicCartAdd();

    this.initAddCart();
  }

  initAddCart() {
    this.obShopaholicCartAdd.setAjaxRequestCallback((obRequestData, obButton) => {
      const wrapper = obButton.closest(`.${this.wrapperSelector}`);
      const tooltip = wrapper.querySelector(`.${this.tooltipSelector}`);
      if (tooltip) {
        clearTimeout(this.timer);
        tooltip.classList.remove(this.tooltipVisibleSelector);
      }
      /* eslint-disable  no-param-reassign */
      obRequestData.update = { 'product/cart/cart-mini/cart-info/cart-info': `.${this.sCartInfoAjax}` };
      if ($(obButton).hasClass(this.sProductAddButton)) {
        const offerID = $(obButton).data('offer-id');
        obRequestData.loading = `.${this.preLoaderClass}-${offerID}`;
      }
      obRequestData.complete = ({ responseJSON }) => {
        this.obShopaholicCartAdd.completeCallback(responseJSON, obButton);
        if (tooltip) {
          tooltip.classList.add(this.tooltipVisibleSelector);
          this.timer = setTimeout(() => {
            tooltip.classList.remove(this.tooltipVisibleSelector);
          }, 2000);
        }
      };
      /* eslint-enable */
      return obRequestData;
    }).init();
  }
}();
