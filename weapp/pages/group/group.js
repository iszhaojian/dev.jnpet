// group.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["全部", "猫饲料", "狗饲料", "猪饲料"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    // 友好体验开始
    wx.showLoading({
      title: '加载中',
    })

    // 请求拼团数据（拼团商品分类，拼团商品）
    wx.request({
      url: App.data.domain + '/group/index',
      data: {
        type: 1
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        console.log(res.data);
        return false;

        // if 
        if (res.data.code == 400) {

          wx.showModal({
            title: '请求失败',
            content: '请点击确定刷新页面!',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.reLaunch({
                  url: '/pages/main/main'
                })
              }
            }
          })

        } else {

          // 赋值
          that.setData({
            gcData: res.data.data.gcData,
            gData: res.data.data.gData,
            banner: res.data.data.banner
          })

          console.log(that.data.gcData)
          console.log(that.data.gData)

          // 获取设备基础信息
          wx.getSystemInfo({
            success: function (res) {
              that.setData({
                sliderLeft: (res.windowWidth / that.data.gcData.length - sliderWidth) / 2,
                sliderOffset: res.windowWidth / that.data.gcData.length * that.data.activeIndex
              });
            }
          })

        }
      },
      fail: function (e) {
        console.log(e)
        wx.showModal({
          title: '网络错误',
          content: '请点击确定刷新页面!',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.reLaunch({
                url: '/pages/main/main'
              })
            }
          }
        })
      }
    })

    // 友好体验结束
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  
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

  /**
   * 栏目切换事件
   */
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  /**
   * 跳转到拼团商品详细
   */
  gotoGroupDetail: function (e) {
    wx.navigateTo({
      url: '/pages/groupDetail/groupDetail?id=1'
    })
  }


})