Page({
  data:{
    list: [],
    alpha: '',
    windowHeight: '',
    tid:1,
    index:0,
    imgList: [//图片列表
      "../../images/residualWaste.jpg",
      "../../images/recyclableWaste.jpg",
      "../../images/householdFoodWaste.jpg",
      "../../images/hazardousWaste.jpg",
    ]
  },
  onLoad(options){
    var tid =  parseInt(options.tid);
    var index = parseInt(options.index);
    try {
      var res = wx.getSystemInfoSync()
      this.pixelRatio = res.pixelRatio;
      // this.apHeight = 32 / this.pixelRatio;
      // this.offsetTop = 160 / this.pixelRatio;
      this.apHeight = 16;
      this.offsetTop = 80;
      this.setData({
        windowHeight: res.windowHeight + 'px',
        tid:tid,
        index: index
      });

    } catch (e) {
      
    }
    this.onQuery();
  },
  handlerAlphaTap(e) {
    let {ap} = e.target.dataset;
    this.setData({alpha: ap});
  },
  handlerMove(e) {
    let {list} = this.data;
    let moveY = e.touches[0].clientY;
    let rY = moveY - this.offsetTop;
    if(rY >= 0) {
      let index = Math.ceil((rY - this.apHeight)/ this.apHeight);
      if(0 <= index < list.length) {
        let nonwAp = list[index];
        nonwAp && this.setData({alpha: nonwAp.alphabet});
      }
    }
  },
  onQuery: function () {
    var that=this;
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'test',
      // 传递给云函数的参数
      data: {
        type:'get',
        db:'garbage',
        condition:{
          tid:that.data.tid
        }
      },
      success: res => {
        // output: res.result === 3
        var allList=[];
        var letter = new Array('Top','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
        var list = new Array();
        var list1 = new Array();
        for (var i in res.result){
          for (var j in res.result[i].data){
            allList.push(res.result[i].data[j]);
          }
        }
        for (var i = 0; i < 27; i++) {
          const result = allList.filter(function (item) {
            return item.initials === letter[i]
          });
          list[i] = result;
        }
        for (var i = 0; i < list.length; i++) {
          var list2 = new Array();
          for (var j = 0; j < list[i].length; j++) {
            list2.push(list[i][j].gname);
          }
          list1.push({ alphabet: letter[i], datas: list2 });
        }
        that.setData({
          list: list1
        })
      }
    })
  }
})