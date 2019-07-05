// pages/search/search.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchData:'',
    garbageList:[],
    isShow:true
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
  //获取输入框中的数据
  getInputValue:function(e){
   var searchData=e.detail.value;
    var that = this;
    //根据searchData查询垃圾
    if(searchData===''){
      that.setData({
        garbageList:[],
      });
    }else{
      db.collection('garbage').where({
        gname: db.RegExp({
          regexp: searchData
        })
      }).get({
        success: function (res) {
          if(res.data.length==0){
            that.setData({
              isShow: false
            });
          }else{
            that.setData({
              garbageList: res.data,
              isShow: true
            });
          }
         
        }
      });
    }
    
  }

})