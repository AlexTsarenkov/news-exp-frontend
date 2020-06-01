/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
export default class Templater {
  constructor(templates) {
    this.templates = templates;
  }

  // попап
  getPopUpElement(texts) {
    const template = `
      <div class="popup popup_is-opened">
        <div class="popup__content popup__content_type_input">
          <img class="popup__btn-close" src="./images/popup-close.svg" alt="close">
          <h2 class="popup__title">${texts.title}</h2>
          <div class="form">form placeholder</div>
          <p class="popup__text popup__text_type_bottom popup__text_type_bottom_color_black">
            или
            <span class="popup__text popup__text_type_bottom popup__text_type_bottom_color_blue">
              ${texts.optional}
            </span>
          </p>
        </div>
      </div>
      `;
    return this._getElementFromTemplate(template);
  }

  // карточка
  getCardElement(article, isAuthorized) {
    const date = new Date(article.publishedAt);
    const newDate = `${date.getDate()}.${date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()}.${date.getFullYear()}`;
    const template = `
      <div class="card">
        <div class="card__button-container">
          ${isAuthorized ?
          ``
          :
          `<div class="card__tooltip">
            <p class="text text_block_tooltip element_theme_light">Войдите, чтобы сохранять статьи</p>
          </div>`
          }
          <button class="card__button card__button_type_add"></button>
        </div>
        <img class="card__image" src="${article.urlToImage}" alt="card image">
        <div class="card__text-container">
          <p class="card__date">${newDate}</p>
          <h3 class="title title_block_card element_theme_light">${article.title}</h3>
          <p class="text text_block_card element_theme_light">${article.description}.</p>
          <p class="card__source">${article.source.name}</p>
        </div>
      </div>
      `;
    return this._getElementFromTemplate(template);
  }

  getSavedCardElement(article) {
    const date = new Date(article.publishedAt);
    const newDate = `${date.getDate()}.${date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()}.${date.getFullYear()}`;
    const template = `
        <div class="card">
        <div class="card__tag">
          <p class="text text_block_tooltip element_theme_light">${article.keyword}</p>
        </div>
        <div class="card__button-container">
          <div class="card__tooltip">
            <p class="text text_block_tooltip element_theme_light">Убрать из сохранённых</p>
          </div>
          <button class="card__button card__button_type_delete"></button>
        </div>
        <img class="card__image" src="${article.urlToImage}" alt="card image">
        <div class="card__text-container">
          <p class="card__date">${newDate}</p>
          <h3 class="title title_block_card element_theme_light">${article.title}</h3>
          <p class="text text_block_card element_theme_light">${article.description}</p>
          <p class="card__source">${article.source.name}</p>
        </div>
      </div>
      `;
    return this._getElementFromTemplate(template);
  }

  // форма входа
  getSignInFormElement() {
    const template = `
      <form class="popup__form" name="signIn">
        <div class="popup__input">
          <p class="popup__input-name">Email</p>
          <input class="popup__input-field popup__text popup__text_type_input" type="text" name="email" id="email"
            pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$" placeholder="Введите почту" required />
          <p class="popup__input-error popup__input-error_is_opened">Обязательное поле</p>
        </div>
        <div class="popup__input">
          <p class="popup__input-name">Пароль</p>
          <input class="popup__input-field popup__text popup__text_type_input" type="password" name="password" id="password"
            placeholder="Введите пароль" required />
          <p class="popup__input-error popup__input-error_is_opened">Обязательное поле</p>
        </div>
        <p class="popup__error"></p>
        <button class="popup__submit-btn" type="submit" disabled>Войти</button>
      </form>
      `;
    return this._getElementFromTemplate(template);
  }

  // форма регистрации
  getSignUpFormElement() {
    const template = `
      <form class="popup__form novalidate">
        <div class="popup__input">
          <p class="popup__input-name">Email</p>
          <input class="popup__input-field popup__text popup__text_type_input" type="text" name="email" id="email"
            pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$" placeholder="Введите почту" required />
          <p class="popup__input-error popup__input-error_is_opened">Обязательное поле</p>
        </div>
        <div class="popup__input">
          <p class="popup__input-name">Пароль</p>
          <input class="popup__input-field popup__text popup__text_type_input" type="password" name="password" id="password"
            placeholder="Введите пароль" required />
          <p class="popup__input-error popup__input-error_is_opened">Обязательное поле</p>
        </div>
        <div class="popup__input">
          <p class="popup__input-name">Имя</p>
          <input class="popup__input-field popup__text popup__text_type_input" type="text" name="name" id="name"
            placeholder="Введите своё имя" required />
          <p class="popup__input-error popup__input-error_is_opened">Обязательное поле</p>
        </div>
        <p class="popup__error"></p>
        <button class="popup__submit-btn" type="submit" disabled>Зарегистрироваться</button>
      </form>
      `;
    return this._getElementFromTemplate(template);
  }

  // шапка главной страницы
  getHeaderElementAuthorized(username) {
    const templateAthorized = `
    <header class="menu menu_block_header">
        <h1 class="menu__logo element_theme_dark">NewsExplorer</h1>
        <nav class="menu__nav-container menu__nav-container_block_header ">
          <a class="menu__nav-item text text_block_nav-header element_theme_dark" href="#">Главная</a>
          <a class="menu__nav-item text text_block_nav-header element_theme_dark" href="saved.html">Сохранённые
            статьи</a>
          <div class="menu__button-container menu__button-container_theme_dark">
            <p class="text text_block_nav-header element_theme_dark">${username}</p>
            <img class="menu__logout-icon" src="./images/logout_wh.svg" alt="logout">
          </div>
        </nav>
        <button class="menu__expand-button menu__expand-button_theme_white "></button>
        </header>
    `;
    return this._getElementFromTemplate(templateAthorized);
  }

  getHeaderElementUnathorized() {
    const templateUnathorized = `
    <header class="menu menu_block_header">
      <h1 class="menu__logo element_theme_dark">NewsExplorer</h1>
          <nav class="menu__nav-container menu__nav-container_block_header ">
            <a class="menu__nav-item text text_block_nav-header element_theme_dark" href="#">Главная</a>
            <div class="menu__button-container menu__button-container_theme_dark">
              <p class="text text_block_nav-header element_theme_dark">Авторизоваться</p>
            </div>
          </nav>
          <button class="menu__expand-button menu__expand-button_theme_white "></button>
    </header>
    `;
    return this._getElementFromTemplate(templateUnathorized);
  }

  getHeaderElementSaved(name) {
    const template = `
    <header class="menu menu_block_header">
      <h1 class="menu__logo element_theme_light">NewsExplorer</h1>
      <nav class="menu__nav-container menu__nav-container_block_header">
        <a class="menu__nav-item text text_block_nav-header element_theme_light" href="./index.html">Главная</a>
        <a class="menu__nav-item text text_block_nav-header element_theme_light" href="#">Сохранённые
          статьи</a>
        <div class="menu__button-container menu__button-container_theme_light">
          <p class="text text_block_nav-header element_theme_light">${name}</p>
          <img class="menu__logout-icon" src="./images/logout_bk.svg" alt="logout">
        </div>
      </nav>
      <button class="menu__expand-button menu__expand-button_theme_black "></button>
    </header>
    `;
    return this._getElementFromTemplate(template);
  }

  // грид карточек
  getCardListElement() {
    const template = `
    <div class="result-area_block_main">
      <div class="result-area__container">
          <h2 class="title title_block_result element_theme_light">Результаты поиска</h2>
          <div class="cards-grid">
          </div>
          <button class="result-area__btn-more">Показать еще</button>
      </div>
    </div>
    `;
    return this._getElementFromTemplate(template);
  }

  getSavedCardListElement() {
    const template = `
    <div class="result-area__container">
      <div class="cards-grid"></div>
    </div>
    `
    return this._getElementFromTemplate(template);
  }

  // прелоудер
  getLoaderElement() {
    const template = `
      <div class="result-area_block_preloader">
        <i class="circle-preloader"></i>
        <p class="text text_block_preloader">Идет поиск новостей...</p>
      </div>
     `;
    return this._getElementFromTemplate(template);
  }

  getNotFoundTemplate(message) {
    const template = `
      <div class="result-area_block_not-found">
        <img class="result-area__not-found-img" src="./images/not-found.svg" alt="not found image">
        <h2 class="title title_block_not-found">Ничего не найдено</h2>
        <p class="text text_block_not-found">${message}</p>
      </div>
    `;

    return this._getElementFromTemplate(template);
  }

  getSuccessRegTemplate() {
    const template = `
    <div class="popup popup_is-opened">
    <div class="popup__content popup__content_type_message">
      <img class="popup__btn-close" src="<%=require('./images/popup-close.svg').default%>" alt="close">
      <h2 class="popup__title">Пользователь успешно зарегистрирован!</h2>
      <p class="popup__text_type_message">Выполнить вход</p>
    </div>
    </div>
    `;
    return this._getElementFromTemplate(template);
  }

  _getElementFromTemplate(template) {
    return new DOMParser().parseFromString(template, 'text/html').body.firstChild;
  }
}
