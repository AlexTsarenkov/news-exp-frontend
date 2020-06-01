/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import BaseComponent from './BaseComponent';

export default class NewsCard extends BaseComponent {
  constructor(container, element, keyword, article) {
    super(container, element);
    this.keyword = keyword;
    this.title = article.title;
    this.description = article.description;
    this.publishedAt = article.publishedAt;
    this.source = article.source.name;
    this.url = article.url;
    this.urlToImage = article.urlToImage;
    this.isSaved = false;
    this.mongoId = undefined;
    this._icon = undefined;
    this._tooltip = undefined;
  }

  remove() {
    this.container.removeChild(this._element);
  }

  getElement() {
    this._icon = this._element.querySelector('.card__button');
    this._tooltip = this._element.querySelector('.text_block_tooltip');
    return this._element;
  }

  renderIcon() {
    if (this.isSaved) {
      this._icon.style.background = 'url(./images/card-marked.svg)';
    } else {
      this._icon.style.background = 'url(./images/card-normal.svg)';
    }
  }
}
