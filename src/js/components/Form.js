/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */

export default class Form {
  constructor(element, validator) {
    this._element = element;
    this._submitError = undefined;
    this.validator = validator;
  }

  setSubmitEvent(callback) {
    this._element.addEventListener('submit', this._getEvent(callback));
  }

  getFormElement() {
    this._submitError = this._element.querySelector('.popup__error');
    this.validator.setValidators(this._element.elements);
    this.validator.addButtonToRender(this._element.querySelector('.popup__submit-btn'));
    return this._element;
  }

  getFormValues() {
    const values = {};
    for (const element of this._element.elements) {
      values[element.id] = element.value;
    }
    return values;
  }

  renderSubmitError(errorMsg) {
    this._submitError.textContent = errorMsg;
  }

  refresh() {
    for (const element of this._element.elements) {
      element.value = '';
    }
  }

  _getEvent(callback) {
    return (event) => {
      event.preventDefault();
      callback();
    };
  }
}
