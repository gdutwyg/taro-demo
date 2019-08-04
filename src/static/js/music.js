import Taro, { Events } from '@tarojs/taro'
export const events = new Events()
import request from '../../static/js/request'

const innerAudioContext = Taro.createInnerAudioContext()
class Music {
  constructor() {
    Object.assign(this, {
      playList: [],
      curIndex: -1,
      isPlaying: false
    })
  }
  setPlayList(list) {
    this.playList = list || []
  }
  async playMuisc(i) {
    this.curIndex = i
    const res = await request.get({
      url: 'https://api.mtnhao.com/check/music',
      data: {
        id: this.playList[i].id
      }
    })
    if (res.success) {
      Taro.showToast({
        icon: 'none',
        title: '播放成功'
      })
      innerAudioContext.src = this.playList[i].url
      setTimeout(() => {
        innerAudioContext.play()
      }, 500)
    } else {
      // 音乐不可用
      Taro.showToast({
        icon: 'none',
        title: res.message
      })
      this.nextMusic()
    }
  }
  nextMusic() {
    if (this.curIndex === this.playList.length - 1) {
      this.playMuisc(0)
      return
    }
    this.playMuisc(this.curIndex + 1)
  }
  // 暂停/播放
  togglePlaying() {
    !this.isPlaying ? innerAudioContext.play() : innerAudioContext.pause()
  }
  keyEvent(e) {
    // space 键
    if (e.keyCode === 32) {
      e.preventDefault()
      this.togglePlaying()
    }
  }
}
const music = new Music()
innerAudioContext.onEnded(() => {
  music.nextMusic()
})

innerAudioContext.onPlay(() => {
  music.isPlaying = true
  events.trigger('togglePlaying', {
    isPlaying: true,
    curIndex: music.curIndex
  })
})
innerAudioContext.onPause(() => {
  music.isPlaying = false
  events.trigger('togglePlaying', {
    isPlaying: false,
    curIndex: music.curIndex
  })
})
// 进度更新
innerAudioContext.onTimeUpdate(() => {
  console.log(innerAudioContext.currentTime)
})
export default music
