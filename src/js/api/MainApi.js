/* eslint-disable no-undef */
/* eslint-disable prefer-promise-reject-errors */
export default class MainApi {
  constructor(serverUrl) {
    this.serverUrl = serverUrl;
  }

  getNews(keyword) {
    return fetch(`${this.serverUrl}news`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: keyword,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject({ error: res.status });
      });
  }

  deleteArticle(id) {
    return fetch(`${this.serverUrl}api/articles/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject({ error: res.status });
      });
  }

  saveArticle(article) {
    return fetch(`${this.serverUrl}api/articles`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: article.keyword,
        title: article.title,
        text: article.description,
        date: article.publishedAt,
        source: article.source,
        link: article.url,
        image: article.urlToImage,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject({ error: res.status });
      });
  }


  getUserInfo() {
    return fetch(`${this.serverUrl}api/users/me`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject({ error: res.status });
      });
  }

  signUp(email, name, password) {
    return fetch(`${this.serverUrl}api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject({ error: res.status });
      });
  }

  signIn(email, password) {
    return fetch(`${this.serverUrl}api/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject({ error: res.status });
      });
  }

  signOut(callback) {
    return fetch(`${this.serverUrl}api/signout`, {
      method: 'POST',
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject({ error: res.status });
      })
      .then(() => callback())
      .catch((err) => console.log(err));
  }

  fetchSavedArticles() {
    return fetch(`${this.serverUrl}api/articles`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject({ error: res.status });
      });
  }
}
