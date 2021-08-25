import Swiper from 'swiper';
import LazyLoad from '../../../js/lazy-load';

export default new class photoSlider {
  constructor() {
    this.sPhotoSlider = 'photo-slider';
    this.sliderContainerSelector = 'photo-slider__container';
    this.paginationSelector = 'photo-slider__pagination';
    this.prevBtnSelector = 'photo-slider__button_prev';
    this.nextBtnSelector = 'photo-slider__button_next';
    this.disableButtonSelector = 'photo-slider__button_disable';
    this.nextBulletSelector = 'photo-slider__bullet';
    this.nextBulletActiveSelector = 'photo-slider__bullet_active';
    this.activeSlideSelector = 'photo-slider__item_active';
    this.uselessPaginationSelector = 'photo-slider__pagination_hidden';
    this.zoomContainerSelector = 'photo-slider__zoom';

    this.handler();
  }

  handler() {
    document.addEventListener('DOMContentLoaded', () => {
      this.initSlider();
    });
  }

  initSlider() {
    if ($(document).find(`.${this.sPhotoSlider}`).length < 1) {
      return;
    }

    this.ProductSlider = new Swiper(`.${this.sliderContainerSelector}`, {
      slidesPerView: 3,
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
