import * as utils from "./utils.js";

export class Api {
  constructor(config){
    this._url = config.url
    this._link = `${this._url}`
  }

  getAllCards(){
    const token = localStorage.getItem('token')
    return fetch(`${this._link}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res)=>{
        return this._onResponce(res)
    })
  }

  getUser(){
    const token = localStorage.getItem('token')
    return fetch(`${this._link}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res)=>{
      return this._onResponce(res)
    })
  }

  editUser(name, about) {
    const token = localStorage.getItem('token')
    return fetch(`${this._link}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then((res)=>{
      return this._onResponce(res)
    });  
  }

  deleteCard(idCard){
    const token = localStorage.getItem('token')
    return fetch(`${this._link}/cards/${idCard}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res)=>{
      return this._onResponce(res)
    })
  }

  addCard(name, link){
    const token = localStorage.getItem('token')
    return fetch(`${this._link}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((res)=>{
      return this._onResponce(res)
    }); 
  }

  _onResponce(res){
    if(res.ok){
      return res.json()
    }
    return Promise.reject({massage: 'Ошибка на сервере', res})
  }

addLike(idCard){
  const token = localStorage.getItem('token')
  return fetch(`${this._link}/cards/${idCard}/likes`, {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  })
  .then((res)=>{
    return this._onResponce(res)
  }); 
}

deleteLike(idCard){
  const token = localStorage.getItem('token')
  return fetch(`${this._link}/cards/${idCard}/likes`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  })
  .then((res)=>{
    return this._onResponce(res)
  }); 
}

editAvatar(avatar) {
  const token = localStorage.getItem('token')
  return fetch(`${this._link}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatar
    })
  })
  .then((res)=>{
    return this._onResponce(res)
  });  
}

changeLikeCardStatus(idCard, isLiked){
  const token = localStorage.getItem('token')
  if(!isLiked){
    return fetch(`${this._link}/cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then((res)=>{
      return this._onResponce(res)
    }); 
  }
  else {
    return fetch(`${this._link}/cards/${idCard}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then((res)=>{
      return this._onResponce(res)
    }); 
  }

}

}

export const api = new Api (utils.conf)