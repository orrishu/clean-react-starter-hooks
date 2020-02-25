import cache from 'common/utils/cache'
import axios from 'axios'
import {getCookie} from 'common/utils/cookies'

function getToken() {
  const cookie = getCookie('UserData')
  const userData = cookie && cookie !== '' ? JSON.parse(cookie) : {}
  //console.log('userData', userData)
  const token = userData ? userData.token || '' : ''
  return token
}

export function apiFetch(relUrl, params = {}, noCache) {
  //return on next tick, letting mobx show loading indicator
  const url = createAbsoluteUrl(relUrl) //for axios: params can be sent as is
  //const cacheUrl = createUrl(relUrl, params)  //for cache, make one with params
  //const token = getToken()
  const headers = {} //{	'Authorization': `Bearer ${token}` }

  /*if (cache.has(cacheUrl) && !noCache) {
    //console.log('found on cache', url)
    const data = cache.get(cacheUrl)
    return new Promise((resolve) => setTimeout(() => resolve(data), 0))
  }*/ //disabled local caching

  return new Promise((resolve, reject) => {
    axios.get(url, {params, headers})
      .then(response => {
        //cache.add(url, response.data)
        return resolve(response.data)
      })
      .catch(error => {
        console.error('apiFetch Error:', error)
        return reject({ error })
      })
  })
}

export async function apiFetchAsync(relUrl, params = {}) { //, forPdf) {
  //note, those calls will not be cached.
  const url = createAbsoluteUrl(relUrl)
  //const token = getToken()
  const headers = {} //{	'Authorization': `Bearer ${token}`}
  
  /*if(forPdf){
    return await axios.get(url, {params, headers, responseType: 'blob'})
  }*/

  return await axios.get(url, {params, headers})
}

export function apiPost(relUrl, body) {
  const url = createUrl(relUrl)
  //const token = getToken()
  const headers = {	'Content-Type': 'application/json' } //, 'Authorization': `Bearer ${token}` }
  return new Promise((resolve, reject) => {
    axios.post(url, body, {headers})
      .then(response => {        
        return resolve(response.data)
      })
      .catch(error => {
        console.error('apiPost Error:', error)
        return reject({ error })
      })
  })
}

export async function apiPostAsync(relUrl, body = {}) {
  //note, those calls will not be cached.
  const url = createUrl(relUrl)
  //const token = getToken()
  const headers = {	'Content-Type': 'application/json' } //, 'Authorization': `Bearer ${token}` }
  return await axios.post(url, body, {headers})
}

export function createUrl(relUrl, searchParams = {}) {
  // console.log('searchParams',searchParams)
  let url = `${process.env.API_BASEURL}/${relUrl}`
  Object.keys(searchParams).forEach((key, index) => {
    if (index === 0) {
      url += '?'
    }
    if (index > 0) {
      url += '&'
    }
    //url += `${key}=${searchParams[key]}`
    const val = typeof searchParams[key] === 'string'
      ? searchParams[key]
      : JSON.stringify(searchParams[key])
    url += `${key}=${encodeURIComponent(val)}`
  })
  return url
}

function createAbsoluteUrl(relUrl) {
  return `${process.env.API_BASEURL}/${relUrl}`
}
/*
export function clearCache() {
  cache.clear()
}*/
