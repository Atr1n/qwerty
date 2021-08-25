import Swiper from 'swiper';
import LazyLoad from '../../../js/lazy-load';

export default new class MainSlider {
  constructor() {
    this.sliderContainerSelector = 'main-slider';
    this.paginationSelector = 'main-slider__pagination';
    this.prevBtnSelector = 'main-slider__button_prev';
    this.nextBtnSelector = 'main-slider__button_next';
    this.disableButtonSelector = 'main-slider__button_disable';
    this.nextBulletSelector = 'main-slider__bullet';
    this.nextBulletActiveSelector = 'main-slider__bullet_active';
    this.activeSlideSelector = 'main-slider__item_active';
    this.uselessPaginationSelector = 'main-slider__pagination_hidden';

    this.containerWidth = 1280;
    this.sliderWidth = 775;
    this.designCorrection = 40;

    this.handler();
  }

  handler() {
    const slider = document.querySelector(`.${this.sliderContainerSelector}`);

    if (!slider) return;

    document.addEventListener('DOMContentLoaded', () => {
      this.init();
    });
  }

  getOffset() {
    const windowWidth = document.body.clientWidth;
    return ((windowWidth - this.containerWidth) / 2) + this.designCorrection;
  }

  init() {
    const offsetStart = this.getOffset();
    const offsetEnd = this.getOffset() + this.sliderWidth / 2 + this.designCorrection / 2 + 18;
    this.MainSlider = new Swiper(`.${this.sliderContainerSelector}`, {
      slidesPerView: 'auto',
      spaceBetween: 0,
      breakpointsInverse: true,
      slideActiveClass: this.activeSlideSelector,
      watchOverflow: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      observer: true,
      pagination: {
        el: `.${this.paginationSelector}`,
        type: 'bullets',
        bulletActiveClass: this.nextBulletActiveSelector,
        bulletClass: this.nextBulletSelector,
        lockClass: this.uselessPaginationSelector,
        clickable: true,
      },
      navigation: {
        nextEl: `.${this.nextBtnSelector}`,
        prevEl: `.${this.prevBtnSelector}`,
        disabledClass: this.disableButtonSelector,
      },
      breakpoints: {
        769: {
          slidesOffsetBefore: offsetStart,
          slidesOffsetAfter: offsetEnd,
        },
      },
      on: {
        init: () => {
          LazyLoad.update();
        },
      },
    });
  }
}();
