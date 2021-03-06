import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import Index from './pages/index'

import './static/scss/index.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  config = {
    pages: ['pages/index/index', 'pages/detail/index'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTextStyle: 'black'
    }
    // tabBar: {
    //   selectedColor: '#ff0000',
    //   list: [
    //     {
    //       text: '首页',
    //       pagePath: 'pages/index/index'
    //     },
    //     {
    //       text: '详情',
    //       pagePath: 'pages/detail/index'
    //     }
    //   ]
    // }
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />
  }
}

Taro.render(<App />, document.getElementById('app'))
