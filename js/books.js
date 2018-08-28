fakeData()

function Model(options){
  this.data = options.data
  this.resource = options.resource
}
Model.prototype.fetch = function(id){
  return axios.get(`/${this.resource}s/${id}`).then((response) => {
      this.data = response.data
      console.log(this.data)
      return response
    })
}
Model.prototype.update = function(data){
  let id = this.data.id
    return axios.put(`/${this.resource}s/${id}`, data).then((response) => {
      this.data = response.data 
      console.log('response')
      console.log(response)
      return response
    })
}


let model = new Model({
  data: {
    name: '',
    number: 0,
    id: ''
  },
  resource: 'book'
})

let view = new Vue({
  el: '#app',
  data: {
    book: {
      name:'未命名',
      number: 0,
      id: ''
    },
    n:1
  },
  template: `
    <div>
      <div>
      书名：《{{book.name}}》
      数量：<span id=number>{{book.number}}</span>
      </div>
      <div>
        <input v-model="n" />
        <span>N的值为：{{n}}</span>
      </div>
      <div>
        <button v-on:click="addOne">加N</button>
        <button v-on:click="reduceOne">减N</button>
        <button v-on:click="reset">归零</button>
      </div>
    </div>
  `,
  created(){
    model.fetch(1).then(()=>{
      this.book = model.data
    })
  },
  methods: {
    addOne() {
      model.update({
        number: this.book.number + parseInt(this.n,10)
      }).then(() => {
        this.view.book = this.model.data
      })
    },
    reduceOne() {
      model.update({
        number: this.book.number - parseInt(this.n,10)
      }).then(() => {
        this.view.book = this.model.data
      })
    },
    reset() {
      model.update({
        number: 0
      }).then(() => {
        this.view.book = this.model.data
      })
    }
  }
})

// 假的数据库
function fakeData() {
  // 一个假的数据库book
  let book = {
    name: 'JavaScript 高级程序设计',
    number: 2,
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
