/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
import './index.css';
import './images/not-found.svg';
import './images/popup-close.svg';
import './images/logout_wh.svg';
import './images/logout_bk.svg';

import NewsApi from './js/api/NewsApi';
import NewsCard from './js/components/NewsCard';
import NewsCardsList from './js/components/NewsCardList';
import MainApi from './js/api/MainApi';
import Header from './js/components/Header';
import PopUp from './js/components/PopUp';
import Templater from './js/utils/Templater';
import Form from './js/components/Form';
import FormValidator from './js/utils/FormValidator';


const {
  API_KEY,
  SERVER_URL,
} = require('./js/constants/Contsants');

(function main() {
  const resultContainer = document.querySelector('.result-area');
  const rootContainer = document.querySelector('.root');
  const searchFormElement = document.querySelector('.search__form');
  const headerContainer = document.querySelector('.header__container');

  const newsApi = new NewsApi(API_KEY);
  const mainApi = new MainApi(SERVER_URL);


  const messages = {
    not_found: 'По данному запросу нет результатов',
    server_err: 'ошибка сервера',
    user_exists: 'Такой пользователь уже есть',
    wrong_data: 'Неправильный email и/или пароль',
  };

  const formValidationMessages = {
    field_obligatory: 'Обязательное поле',
    pattern: 'Необходимо ввеcти Email',
    length: 'Введите имя',
  };

  const templater = new Templater();

  const cardList = new NewsCardsList(resultContainer, templater.getCardListElement(), [], 'main');

  const signInPopUp = new PopUp(rootContainer, templater.getPopUpElement({ title: 'Вход', optional: 'Зарегистрироваться' }));
  const signUpPopUp = new PopUp(rootContainer, templater.getPopUpElement({ title: 'Регистрациия', optional: 'Войти' }));
  const successPopUp = new PopUp(rootContainer, templater.getSuccessRegTemplate());

  const signUpForm = new Form(
    templater.getSignUpFormElement(),
    new FormValidator(formValidationMessages),
  );
  const signInForm = new Form(
    templater.getSignInFormElement(),
    new FormValidator(formValidationMessages),
  );
  const searchForm = new Form(searchFormElement);

  const header = new Header(headerContainer, undefined, 'dark');

  let isAthorized;
  cardList.setEventHandler('.result-area__btn-more', { eventType: 'click', callback: cardList.showMore.bind(cardList) });

  successPopUp.setLinkedPopUp(signInPopUp, '.popup__text_type_message');
  signInPopUp.setLinkedPopUp(signUpPopUp, '.popup__text_type_bottom_color_blue');
  signUpPopUp.setLinkedPopUp(signInPopUp, '.popup__text_type_bottom_color_blue');
  signUpPopUp.setContentForm(signUpForm);
  signInPopUp.setContentForm(signInForm);

  signInPopUp.inintHandlers();
  signUpPopUp.inintHandlers();
  successPopUp.inintHandlers();

  const renderUnathorized = () => {
    isAthorized = false;
    header.render(
      templater.getHeaderElementUnathorized(),
      {
        selector: '.menu__button-container',
        event: {
          eventType: 'click',
          callback: () => {
            header.collapseMenu();
            signInPopUp.show();
          }
        },
      },
    );
  };

  const renderAuthorized = (name) => {
    isAthorized = true;
    header.render(
      templater.getHeaderElementAuthorized(name),
      {
        selector: '.menu__button-container',
        event: {
          eventType: 'click',
          callback: () => {
            header.collapseMenu();
            mainApi.signOut(renderUnathorized);
          },
        },
      },
    );
  };

  // отрисуем header
  mainApi.getUserInfo()
    .then((result) => {
      renderAuthorized(result.name);
    })
    .catch(() => {
      renderUnathorized();
    });

  searchForm.setSubmitEvent(() => {
    const values = searchForm.getFormValues();

    cardList.refresh();
    cardList.renderElement(templater.getLoaderElement());

    mainApi.getNews(values.searchQuery)
      .then((result) => {
        for (const article of result) {
          if (article.urlToImage !== null) {
            // создаем карточку
            const card = new NewsCard(
              undefined,
              templater.getCardElement(article, isAthorized),
              values.searchQuery,
              article,
            );
            // формируем колбек для кнопки сохранить
            // Понимаю что громоздко, но по другому не придумал
            const cardButtonHandler = () => {
              if (!card.isSaved) {
                mainApi.saveArticle(card)
                  .then((res) => {
                    card.isSaved = true;
                    card.mongoId = res._id;
                    card.renderIcon();
                  })
                  .catch((err) => console.log(err))
                  .finally(() => card.renderIcon());
              } else {
                mainApi.deleteArticle(card.mongoId)
                  .then(() => {
                    card.isSaved = false;
                  })
                  .catch((err) => console.log(err))
                  .finally(() => card.renderIcon());
              }
            };
            card.setEventHandler('.card__button', {
              eventType: 'click',
              callback: cardButtonHandler,
            });
            cardList.addCard(card);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        cardList.removeElement();
        cardList.renderElement(templater.getNotFoundTemplate(messages.server_err));
      })
      .finally(() => {
        cardList.removeElement();
        if (cardList.cardsList.length !== 0) {
          cardList.renderResults();
        } else {
          cardList.renderElement(templater.getNotFoundTemplate(messages.not_found));
        }
      });
  });

  signUpForm.setSubmitEvent(() => {
    const values = signUpForm.getFormValues();

    mainApi.signUp(values.email, values.name, values.password)
      .then(() => {
        signUpPopUp.close();
        signUpForm.renderSubmitError('');
        successPopUp.show();
      })
      .catch(() => {
        signUpForm.renderSubmitError(messages.server_err);
      });
  });

  signInForm.setSubmitEvent(() => {
    const values = signInForm.getFormValues();

    mainApi.signIn(values.email, values.password)
      .then((result) => {
        renderAuthorized(result.name);
        signInForm.renderSubmitError('');
        signInPopUp.close();
      })
      .catch((err) => {
        console.log(err);
        if (err.error === 409) {
          signInForm.renderSubmitError(messages.user_exists);
        } else if (err.error === 403) {
          signInForm.renderSubmitError(messages.wrong_data);
        } else {
          signInForm.renderSubmitError(messages.server_err);
        }
      });
  });
}());
