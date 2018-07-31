var requestFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function requestAnimationFallback (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
})()

function ease (pos) {
  return ((pos /= 0.5) < 1)
    ? (0.5 * Math.pow(pos, 5))
    : (0.5 * (Math.pow((pos - 2), 5) + 2))
}

module.exports = function scrollToY (el, Y, speed) {
  var isWindow = !!el.alert
  var scrollY = isWindow ? el.scrollY : el.scrollTop
  var pos = Math.abs(scrollY - Y)
  var time = Math.max(0.1, Math.min(pos / speed, 0.8))

  let currentTime = 0

  function setY () {
    module.exports.scrolling = true
    currentTime += 1 / 60

    var p = currentTime / time
    var t = ease(p)

    if (p < 1) {
      var y = scrollY + ((Y - scrollY) * t)
      requestFrame(setY)

      if (isWindow) {
        el.scrollTo(0, y)
      } else {
        el.scrollTop = y
      }

      return
    }

    if (isWindow) {
      el.scrollTo(0, Y)
    } else {
      el.scrollTop = Y
    }

    module.exports.scrolling = false
  }
  setY()
}
