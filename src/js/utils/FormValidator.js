/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable semi */
/* eslint-disable default-case */
export default class FormValidator {
  constructor(words) {
    this.elementsToValidate = [];
    this.buttonsToRender = [];
    this.words = words;
  }


  addButtonToRender(button) {
    this.buttonsToRender.push(button);
  }

  setValidators(fields) {
    for (const field of fields) {
      switch (field.id) {
        case 'email':
          field.addEventListener('input', this.validateEmail.bind(this));
          this.elementsToValidate.push(field);
          break;
        case 'name':
          field.addEventListener('input', this.validateName.bind(this))
          this.elementsToValidate.push(field);
          break;
        case 'password':
          field.addEventListener('input', this.validatePassword.bind(this));
          this.elementsToValidate.push(field);
          break;
      }
    }
  }

  validatePassword(event) {
    if (event.target.value.length === 0) {
      this.setCustomMessage(event.target, this.words.field_obligatory);
    } else {
      this.setCustomMessage(event.target, '');
    }

    this.renderValidityMessages(event.target);
  }

  validateName(event) {
    if (event.target.value.length === 0) {
      this.setCustomMessage(event.target, this.words.field_obligatory);
    }

    if (event.target.validity.tooShort) {
      this.setCustomMessage(event.target, this.words.length)
    }

    if (!event.target.validity.tooShort && event.target.value.length !== 0) {
      this.setCustomMessage(event.target, '');
    }

    this.renderValidityMessages(event.target);
  }

  validateEmail(event) {
    if (event.target.value.length === 0) {
      this.setCustomMessage(event.target, this.words.field_obligatory)
    }

    if (event.target.validity.patternMismatch) {
      this.setCustomMessage(event.target, this.words.pattern);
    }

    if (!event.target.validity.patternMismatch && event.target.value.length !== 0) {
      this.setCustomMessage(event.target, '');
    }
    this.renderValidityMessages(event.target);
  }

  setCustomMessage(element, message) {
    const label = this.getLabelForElement(element);
    label.textContent = message;
    element.setCustomValidity(message);
  }


  renderValidityMessages(element) {
    const label = this.getLabelForElement(element);
    if (!element.validity.valid) {
      if (!label.classList.contains('popup__input-error_is_opened')) {
        label.classList.add('popup__input-error_is_opened');
      }
    } else if (label.classList.contains('popup__input-error_is_opened')) {
      label.classList.remove('popup__input-error_is_opened');
    }
    this.render();
  }

  refresh() {
    this.elementsToValidate = [];
    this.buttonsToRender = [];
  }

  render() {
    if (this.elementsToValidate.every((element) => element.validity.valid)) {
      // eslint-disable-next-line prefer-const
      for (let button of this.buttonsToRender) {
        button.removeAttribute('disabled', '');
      }
    } else {
      // eslint-disable-next-line prefer-const
      for (let button of this.buttonsToRender) {
        button.setAttribute('disabled', '');
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getLabelForElement(element) {
    return element.parentElement.querySelector('.popup__input-error');
  }
}
