var postData = require('../../data/posts-data.js');
Page({
    data: {
    },
    onLoad: function (options) {
        // 生命周期函数--监听页面加载

        this.setData({
            post_key: postData.postList
        });
    },
    onPostTap(event) {
        var postId = event.currentTarget.dataset.postid;   //6-1
        wx.navigateTo({
            url: 'post-detail/post-detail?id=' + postId
        })
    },
    onSwiperTap(event) {
        var postId = event.target.dataset.postid;   //6-1
        wx.navigateTo({
            url: 'post-detail/post-detail?id=' + postId
        })
    }
})