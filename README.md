# news-exp-frontend
## Yandex Praktikum diploma
-----
## Github.io
### https://alextsarenkov.github.io/news-exp-frontend/index.html
## О проекте. 
Данный проект является дипломной работой по курсу web-разработки на [Яндекс.Практикум](https://praktikum.yandex.ru/).
## Функционал
Данный репозиторий является front-end частью дипломной работы.

-----
## Необходимые пакеты
Пакет|
---|
"@babel/cli": "^7.8.4"|
"@babel/core": "^7.9.6"|
"@babel/preset-env": "^7.9.6"|
"autoprefixer": "^9.8.0"|
"babel-loader": "^8.1.0"|
"bable-loader": "0.0.1-security"|
"core-js": "^3.4.1"|
"cross-env": "^7.0.2"|
"css-loader": "^3.5.3"|
"cssnano": "^4.1.10"|
"file-loader": "^6.0.0"|
"gh-pages": "^2.0.1"|
"html-webpack-plugin": "^4.3.0"|
"image-webpack-loader": "^6.0.0"|
"mini-css-extract-plugin": "^0.9.0"|
"mini-svg-data-uri": "^1.2.3"|
"optimize-css-assets-webpack-plugin": "^5.0.3"|
"postcss-loader": "^3.0.0"|
"svgo-loader": "^2.2.1"|
"url-loader": "^4.1.0"|
"webpack": "^4.43.0"|
"webpack-cli": "^3.3.11"|
"webpack-dev-server": "^3.11.0"|
"webpack-md5-hash": "0.0.6"|
 "babel-polyfill": "^6.26.0"|
-----

## Запуск
Билд | Команда | Результат
--- | --- | ---
dev билд| npm run dev | Запуск локального сервера и открытие веб страницы на localhost:3000 с hot-reload
prod билд | npm run start | сборка страницы с помощью webpack, результат попадет в папку dist
gh-pages | npm run deploy | сборка страницы с помощью webpack и размещение её на git hub pages
-----

## Тестирование
Указания по отображению блоков описанны в виде комментариев в html файлах.

### Тестирование popup
Все виды попапов описанны в блоке root, что бы показать какой либо из них необходимо добавить в <div class="popup"> класс popup_is-opened.

### Блоки результата
Все возможные результаты поиска описанны в секциях <section class="result-area"> и по умолчанию скрыты.
Что бы протестировать какую либо из секций, необходимо в <section class="result-area"> добавить класс result-area_is-opened
  
Блок с гридом и карточками имеем модификатор result-area_block_main
Блок с прелоудером имеем модификатор result-area_block_preloader
Блок с сообщениме о том, что ничего не найденно, имеет модификатор result-area_block_not-found
  
### Меню хедера
В <section class="header-area"> описанны оба вида меню, по умолчанию показывается меню авторизованного пользователя.
Что бы проверить второй вариант необходимо убрать у его <header class="menu_block_header> класс menu_is-hidden и добавить этот класс к меню, которое активно в данный момент.

### Меню мобильной версии
Ширина экрана должна быть менее 650px
Для основной страницы
1) в <header class="menu_block_header> добавить класс menu_is-expanded_theme_dark
2) в <nav class="menu__nav-container_block_header добавить класс menu__nav-container_is-expanded_theme_dark
3) в <button class="menu_expand-button> добавить класс menu__expand-button_is-expanded
  
Для страницы с сохраненными новостями.
1) в <header class="menu_block_header> добавить класс menu_is-expanded_theme_light
2) в <nav class="menu__nav-container_block_header добавить класс menu__nav-container_is-expanded_theme_ligt
3) в <button class="menu_expand-button> добавить класс menu__expand-button_is-expanded
