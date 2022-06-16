fetch('./data.json')
  .then((response) => response.json())
  .then((json) => {
    let jsonData = json[0].contents.map((item) => {
      return {
        value: item.contents.length,
        name: item.name,
      }
    })

    var myChart = echarts.init(document.getElementById('pie'))
    window.onresize = function () {
      myChart.resize()
    }

    var option = {
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: 'Data Pie',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: jsonData,
        },
      ],
    }

    myChart.setOption(option)

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
                      <a href="./category/${name}/${item.name}/index.html" class="link">${item.name}</a>
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

document.getElementById('open-dialog').addEventListener('click', () => {
  document.querySelector('dialog').showModal()
})
