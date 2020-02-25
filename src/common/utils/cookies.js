import Cookies from 'js-cookie'

export function setCookie(name, value, moreOptions) {
  /*  //override automatic escaping of value
    const cookies = Cookies.withConverter({
    write: function (value) {
      return unescape(value)
    }
  })*/
  //cookies.set(name, value, moreOptions)
  Cookies.set(name, value, moreOptions)
}

export function getCookie(name) {
  return Cookies.get(name)
}

export function deleteCookie(name) {
  Cookies.remove(name)
}
