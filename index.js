fetch('./data.json')
  .then((response) => response.json())
  .then((json) => {
    console.log(json)
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
