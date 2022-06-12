fetch('./data.json')
  .then((response) => response.json())
  .then((json) => {
    return (cards.innerHTML = json[0].contents
      .map((item) => {
        const { name, contents } = item
        return `
          <div class="card">
            <div class="title">${name}</div>
            <div class="list">
              ${contents
                .map((item) => {
                  return `
                    <div class="item">
                      <a href="https://github.com/kok-s0s/demo-just-for-me/tree/master/category/${name}/${item.name}" target="_blank" class="link">${item.name}</a>
                    </div>
                  `
                })
                .join('')}
            </div>
          </div>
        `
      })
      .join(''))
  })

const scrollElements = document.querySelectorAll('.js-scroll')

const elementInView = (el, percentageScroll = 100) => {
  const elementTop = el.getBoundingClientRect().top

  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100)
}

const displayScrollElement = (element) => {
  element.classList.add('scrolled')
}

const hideScrollElement = (element) => {
  element.classList.remove('scrolled')
}

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 100)) {
      displayScrollElement(el)
    } else {
      hideScrollElement(el)
    }
  })
}

window.addEventListener('scroll', () => {
  handleScrollAnimation()
})
