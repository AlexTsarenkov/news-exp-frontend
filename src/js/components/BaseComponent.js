/* eslint-disable no-underscore-dangle */
export default class BaseComponent {
  constructor(container, element) {
    this._element = element;
    this.container = container;
  }

  setEventHandler(selector, event) {
    const eventElement = this._element.querySelector(selector);
    eventElement.addEventListener(event.eventType, event.callback);
  }
}
