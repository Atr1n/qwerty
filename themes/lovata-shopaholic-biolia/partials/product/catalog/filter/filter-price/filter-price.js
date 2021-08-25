export default new class filterPrice {
  constructor() {
    this.priceInput = 'filter-price__input';

    this.init();
  }

  init() {
    const input = $(`.${this.priceInput}`);

    if (!input.length) return;

    $(document).on('input', `.${this.priceInput}`, ({ target }) => {
      const value = $(target).val();
      const correctValue = value.replace(/[^\d.]/g, '');

      $(target).val(correctValue);
    });

    $(document).on('blur', `.${this.priceInput}`, ({ target }) => {
      const value = parseFloat($(target).val());
      const max = parseFloat($(target).attr('max'));
      const min = parseFloat($(target).attr('min'));

      if (value > max) {
        $(target).val(max);
      }

      if (value < min) {
        $(target).val(min);
      }
    });
  }
}();
