/* eslint-disable no-underscore-dangle */
import BaseComponent from './BaseComponent';

export default class PopUp extends BaseComponent {
  constructor(container, element) {
    super(container, element);
    this.linkedPopUp = undefined;
    this._form = undefined;
  }

  setLinkedPopUp(popup, linkSelector) {
    this.linkedPopUp = popup;
    this.setEventHandler(linkSelector, { eventType: 'click', callback: this._openLinkedPopUp.bind(this) });
  }

  inintHandlers() {
    this.setEventHandler('.popup__btn-close', { eventType: 'click', callback: this.close.bind(this) });
  }

  setContentForm(form) {
    const placeholder = this._element.querySelector('.form');
    placeholder.parentNode.replaceChild(form.getFormElement(), placeholder);
    this._form = form;
  }

  _openLinkedPopUp() {
    this.close();
    this.linkedPopUp.show();
  }

  show() {
    if (this._form !== undefined) {
      this._form.refresh();
      this._form.renderSubmitError('');
    }
    this.container.appendChild(this._element);
  }

  close() {
    this.container.removeChild(this._element);
  }
}
