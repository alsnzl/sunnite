;(function () {
  /* Must use fromCodePoint — '\u11580' is parsed as '\u1158' + '0' in JS. */
  var CODEPOINTS = [
    0x11580, 0x11582, 0x11584, 0x1158d, 0x1158e, 0x1158f, 0x11590, 0x11591,
    0x11592, 0x11593, 0x11594, 0x11595, 0x11596, 0x11597, 0x11598, 0x11599,
    0x1159a, 0x1159b, 0x1159c, 0x1159d, 0x1159e, 0x1159f, 0x115a0, 0x115a1,
    0x115a2, 0x115a3, 0x115a4, 0x115a5, 0x115a6, 0x115a7, 0x115a8, 0x115a9,
    0x115aa, 0x115ab, 0x115ac, 0x115ad, 0x115ae,
  ]

  var CHARS = CODEPOINTS.map(function (cp) {
    return String.fromCodePoint(cp)
  })

  function rand(min, max) {
    return min + Math.random() * (max - min)
  }

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  var root = document.createElement('div')
  root.className = 'siddham-field'
  root.setAttribute('aria-hidden', 'true')

  var count = window.matchMedia('(max-width: 640px)').matches ? 10 : 16

  for (var i = 0; i < count; i++) {
    var el = document.createElement('span')
    el.className = 'siddham-field__glyph'
    el.textContent = pick(CHARS)

    var size = rand(2.2, 5.8)
    var left = rand(2, 92)
    var top = rand(4, 88)
    var peak = rand(0.07, 0.18)
    var driftMs = rand(14000, 28000)
    var fadeMs = rand(9000, 18000)
    var delay = rand(-fadeMs, 0)

    el.style.left = left + '%'
    el.style.top = top + '%'
    el.style.fontSize = size + 'rem'
    el.style.setProperty('--peak', String(peak))
    el.style.setProperty('--scale', String(rand(0.85, 1.15)))
    el.style.setProperty('--dx', rand(-28, 28) + 'px')
    el.style.setProperty('--dy', rand(-36, 36) + 'px')
    el.style.setProperty('--rot-start', rand(-12, 12) + 'deg')
    el.style.setProperty('--rot-mid', rand(-18, 18) + 'deg')
    el.style.setProperty('--rot-end', rand(-10, 10) + 'deg')
    el.style.setProperty('--blur-near', rand(0, 1.2) + 'px')
    el.style.setProperty('--blur-far', rand(2, 6) + 'px')
    el.style.animationDuration = driftMs + 'ms, ' + fadeMs + 'ms'
    el.style.animationDelay = delay + 'ms, ' + delay + 'ms'

    root.appendChild(el)
  }

  document.body.prepend(root)

  function markReady() {
    root.classList.add('is-ready')
  }

  if (document.fonts && document.fonts.load) {
    document.fonts
      .load('48px "Noto Sans Siddham"')
      .then(function () {
        return document.fonts.ready
      })
      .then(markReady)
      .catch(markReady)
  } else {
    markReady()
  }
})()
