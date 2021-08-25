import createFocusTrap from 'focus-trap';

export default new class popupHelper {
  constructor() {
    this.noScrollSelector = '_noscroll';
    this.overlaySelector = 'overlay';

    this.bodyPaddingProp = '--body-padding';

    this.openModalStateAttr = 'data-modal-open';
    this.pageOffset = '';
  }

  saveScrollPosition() {
    this.pageOffset = window.pageYOffset;
  }

  setScrollPosition() {
    window.scrollTo(null, this.pageOffset);
  }

  setBodyScrollState(boolean) {
    const body = document.querySelector('body');

    if (boolean) {
      body.classList.remove(this.noScrollSelector);

      this.setScrollPosition();
    } else {
      this.saveScrollPosition();
      this.setBodyPadding();
      body.classList.add(this.noScrollSelector);
    }
  }

  focusTrapManager(needTrap, modal) {
    if (needTrap) {
      this.focusTrap = createFocusTrap(modal, {
        clickOutsideDeactivates: true,
      });
      this.focusTrap.activate();
    } else {
      this.focusTrap.deactivate();
    }
  }

  static getScrollBarWidth() {
    return window.innerWidth - document.body.clientWidth;
  }

  setBodyPadding() {
    const scrollWidth = this.constructor.getScrollBarWidth();
    document.body.style.setProperty(this.bodyPaddingProp, `${scrollWidth}px`);
  }

  checkOverlay() {
    const overlay = this.getOverlay();
    return !!overlay;
  }

  overlayController(boolean) {
    if (boolean) {
      this.createOverlay();
    } else {
      this.removeOverlay();
    }
  }

  overlayHandler(isInit, closeBtnNode, modalNode) {
    this.overlayController(isInit);

    if (isInit) {
      modalNode.setAttribute(this.openModalStateAttr, true);
      this.overlayClickHandler(closeBtnNode);
      this.escPressHandler(closeBtnNode, modalNode);
    }
  }

  createOverlay() {
    if (this.checkOverlay()) return;

    const div = document.createElement('div');
    const body = document.querySelector('body');
    div.classList.add(this.overlaySelector);

    body.append(div);
  }

  removeOverlay() {
    if (!this.checkOverlay()) return;

    $(`.${this.overlaySelector}`).remove();
  }

  getOverlay() {
    return document.querySelector(`.${this.overlaySelector}`);
  }

  overlayClickHandler(triggerTarget) {
    const overlay = this.getOverlay();

    if (!overlay) return;

    overlay.addEventListener('click', () => {
      triggerTarget.click();
    });
  }

  escPressHandler(triggerTarget, modalNode) {
    if (!triggerTarget || !modalNode) return;

    document.addEventListener('keydown', ({ which }) => {
      if (!this.checkOverlay()) return;

      if (which === 27 && modalNode.hasAttribute(this.openModalStateAttr)) {
        const overlay = this.getOverlay();
        overlay.click();
      }
    });
  }
}();
