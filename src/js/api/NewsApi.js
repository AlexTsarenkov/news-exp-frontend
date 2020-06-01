/* eslint-disable no-undef */
/* eslint-disable prefer-promise-reject-errors */
export default class NewsApi {
  constructor(apiKey) {
    this._apiKey = apiKey;
  }

  get apiKey() {
    return this._apiKey;
  }

  fetchNews(keyWord) {
    const date = new Date();
    const preDate = new Date((date.getTime() - (7 * 24 * 60 * 60 * 1000)));

    const url = 'https://praktikum.tk/news/v2/everything?'
        + `q=${keyWord}&`
        + `from=${preDate.toISOString().slice(0, 10)}&`
       // + `to=${new Date(date.getTime()).toISOString().slice(0, 10)}&`
       // + 'sortBy=popularity&'
        + 'pageSize=100&'
        + `apiKey=${this._apiKey}`;

    const req = new Request(url);

    return fetch(req)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject({ error: res.status });
      });
  }
}
