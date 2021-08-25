import ShopaholicCartUpdate from '@lovata/shopaholic-cart/shopaholic-cart-update';
import ShopaholicCartRemove from '@lovata/shopaholic-cart/shopaholic-cart-remove';
import ShopaholicCartRestore from '@lovata/shopaholic-cart/shopaholic-cart-restore';

export default new class cartProduct {
  constructor() {
    this.obShopaholicCartUpdate = new ShopaholicCartUpdate();
    this.obShopaholicCartRemove = new ShopaholicCartRemove();
    this.obShopaholicCartRestore = new ShopaholicCartRestore();

    this.sPriceByQuantity = 'price-by-quantity';
    this.sOldPriceByQuantity = 'old-price-by-quantity';
    this.sCartInfoAjax = 'cart-info-ajax';
    this.positionNodeSelector = '_shopaholic-product-wrapper';
    this.decreaseBtnSelector = 'cart-product__change-btn_decrease';
    this.increaseBtnSelector = 'cart-product__change-btn_increase';
    this.inputSelector = 'cart-product__quantity-input';

    this.cardSelector = 'cart-product';
    this.restoreHiddenNodeSelector = '_visually-hidden';
    this.restoreNodeSelector = 'js-item-restore';
    this.cardHiddeSelector = 'cart-product_hidden';
    this.removeBtnSelector = 'cart-product__remove';
    this.restoreBtnSelector = 'js-restore-btn';

    this.sShippingTypeWrapper = '_cart_delivery_wrapper';
    this.sShippingTypePartial = 'product/cart/cart-delivery/cart-delivery';

    this.isCartPage = document.body.getAttribute('data-page-id') === 'checkout';

    this.init();
  }

  init() {
    this.initUpdateButton();
    this.initRemoveButton();
    this.initRestoreButton();

    this.increaseHandler();
    this.decreaseHandler();
  }

  initUpdateButton() {
    if (this.isCartPage) {
      this.obShopaholicCartUpdate.setAjaxRequestCallback((obRequestData) => {
        /* eslint-disable  no-param-reassign */
        obRequestData.update = {};
        obRequestData.update[this.sShippingTypePartial] = `.${this.sShippingTypeWrapper}`;
        /* eslint-enable */

        return obRequestData;
      });
    }
    this.obShopaholicCartUpdate.init();
  }

  initRemoveButton() {
    this.obShopaholicCartRemove.setAjaxRequestCallback((obRequestData, obButton) => {
      /* eslint-disable  no-param-reassign */
      obRequestData.update = {
        'product/cart/cart-mini/cart-info/cart-info': `.${this.sCartInfoAjax}`,
      };
      obRequestData.complete = ({ responseJSON }) => {
        const obCard = $(obButton).parents(`.${this.positionNodeSelector}`);
        this.showRestoreSection(obCard);
        this.obShopaholicCartRemove.completeCallback(responseJSON, obButton);
      };
      /* eslint-enable */

      return obRequestData;
    }).init();
  }

  initRestoreButton() {
    this.obShopaholicCartRestore.setAjaxRequestCallback((obRequestData, obButton) => {
      /* eslint-disable  no-param-reassign */
      obRequestData.update = { 'product/cart/cart-mini/cart-info/cart-info': `.${this.sCartInfoAjax}` };

      obRequestData.complete = ({ responseJSON }) => {
        const obCard = $(obButton).parents(`.${this.positionNodeSelector}`);
        this.hideRestoreSection(obCard);
        this.obShopaholicCartRemove.completeCallback(responseJSON, obButton);
      };
      /* eslint-enable */

      return obRequestData;
    }).init();
  }

  increaseHandler() {
    $(document).on('click', `.${this.increaseBtnSelector}`, ({ target }) => {
      const input = $(target).siblings(`.${this.inputSelector}`);
      const iValue = Number(input.val());
      const maxValue = Number(input.attr('max'));
      const iNewValue = iValue + 1;
      const fPrice = Number(input.attr('data-price'));
      const fOldPrice = Number(input.attr('data-old-price'));
      const obWrapper = $(target).closest(`.${this.positionNodeSelector}`);
      const decreaseButton = document.querySelector(`.${this.decreaseBtnSelector}`);
      if (decreaseButton.disabled) {
        decreaseButton.disabled = false;
      }

      if (iValue < maxValue) {
        input.val(iNewValue);
        if (fPrice) {
          obWrapper.find(`.${this.sPriceByQuantity}`).html((fPrice * iNewValue).toFixed(2));
        }
        if (fOldPrice) {
          obWrapper.find(`.${this.sOldPriceByQuantity}`).html((fOldPrice * iNewValue).toFixed(2));
        }
      }
      if (iNewValue >= maxValue) {
        /* eslint-disable  no-param-reassign */
        target.disabled = true;
        /* eslint-enable */
      }
    });
  }

  decreaseHandler() {
    $(document).on('click', `.${this.decreaseBtnSelector}`, ({ target }) => {
      const input = $(target).siblings(`.${this.inputSelector}`);
      const iValue = Number(input.val());
      const iNewValue = iValue - 1;
      const fPrice = Number(input.attr('data-price'));
      const fOldPrice = Number(input.attr('data-old-price'));
      const obWrapper = $(target).closest(`.${this.positionNodeSelector}`);
      const increaseButton = document.querySelector(`.${this.increaseBtnSelector}`);
      if (increaseButton.disabled) {
        increaseButton.disabled = false;
      }

      if (iValue > 1) {
        input.val(iNewValue);
        if (fPrice) {
          obWrapper.find(`.${this.sPriceByQuantity}`).html((fPrice * iNewValue).toFixed(2));
        }
        if (fOldPrice) {
          obWrapper.find(`.${this.sOldPriceByQuantity}`).html((fOldPrice * iNewValue).toFixed(2));
        }
      }
      if (iNewValue === 1) {
        /* eslint-disable  no-param-reassign */
        target.disabled = true;
        /* eslint-enable */
      }
    });
  }

  showRestoreSection(obCard) {
    const obCardPosition = $(obCard);
    obCardPosition.find(`.${this.restoreNodeSelector}`).show();
    obCardPosition.find(`.${this.cardSelector}`).hide();
  }

  hideRestoreSection(obCard) {
    const obCardPosition = $(obCard);
    obCardPosition.find(`.${this.restoreNodeSelector}`).hide();
    obCardPosition.find(`.${this.cardSelector}`).show();
  }
}();
