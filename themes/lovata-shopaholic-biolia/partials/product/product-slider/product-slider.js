import Swiper from 'swiper';
import LazyLoad from '../../../js/lazy-load';

export default new class MainSlider {
  constructor() {
    this.sliderContainerSelector = 'product-slider__container';
    this.paginationSelector = 'product-slider__pagination';
    this.prevBtnSelector = 'product-slider__button_prev';
    this.nextBtnSelector = 'product-slider__button_next';
    this.disableButtonSelector = 'product-slider__button_disable';
    this.nextBulletSelector = 'product-slider__bullet';
    this.nextBulletActiveSelector = 'product-slider__bullet_active';
    this.activeSlideSelector = 'product-slider__item_active';
    this.uselessPaginationSelector = 'product-slider__pagination_hidden';

    this.handler();
  }

  handler() {
    const slider = document.querySelector(`.${this.sliderContainerSelector}`);

    if (!slider) return;

    document.addEventListener('DOMContentLoaded', () => {
      this.init();
    });
  }

  init() {
    this.ProductSlider = new Swiper(`.${this.sliderContainerSelector}`, {
      slidesPerView: 2,
      spaceBetween: 16,
      slidesPerGroup: 2,
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
      },
      navigation: {
        nextEl: `.${this.nextBtnSelector}`,
        prevEl: `.${this.prevBtnSelector}`,
        disabledClass: this.disableButtonSelector,
      },
      breakpoints: {
        769: {
          slidesPerView: 4,
          slidesPerGroup: 1,
          spaceBetween: 50,
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
