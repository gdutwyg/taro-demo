import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import utils from '../../static/js/utils'
import request from '../../static/js/request'
import './index.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }
  constructor() {
    super()
    this.state = {
      // 热歌榜
      currentTab: 'hot',
      tabList: [
        {
          name: '热歌榜',
          value: 'hot'
        },
        {
          name: '每日推荐',
          value: 'recommend'
        }
      ],
      playList: []
    }
  }
  async componentWillMount() {
    const data = await request.get({
      url: 'https://api.mtnhao.com/top/List',
      data: {
        idx: 1
      }
    })
    this.setState({
      playList: utils.formatPlayList(data.playlist.tracks)
    })
  }

  handleListClick(i) {
    // 跳转到目的页面，打开新页面
    Taro.navigateTo({
      url: `/pages/detail/index?i=${i + 1}`
    })
  }
  render() {
    return (
      <View className="music-box">
        <header class="music-header">
          <h1 class="music-header-title">简易音乐播放器</h1>
          {/* <div class="music-login-button">登录</div> */}
        </header>
        <View className="music-content">
          <View className="music-tab">
            {this.state.tabList.map((item, i) => {
              return <View taroKey={String(i)}>{item.name}</View>
            })}
          </View>
          <View className="music-list">
            <View className="music-list-header">
              <Text className="music-header-name">歌名</Text>
              <Text className="music-header-author">歌手</Text>
            </View>
            <ul class="music-list-content">
              {this.state.playList.map((item, i) => {
                return (
                  <li taroKey={String(i)} class="music-list-item">
                    <Text className="music-item-num">{i + 1}</Text>
                    <Text className="music-item-name">{item.name}</Text>
                    <Text className="music-item-author">{item.singer}</Text>
                  </li>
                )
              })}
            </ul>
          </View>
          {/* <View v-show="currentTab === 'recommend'" className="warning">敬请期待。。。</View> */}
        </View>
        {/* <View className="music-footer" v-if="curMusic" @click="turnDetail">
      <View className="music-img">
        <img :src="curMusic.picUrl" alt>
      </View>
      <View className="music-info">
        <h2>{{curMusic.name}}</h2>
        <p>{{curMusic.singer}}</p>
      </View>
      <View :className="{'btn-play': true, 'pause': !playing}" @click.stop="togglePlaying"></View>
    </View> */}
        <View className="music-bg" />
      </View>
    )
  }
}
