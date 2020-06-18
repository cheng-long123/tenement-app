// 引入react
import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import {Route} from 'react-router-dom'
// 引入 TabBar 
import { TabBar } from 'antd-mobile';
// 引入home 样式
import './home.scss'
// 导入组件
import Index from '../Index'
import Houselist from '../Houselist'
import News from '../News'
import Profile from '../Profile'
// tabbar 
const tabItems = [{
    title: '首页',
    icon: 'icon-shouye1',
    path: '/home/index'
},
{
    title: '找房',
    icon: 'icon-ziyuan',
    path: '/home/houselist'
},
{
    title: '资讯',
    icon: 'icon-xingzhuangkaobei',
    path: '/home/news'
},
{
    title: '我的',
    icon: 'icon-my',
    path: '/home/profile'
}]
export default class index extends Component {
    // 数据初始化
    state = {
        selectedTab: '/home/index',
        hidden: false,
    }

    // 循环渲染tabbar
    renderTabbarItem () {
        return  tabItems.map((item, index) => {
            return (
          <TabBar.Item
              title={item.title}
              key={index}
              icon={
              <i className={`iconfont ${item.icon}`}/>
              }
              selectedIcon={
                  <i className={`iconfont ${item.icon}`}/>
              }
              selected={this.state.selectedTab === item.path}
              onPress={() => {
              this.setState({
                  selectedTab: item.path,
              });
              this.props.history.push(item.path)
              }}
              data-seed="logId"
              >
           </TabBar.Item>
          )
        })   
    }
    render() {
        return (
            <div className="home">
                <Route path="/home/index" component={Index}></Route>
                <Route path="/home/houselist" component={Houselist}></Route>
                <Route path="/home/news" component={News}></Route>
                <Route path="/home/profile" component={Profile}></Route>
              <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
                hidden={this.state.hidden}
                noRenderContent={true}
                 >
                {/* 渲染tabbar */} 
                 {
                    this.renderTabbarItem()
                 }
              </TabBar>
            </div>
        )
    }
}
