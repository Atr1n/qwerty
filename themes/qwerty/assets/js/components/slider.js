import Swiper from 'swiper/swiper-bundle';
import 'swiper/swiper-bundle.css';

const swiper = new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    slideToClickedSlide: true,
    watchOverflow: true,

    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        1024: {
          slidesPerView: 2,
          spaceBetween: 40
        },
        1170: {
          slidesPerView: 1,
          spaceBetween: 40
        }
    }
});

const swiperBrand = new Swiper('.swiper-container-brand', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    slideToClickedSlide: true,
    watchOverflow: true,

    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },

    breakpoints: {
        1024: {
          slidesPerView: 2,
          spaceBetween: 40
        },
        1170: {
          slidesPerView: 3,
          spaceBetween: 40
        }
    }
});


