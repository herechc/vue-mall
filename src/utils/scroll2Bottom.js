const linster = function() {
  let documentHeight = document.documentElement.clientHeight
  let bodyHeight = document.body.clientHeight
  let scrollTop = document.body.scrollTop
  console.log(32)
  if (scrollTop >= bodyHeight - documentHeight) {
    _callback && _callback()
  }
}
let _callback
export function is2Bottom(callback) {
  callback && (_callback = callback)
  document.addEventListener('scroll', linster, false)
}
export function removeEvent() {
  document.removeEventListener('scroll', linster, false)
  _callback = null
}
