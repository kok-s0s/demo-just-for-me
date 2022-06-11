import data from './data.json' assert { type: 'json' }

const listData = data[0].contents

const generate = () => {
  return (cards.innerHTML = listData
    .map((item) => {
      const { name, contents } = item
      return `
        <div class="card">
          <div class="title">${name}</div>
          <div class="list">
            ${contents
              .map((item) => {
                return `<div class="item">${item.name}</div>`
              })
              .join('')}
          </div>
        </div>
      `
    })
    .join(''))
}

generate()
