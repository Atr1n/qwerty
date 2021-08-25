import ShopaholicAddWishList from '@lovata/shopaholic-wish-list/shopaholic-add-wish-list';
import ShopaholicRemoveWishList from '@lovata/shopaholic-wish-list/shopaholic-remove-wish-list';

export default new class WishListAdd {
  constructor() {
    this.wishListButtonClass = 'wish-list-button';
    this.wishListButtonFavoriteClass = 'wish-list-button_favorite';
    this.sCountWishListAjaxClass = 'count-wish-list-ajax';
    this.sWishProductCardClass = 'wish-product-card';
    this.sWishListPanelItemNoneHiddenClass = 'wish-list-panel__item_none_hidden';
    this.tooltipSelector = 'product-wish-list__tooltip';
    this.tooltipVisibleSelector = 'tooltip_visible';
    this.wrapperSelector = '_shopaholic-product-wrapper';
    this.obAddHelper = new ShopaholicAddWishList();
    this.obRemoveHelper = new ShopaholicRemoveWishList();

    this.initAddHandler();
    this.initRemoveHandler();
  }

  /* eslint-disable no-param-reassign */
  initAddHandler() {
    this.obAddHelper.setAjaxRequestCallback((obRequestData, obButton) => {
      this.turnOnFavoriteBtn(obButton);
      obRequestData.update = { 'product/wish-list/wish-list-info/count-wish-list': `.${this.sCountWishListAjaxClass}` };
      obRequestData.error = () => {
        this.turnOffFavoriteBtn(obButton, obRequestData);
      };
      return obRequestData;
    }).init();
  }

  initRemoveHandler() {
    this.obRemoveHelper.setAjaxRequestCallback((obRequestData, obButton) => {
      this.turnOffFavoriteBtn(obButton, obRequestData);
      obRequestData.update = { 'product/wish-list/wish-list-info/count-wish-list': `.${this.sCountWishListAjaxClass}` };
      obRequestData.error = () => {
        this.turnOnFavoriteBtn(obButton);
      };
      return obRequestData;
    }).init();
  }

  turnOnFavoriteBtn(obButton) {
    const wrapper = obButton.closest(`.${this.wrapperSelector}`);
    const tooltip = wrapper.find(`.${this.tooltipSelector}`);

    obButton.removeClass(this.obAddHelper.sDefaultButtonClass);
    obButton.addClass(this.obRemoveHelper.sDefaultButtonClass);
    obButton.addClass(this.wishListButtonFavoriteClass);

    if (tooltip) {
      tooltip.addClass(this.tooltipVisibleSelector);
      this.timer = setTimeout(() => {
        tooltip.removeClass(this.tooltipVisibleSelector);
      }, 2000);
    }
  }

  turnOffFavoriteBtn(obButton, obRequestData) {
    obButton.removeClass(this.obRemoveHelper.sDefaultButtonClass);
    const obWrapper = obButton.closest(`.${this.sWishProductCardClass}`);

    obWrapper.remove();
    obButton.addClass(this.obAddHelper.sDefaultButtonClass);

    const self = this;

    $(document).ready(() => {
      const iCountWishProductCart = $(`.${self.sWishProductCardClass}`).length;

      if (iCountWishProductCart < 1) {
        $(`.${self.sWishListPanelItemNoneHiddenClass}`).removeClass(self.sWishListPanelItemNoneHiddenClass);
      }

      const obProductCardList = $(`[data-product-id=${obRequestData.data.product_id}]`);

      if (obProductCardList) {
        obButton = obProductCardList.each((i, obProduct) => {
          $(obProduct).find(`.${self.obRemoveHelper.sDefaultButtonClass}`)
            .removeClass(self.obRemoveHelper.sDefaultButtonClass)
            .addClass(self.obAddHelper.sDefaultButtonClass);
        });
      }

      obButton.find(`.${this.wishListButtonClass}`).removeClass(this.wishListButtonFavoriteClass);
    });
  }
  /* eslint-enable */
}();
