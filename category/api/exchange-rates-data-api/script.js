var myHeaders = new Headers()
myHeaders.append('apikey', 'fIDyvD55OcH4jSOHuTUJVFa9mIqyFBu2')

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders,
}

// convert

let to = 'JPY'
let from = 'CNY'
let amount = '24000'

fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error))

// latest

let base = 'CNY'
let symbols = 'USD,JPY'

fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=${symbols}&base=${base}`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error))
