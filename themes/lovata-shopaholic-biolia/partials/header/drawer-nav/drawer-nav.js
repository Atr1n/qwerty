import { ariaLabelText, subListBtnLabelText } from '../../../js/constant';
import popupHelper from '../../../js/popup-helper';

export default new class Navigationdrawer {
  constructor() {
    this.headerSelector = 'header';
    this.hiddenSelector = 'drawer-nav__wrapper_hidden';
    this.drawerNavSelector = 'drawer-nav';
    this.drawerOpenNavSelector = 'drawer-nav_open';
    this.drawerBtnSelector = 'drawer-nav__btn';
    this.drawerCloseBtnSelector = 'drawer-nav__btn_close';
    this.subNavBtnSelector = 'drawer-nav__item-btn';
    this.drawerSubListSelector = 'drawer-nav__sublist';
    this.drawerSubListOpenSelector = 'drawer-nav__sublist_open';
    this.buttonIconSelector = 'drawer-nav__item-icon';
    this.closeBtnSelector = 'drawer-nav__close';

    this.drawerWrapperSelector = 'drawer-nav__wrapper';

    this.handler();
  }

  handler() {
    const btn = document.querySelector(`.${this.drawerBtnSelector}`);
    const modal = document.querySelector(`.${this.drawerNavSelector}`);
    popupHelper.escPressHandler(btn, modal);

    $(document).on('click', `.${this.drawerBtnSelector}`, ({ currentTarget }) => {
      this.drawerController(currentTarget);
    });

    $(document).on('click', `.${this.subNavBtnSelector}`, ({ currentTarget }) => {
      this.drawerAccordion(currentTarget);
    });

    $(document).on('click', `.${this.closeBtnSelector}`, () => {
      $(`.${this.drawerBtnSelector}`).trigger('click');
    });
  }

  drawerAccordion(button) {
    const subList = $(button).siblings(`.${this.drawerSubListSelector}`);

    if (!subList.length) return;

    const isOpen = subList.hasClass(this.drawerSubListOpenSelector);

    this.hideAllSubList(button);

    this.toggleBtnText(button, isOpen);
    if (isOpen) {
      subList.removeClass(this.drawerSubListOpenSelector);
    } else {
      subList.addClass(this.drawerSubListOpenSelector);
    }
  }

  toggleBtnText(button, isOpen) {
    const btnTextNode = $(button).find(`.${this.buttonIconSelector}`);
    const icon = isOpen ? '+' : '-';
    const text = isOpen ? subListBtnLabelText.show : subListBtnLabelText.hide;

    btnTextNode.html(icon);
    $(button).attr('aria-label', text);
  }

  hideAllSubList() {
    const subListCollection = $(`.${this.drawerSubListSelector}`);

    if (!subListCollection.length) return;

    const buttonCollection = $(`.${this.subNavBtnSelector}`);
    this.toggleBtnText(buttonCollection, true);
    subListCollection.removeClass(this.drawerSubListOpenSelector);
  }

  drawerController(button) {
    const isOpen = $(button).hasClass(this.drawerCloseBtnSelector);
    const labelText = !isOpen
      ? ariaLabelText.drawerClose
      : ariaLabelText.drawerOpen;
    const wrapper = document.querySelector(`.${this.drawerWrapperSelector}`);

    popupHelper.overlayHandler(!isOpen, button, wrapper);
    popupHelper.setBodyScrollState(isOpen);

    $(button).toggleClass(this.drawerCloseBtnSelector).attr('aria-label', labelText);
    $(wrapper).toggleClass(this.hiddenSelector);
    $(`.${this.drawerNavSelector}`).toggleClass(this.drawerOpenNavSelector);
    popupHelper.focusTrapManager(!isOpen, `.${this.headerSelector}`);
  }
}();
