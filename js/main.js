let list = new Vue({
  el:'#list',
  data:{
    selected:null,
    listMenu:[
      {num:1,content:'书籍列表'},
      {num:2,content:'浮层开启与关闭'},
      {num:3,content:'Tab 切换'},
      {num:4,content:'一个简单的轮播'},
    ]
  },
  methods:{
  }
})

let exphibition = new Vue({
  el:'#exhibition',
  data:{
    selected:null,
    active:'active',
    isOpen: false,
    colors:[
      {number:0,color:'red'},
      {number:1,color:'green'},
      {number:2,color:'blue'},
      {number:3,color:'orange'},
      {number:4,color:'pink'},
      {number:5,color:'cyan'},
      {number:6,color:'purple'}
    ],
  },
  methods:{
    toggle(){
      this.isOpen = !this.isOpen
    },
    changeColor(event){
      current = event.currentTarget
      for(let i = 0; i < this.colors.length;i++){
        current.parentNode.children[i].style.background = ''
      }
      current.style.background = current.innerHTML
    },
    go(index){
      let picsBox = this.$el.querySelector('.picsBox')
      let distance = picsBox.offsetWidth/7
      picsBox.style.transform = `translateX(-${index*distance}px)`
    }
  }
})
