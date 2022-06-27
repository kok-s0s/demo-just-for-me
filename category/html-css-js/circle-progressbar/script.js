const circleProgressBar = CircleProgressBar()
let p = 0

var m = setInterval(() => {
  circleProgressBar(++p)
}, 200)

function CircleProgressBar() {
  const oLeftCircleBar = getCircleBar('left'),
    oRightCircleBar = getCircleBar('right'),
    oTitle = document.querySelector('.circle-progressbar .title')

  return function (precent) {
    if (precent <= 50 && precent >= 0) {
      setRotate(oRightCircleBar, precent)
    } else if (precent > 50 && precent <= 100) {
      setRotate(oLeftCircleBar, precent - 50)
    }

    if (precent >= 0 && precent <= 100) {
      oTitle.innerHTML = `${precent}%`
    }
  }

  function formatDegree(precent) {
    return `rotate(${-135 + (360 / 100) * precent}deg)`
  }

  function setRotate(node, precent) {
    node.style.transform = formatDegree(precent)
  }

  function getCircleBar(dir) {
    return document.querySelector(`.circle-progressbar .${dir}-wrapper .circle-bar`)
  }
}

const circleTwo = document.getElementById('progress-circle'),
  oTitle = document.getElementById('circle-progressbar-title')
let q = 0

var n = setInterval(() => {
  circleProgressBarTwo(++q)
}, 100)

function circleProgressBarTwo(precent) {
  const d = (360 / 100) * precent
  circleTwo.style.background = `radial-gradient(white 50%, transparent 51%), conic-gradient(transparent 0deg ${d}deg, gainsboro ${d}deg 360deg), conic-gradient(orange 0deg, yellow 90deg, lightgreen 180deg, green)`
  if (precent >= 0 && precent <= 100) {
    oTitle.innerHTML = `${precent}%`
  }
}
