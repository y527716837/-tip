// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperH:'',//swiper高度
    nowIdx:0,//当前swiper索引
    imgList:[//图片列表
      "../../images/residualWaste.png",
      "../../images/recyclableWaste.png",
      "../../images/householdFoodWaste.png",
      "../../images/hazardousWaste.png",
    ],
    introduce:[
      {
        name:'干垃圾',
        backgroundColor:'rgb(44, 43, 41)',
        info:'除有害垃圾、湿垃圾、可回收垃圾以外的其他生活废弃物',
        color: 'rgb(44, 43, 41)',
        demand:[
          '尽力沥干水分','难以辨识类别的生活垃圾投入干垃圾容器内'
        ]
      },
      {
        name:'可回收物',
        backgroundColor:'#003377',
        info:'废纸张、废塑料、废金属、废玻璃、废织物等适宜回收,可循环利用的废弃物。',
        color:'#000066',
        demand:[
          '轻投轻放','清洁干燥,避免污染','废纸尽量平整','立体包装清空内容物,清洁后压扁投放','有尖锐边角的,应包裹后投放'
        ]
      },
      {
        name:'湿垃圾',
        backgroundColor:'rgb(100, 64, 50)',
        info:'易腐蚀的生物质废弃物。包括剩菜剩饭、瓜皮果核、花卉绿植、肉类碎骨、过期食品、餐厨垃圾等。',
        color:'rgb(100, 64, 50)',
        demand:[
          '纯流质的食物垃圾,如牛奶等,应直接倒进下水口','有包物的湿垃圾应将包装物取出后分类投放,包装物请投放到对应的可回收物容器或干垃圾容器'
        ]
      },
      {
        name:'有害垃圾',
        backgroundColor:'rgb(229, 52, 34)',
        info:'对人体健康或者自然环境造成直接或潜在危害的废弃物,单位集中产生的除外。主要包括废电池、废灯管、废药品、废油漆桶等',
        color:'rgb(229, 52, 34)',
        demand:[
          '充电电池、纽扣电池、蓄电池投放时注意轻放','油漆桶、杀虫剂如有残留请密闭后投放','荧光灯、节能灯易破损请连带包装或包裹后轻放','废药品及其包装连带包装一并投放'
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 搜索框获得焦点
  goSearch:function(){
    //跳转搜索界面
    wx.navigateTo({
      url: '../search/search',
    })
  },
  //获取swiper高度
  getHeight:function (e) {
    var winWid = wx.getSystemInfoSync().windowWidth - 2 * 50;//获取当前屏幕的宽度
    var imgh = e.detail.height;//图片高度
    var imgw = e.detail.width;
    var sH = winWid * imgh / imgw-0.35*winWid+ "px"
    this.setData({
      swiperH: sH//设置高度
    })
  },
  //swiper滑动事件
  swiperChange:function (e) {
    this.setData({
      nowIdx: e.detail.current
    })
  }
})