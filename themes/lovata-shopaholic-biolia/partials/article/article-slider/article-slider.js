import Swiper from 'swiper';
import LazyLoad from '../../../js/lazy-load';

export default new class ArticleSlider {
  constructor() {
    this.sliderContainerSelector = 'article-slider__container';
    this.paginationSelector = 'article-slider__pagination';
    this.prevBtnSelector = 'article-slider__button_prev';
    this.nextBtnSelector = 'article-slider__button_next';
    this.disableButtonSelector = 'article-slider__button_disable';
    this.nextBulletSelector = 'article-slider__bullet';
    this.nextBulletActiveSelector = 'article-slider__bullet_active';
    this.activeSlideSelector = 'article-slider__item_active';
    this.uselessPaginationSelector = 'article-slider__pagination_hidden';

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
          slidesPerView: 3,
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
