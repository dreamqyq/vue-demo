fakeData()
axios.get('/books/1').then(({data})=>{
  let originalContent = document.querySelector('.booksContent').innerHTML
  let newContent = originalContent.replace('__bookName__',data.name).replace('__bookNum__',data.num)
  document.querySelector('.booksContent').innerHTML = newContent
})

document.querySelector('#addOne').onclick = function() {
  let bookNum = parseInt(document.querySelector('.bookNum').innerText, 10)
  bookNum += 1
  axios.put('/books/1',{num:bookNum}).then(()=>{
    document.querySelector('.bookNum').innerHTML = bookNum
  })
}
document.querySelector('#reduceOne').onclick = function() {
  let bookNum = parseInt(document.querySelector('.bookNum').innerText, 10)
  bookNum -= 1
   axios.put('/books/1',{num:bookNum}).then(()=>{
    document.querySelector('.bookNum').innerHTML = bookNum
  })
}
document.querySelector('#reset').onclick = function() {
  let bookNum = parseInt(document.querySelector('.bookNum').innerText, 10)
  bookNum = 0
   axios.put('/books/1',{num:bookNum}).then(()=>{
    document.querySelector('.bookNum').innerHTML = bookNum
  })
}

function fakeData() {
  // 一个假的数据库book
  let book = {
    name: 'JavaScript 高级程序设计',
    num: 2,
    id: 1
  }
  // 在真正返回response之前使用
  axios.interceptors.response.use(function(response) {
    // 获取请求的数据
    let {config: {method, url, data}} = response
    if (url === '/books/1' && method === 'get') {
      response.data = book
    } else if (url === '/books/1' && method === 'put') {
      data = JSON.parse(data)
      // 如果是PUT请求，说明要改后台数据，因此将数据库book中的数据部分更新即可
      Object.assign(book, data)
      response.data = book
      console.log(book) //将数据库打印出来 
    }
    return response
  })
}
