import MainApi from '../js/api/MainApi';
import NewsCard from '../js/components/NewsCard';
import NewsCardsList from '../js/components/NewsCardList';
import Header from '../js/components/Header';
import Templater from '../js/utils/Templater';

const {
  SERVER_URL,
} = require('../js/constants/Contsants');

(function saved() {
  const mainApi = new MainApi(SERVER_URL);
  const resultContainer = document.querySelector('.result-area');
  const headerContainer = document.querySelector('.header__container');
  const title = document.querySelector('.title_block_saved');
  const tags = document.querySelector('.text_block_saved');

  const header = new Header(headerContainer, undefined, 'light');
  const templater = new Templater();
  const cardList = new NewsCardsList(resultContainer, templater.getSavedCardListElement(), [], saved);

  const keywords = {};

  const renderAuthorized = (name) => {
    header.render(
      templater.getHeaderElementSaved(name),
      {
        selector: '.menu__button-container',
        event: {
          eventType: 'click',
          callback: () => {
            mainApi.signOut(()=>{ window.location.replace('index.html') });
          },
        },
      },
    );
  };

  //получаем информацию о регистрации
  mainApi.getUserInfo()
    .then((result) => {
      // зарегистрирован, рендер шапки
      renderAuthorized(result.name);
      // получаем карточки
      mainApi.fetchSavedArticles()
        .then((result) => {
          //есть карточки
          for (const article of result) {
            if (article.image !== null) {
              // формируем понятный объект
              const keyword = article.keyword;
              const fields = {
                keyword: keyword,
                title: article.title,
                description: article.text,
                publishedAt: article.date,
                source: {
                  name: article.source,
                },
                url: article.link,
                urlToImage: article.image,
              };

              //считаем ключевые слова
              keywords[keyword] = keywords.hasOwnProperty(keyword) ?
                keywords[keyword] + 1 :
                1;

              // создаем карточку
              const card = new NewsCard(
                undefined,
                templater.getSavedCardElement(fields),
                article.keyword,
                fields,
              );
              card.mongoId = article._id;
              // формируем колбек для кнопки сохранить
              const cardButtonHandler = () => {
                  mainApi.deleteArticle(card.mongoId)
                  .then(() => {
                    card.isSaved = false;
                    // убираем карточку
                    card.remove();
                  })
                  .catch((err) => console.log(err))
              };
              // вешаем колбек на кнопку
              card.setEventHandler('.card__button', {
                eventType: 'click',
                callback: cardButtonHandler,
              });
              // добавляем карточку на отрисовку
              cardList.addCard(card);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          console.log(cardList.cardsList);
          //отрисуем карточки
          cardList.renderResults();
          // установим заголовок
          title.textContent = `${result.name} у вас ${cardList.cardsList.length} \r\n сохраненных статей`;

          const sortedTags = Object.entries(keywords).sort((a,b) => b[1]-a[1]);
          if (sortedTags.length > 0){
            tags.textContent = `По ключевым словам:`;
            for (let i = 0; i < sortedTags.length; i++) {
              if(i === 3) {break};
              tags.textContent = `${tags.textContent} ${sortedTags[i][0]}`;
            }

            if ( sortedTags.length > 3 ) {
              tags.textContent = `${tags.textContent} и ${sortedTags.length - 3} другим`;
            }
          }

        });

      })
    .catch(() => {
      // регистрации нет, вернемся на основной экран
      window.location.replace('index.html');
    });
}());