;(function () {
  var CHARS = [
    '\u11580',
    '\u11582',
    '\u11584',
    '\u1158D',
    '\u1158E',
    '\u1158F',
    '\u11590',
    '\u11591',
    '\u11592',
    '\u11593',
    '\u11594',
    '\u11595',
    '\u11596',
    '\u11597',
    '\u11598',
    '\u11599',
    '\u1159A',
    '\u1159B',
    '\u1159C',
    '\u1159D',
    '\u1159E',
    '\u1159F',
    '\u115A0',
    '\u115A1',
    '\u115A2',
    '\u115A3',
    '\u115A4',
    '\u115A5',
    '\u115A6',
    '\u115A7',
    '\u115A8',
    '\u115A9',
    '\u115AA',
    '\u115AB',
    '\u115AC',
    '\u115AD',
    '\u115AE',
  ]

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
      .then(markReady)
      .catch(markReady)
  } else {
    markReady()
  }
})()
