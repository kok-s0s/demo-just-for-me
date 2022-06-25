fetch('./symbols.json')
  .then((response) => response.json())
  .then((json) => {
    list.innerHTML = Object.entries(json.symbols)
      .map((item) => {
        return `
            <div class="listItem">
              <span>${item[0]}</span>
              <span>${item[1]}</span>
            </div>
        `
      })
      .join('')
  })

var myHeaders = new Headers()
myHeaders.append('apikey', 'fIDyvD55OcH4jSOHuTUJVFa9mIqyFBu2')

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders,
}

async function convert() {
  let to = document.getElementById('to').value
  let from = document.getElementById('from').value
  let amount = document.getElementById('amount').value

  const response = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)
  const result = await response.json()

  convertRes.innerHTML = await `${result.result} ${to}`
}

const confirmConvert = document.getElementById('confirmConvert')

confirmConvert.onclick = function () {
  convert()
}

async function latest() {
  let base = document.getElementById('base').value
  let symbols = document.getElementById('symbols').value

  const response = await fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=${symbols}&base=${base}`, requestOptions)
  const result = await response.json()

  console.log(result)

  latestRes.innerHTML = Object.entries(result.rates)
    .map((item) => {
      return `
        <div class="listItem">
          <span>${item[0]}</span>
          <span>${item[1]}</span>
        </div>
    `
    })
    .join('')
}

const confirmLatest = document.getElementById('confirmLatest')

confirmLatest.onclick = function () {
  latest()
}
