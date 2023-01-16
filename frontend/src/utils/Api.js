import * as utils from "./utils.js";

export class Api {
  constructor(config){
    this._url = config.url
    this._headers = config.headers
    this._id = config.id
    this._link = `${this._url}/v1/${this._id}`
  }

  getAllCards(){
    return fetch(`${this._link}/cards`, {
      headers: this._headers
    })
    .then((res)=>{
        return this._onResponce(res)
    })
  }

  getUser(){
    return fetch(`${this._link}/users/me`, {
      headers: this._headers
    })
    .then((res)=>{
      return this._onResponce(res)
    })
  }

  editUser(name, about) {
    return fetch(`${this._link}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
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
    return fetch(`${this._link}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res)=>{
      return this._onResponce(res)
    })
  }

  addCard(name, link){
    return fetch(`${this._link}/cards`, {
      method: 'POST',
      headers: this._headers,
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
  return fetch(`${this._link}/cards/${idCard}/likes`, {
    method: 'PUT',
    headers: this._headers,
  })
  .then((res)=>{
    return this._onResponce(res)
  }); 
}

deleteLike(idCard){
  return fetch(`${this._link}/cards/${idCard}/likes`, {
    method: 'DELETE',
    headers: this._headers,
  })
  .then((res)=>{
    return this._onResponce(res)
  }); 
}

editAvatar(avatar) {
  return fetch(`${this._link}/users/me/avatar`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      avatar: avatar
    })
  })
  .then((res)=>{
    return this._onResponce(res)
  });  
}

changeLikeCardStatus(idCard, isLiked){
  if(!isLiked){
    return fetch(`${this._link}/cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((res)=>{
      return this._onResponce(res)
    }); 
  }
  else {
    return fetch(`${this._link}/cards/${idCard}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then((res)=>{
      return this._onResponce(res)
    }); 
  }

}

}

export const api = new Api (utils.conf)