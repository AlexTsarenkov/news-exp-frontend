/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-syntax */

import BaseComponent from './BaseComponent';

export default class NewsCardList extends BaseComponent {
  constructor(container, element, cardsList, page) {
    super(container, element);
    this.cardsList = cardsList;
    this._cardCount = 0;
    this._page = page;
    this._cardContainer = undefined;
    this._elementOnScreen = undefined;
  }

  renderResults() {
    // получим контейнер грида
    this._cardContainer = this._element.querySelector('.cards-grid');
    // добавим карточки
    this._addCardsToView();
    // отрисуем грид
    this._render();
  }

  renderElement(element) {
    this._elementOnScreen = element;
    this.container.appendChild(element);
  }

  removeElement() {
    if (this._elementOnScreen !== undefined) {
      this.container.removeChild(this._elementOnScreen);
    }
    this._elementOnScreen = undefined;
  }

  refresh() {
    // кол-во отрисованных карточек
    this._cardCount = 0;

    // удалим все экземпляры класса Card из прошлого поиска
    for (let card of this.cardsList) {
      card = null;
    }
    // очистим массив
    this.cardsList = [];

    // очистим контейнеры
    if (this._cardContainer !== undefined) {
      this._cardContainer.innerHTML = '';
    }
    this.container.innerHTML = '';
  }

  showMore() {
    this._cardCount += 3;
    this._addCardsToView();
  }

  addCard(card) {
    this.cardsList.push(card);
  }

  _render() {
    // добавим эелемент
    this.container.appendChild(this._element);
  }

  _addCardsToView() {
    if (this._page === 'main' ) {
      for (const card of this.cardsList.slice(this._cardCount, this._cardCount + 3)) {
        card.container = this._cardContainer;
        this._cardContainer.appendChild(card.getElement());
      }
    } else {
      for (const card of this.cardsList) {
        card.container = this._cardContainer;
        this._cardContainer.appendChild(card.getElement());
      }
    }
  }
}
