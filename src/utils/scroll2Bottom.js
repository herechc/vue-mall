export function is2Bottom(callback) {
  document.addEventListener('scroll', function() {
    let documentHeight = document.documentElement.clientHeight
    let bodyHeight = document.body.clientHeight
    let scrollTop = document.body.scrollTop
    if (scrollTop >= bodyHeight - documentHeight) {
      callback && callback()
    }
  })
}
