import PopupHelper from '../../../js/popup-helper';

export default new class categoryDrawer {
  constructor() {
    this.panelSelector = 'category';
    this.panelOpenSelector = 'category_open';
    this.drawerBtnSelector = 'js-category-bar';
    this.drawerParentSelector = 'catalog';
    this.drawerOpenBtnSelector = 'category__btn-close';
    this.drawerCloseSelector = 'category__btn-close';
    this.showMoreSelector = 'category__show-more';
    this.categoryListSelector = 'category__list';
    this.categoryListAllSelector = 'category__list_all';
    this.activeButtonSelector = 'category__show-more_active';
    this.categoryButtonTextSelector = 'category__show-more-text';


    this.mqString = '(min-width: 769px)';

    this.handler();
    this.showMoreCategory();
  }

  handler() {
    const btn = document.querySelector(`.${this.drawerCloseSelector}`);
    const modal = document.querySelector(`.${this.panelSelector}`);

    PopupHelper.escPressHandler(btn, modal);

    $(document).on('click', `.${this.drawerBtnSelector}`, ({ target }) => {
      const panel = $(target).parents(`.${this.drawerParentSelector}`).find(`.${this.panelSelector}`);
      const focusTarget = $(target).hasClass(this.drawerOpenBtnSelector)
        ? document.querySelector(`.${this.drawerCloseSelector}`)
        : document.querySelector(`.${this.drawerOpenBtnSelector}`);
      const condition = panel.hasClass(this.panelOpenSelector);

      PopupHelper.setBodyScrollState(condition);
      PopupHelper.overlayController(!condition);

      panel.toggleClass(this.panelOpenSelector);

      PopupHelper.overlayClickHandler(focusTarget);
    });

    $(window).on('resize', () => {
      const vpCondition = window.matchMedia(this.mqString).matches;
      const modalCondition = $(`.${this.panelSelector}`).hasClass(this.panelOpenSelector);

      if (vpCondition && modalCondition) {
        btn.click();
      }
    });
  }

  showMoreCategory() {
    const showMoreButton = $(`.${this.showMoreSelector}`);

    if (!showMoreButton.length) return;

    $(document).on('click', `.${this.showMoreSelector}`, ({ currentTarget }) => {
      const categoryList = $(currentTarget).siblings(`.${this.categoryListSelector}`);
      const categoryButtonText = $(`.${this.categoryButtonTextSelector}`);
      categoryList.toggleClass(this.categoryListAllSelector);
      $(currentTarget).toggleClass(this.activeButtonSelector);

      if ($(currentTarget).hasClass(this.activeButtonSelector)) {
        categoryButtonText.html('Hide categories');
      } else {
        categoryButtonText.html('Show all categories');
      }
    });
  }
}();
