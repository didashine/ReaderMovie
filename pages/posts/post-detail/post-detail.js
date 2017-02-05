var postData = require('../../../data/posts-data.js');
var app = getApp();
Page({
    data: {
        isPlayingMusic: false
    },
    onLoad(option) {
        var postId = option.id;
        this.setData({
            postKey: postData.postList[postId],
            id: postId
        });
        var postsCollected = wx.getStorageSync('posts_collected');
        if (postsCollected) {
            var postCollected = postsCollected[postId];
            this.setData({
                collected: postCollected
            })
        }
        else {
            var postsCollected = {};
            postsCollected[postId] = false;
            wx.setStorageSync('posts_collected', postsCollected);
        }
        if (app.globalData.g_isplayingmusic) {
            this.setData({
                isPlayingMusic: true
            })
        }
    },
    onCollectionTap(event) {
        var postsCollected = wx.getStorageSync('posts_collected');
        var postCollected = postsCollected[this.data.id];
        // 收藏变成未收藏，未收藏变成收藏
        postCollected = !postCollected;
        postsCollected[this.data.id] = postCollected;
        //更新文章true/false的缓存值
        wx.setStorageSync('posts_collected', postsCollected);
        //更新数据绑定变量从而实现切换图片
        this.setData({
            collected: postCollected
        })

        wx.showToast({
            title: postCollected ? "收藏成功" : "取消成功"
        })
    },
    onShareTap(event) {
        wx.showActionSheet({
            itemList: [
                "分享到朋友圈",
                "分享到微信好友",
                "分享到到QQ",
                "分享到微博"
            ],
            itemColor: "#405f80"
        })
    },
    onMusicTap(event) {
        var currentPostId = this.data.id
        var postsData = postData.postList[currentPostId]
        var isPlayingMusic = this.data.isPlayingMusic
        if (isPlayingMusic) {
            wx.pauseBackgroundAudio()
            this.setData({
                isPlayingMusic: false
            })
        } else {
            wx.playBackgroundAudio({
                dataUrl: postsData.music.url,
                title: postsData.music.title,
                coverImgUrl: postsData.music.coverImg
            })
            this.setData({
                isPlayingMusic: true
            })
        }
        var that = this
        wx.onBackgroundAudioPlay(function () {
            that.setData({
                isPlayingMusic: true
            })
        app.globalData.g_isplayingmusic = true
        })
        wx.onBackgroundAudioPause(function () {
            that.setData({
                isPlayingMusic: false
            })
        app.globalData.g_isplayingmusic = false
        })
    }
})