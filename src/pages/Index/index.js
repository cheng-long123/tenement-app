// 引进react
import React, { Component } from 'react'
import axios from 'axios'
// 轮播图
import { Carousel, Toast, Flex, Grid  } from 'antd-mobile';
// 引进index样式
import './index.css'
import './index.scss'
// 引进nav图片
import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'
// nav 数据
const navs = [{
  id: 0,
  img: nav1,
  title: '整租',
  path: '/home/houselist'
}, {
  id: 1,
  img: nav2,
  title: '合租',
  path: '/home/houselist'
}, {
  id: 2,
  img: nav3,
  title: '地图找房',
  path: '/home/map'
}, {
  id: 3,
  img: nav4,
  title: '去出租',
  path: '/rent/add'
}]
export default class Index extends Component {
    state = {
        data: [], // 轮播图
        imgHeight: 176,
        isplay: false, // 轮播图自动播放
        groups:[], // 租房小组
        news: [], //最新资讯
        myCity: '' // 我的位置
      }
      componentDidMount() {
        // 轮播
          this.getSwiper()
        // 出租
        this.getGroups()
        // 最新资讯
        this.getNews(0)
        // 获取位置信息
        this.getLocation()
      }
      // 获取轮播图数据
      async getSwiper () {
         const{ data } = await axios({
            method: 'GET',
            url: 'http://api-haoke-dev.itheima.net/home/swiper'
          })
        //   console.log(data);
          // 获取失败提示
          if (data.status !== 200) {
            Toast.info('获取图片失败！！', 1);
          }
          // 存储数据
          this.setState({
              data: data.body,
          }, () => {
              this.setState({
                isplay: true
              })
          })
      }
      // 租房小组
      async getGroups () {
        const { data } = await axios({
          method: 'GET',
          url: 'http://api-haoke-dev.itheima.net/home/groups?area=AREA%7C88cff55c-aaa4-e2e0'
        })
        // console.log(data);
        this.setState({
          groups: data.body
        })
        
      }
      // 最新资讯
      async getNews () {
        const { data } = await axios({
          method: 'GET',
          url: 'http://api-haoke-dev.itheima.net/home/news?area=AREA%7C88cff55c-aaa4-e2e0'
        })
        // console.log(data)
        this.setState({
          news: data.body
        })
      }
      // 获取位置信息
      getLocation () {
        var myCity = new window.BMap.LocalCity()
        myCity.get( result => {
          var cityName = result.name
          // console.log(cityName)
          this.setState({
            myCity: cityName
          })
        })
      }
      // 渲染Swiper
      renderSwiper () {
          return this.state.data.map(val => (
            <a
              key={val.id}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
              >
              <img
                src={`http://api-haoke-dev.itheima.net${val.imgSrc}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))
      }
      // nav区渲染
      renderNavs () {
        // 循环遍历
        return navs.map( item => {
          return <Flex.Item key={item.id} onClick={() => {
            // 点击跳转
            this.props.history.push(item.path)
          }}>
          <img src={item.img} alt=""/>
          <p>{item.title}</p>
        </Flex.Item>
      })
      }
      // 最新资讯 news渲染区
      renderNews () {
        return this.state.news.map( item => {
          return (
            <Flex className="news-content" key={item.id}>
            <div className="left-image">
            <img src={`http://api-haoke-dev.itheima.net${item.imgSrc}`}alt=""/>
            </div>
            <div className="rigth-text">
              <h4>{item.title}</h4>
              <div className="bottom-text">
              <span>{item.from}</span>
              <span>{item.date}</span>
              </div>
            </div>
          </Flex>
          )
        })
      }
    render() {
        return (
        <div className="index">
         {/* 搜索区 */}
         <Flex className="search">
            <div className="left-search">
                <div className="region" onClick={ () => {
                  this.props.history.push('/cityList')
                }}>
                <span>{this.state.myCity}</span>
                 <i className="iconfont icon-arrow"/>
                </div>
                <div className="search-content">
                <i className="iconfont icon-seach"></i>
                <input type="text" placeholder="请输入小区地址" />
                </div>
            </div>
            <i 
              className="iconfont icon-map" 
              onClick={()=>{
                // 点击  右侧地图图标  去/map   地图找房页面
                this.props.history.push("/map")
              }}
          />

         </Flex>
        {/* 轮播图 */}
            <Carousel
              autoplay={this.state.isplay}
              infinite
              //beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
              //afterChange={index => console.log('slide to', index)}
             >
             {/* 轮播图渲染 */}
              { this.renderSwiper()}
            </Carousel>
            {/* nav区 */}
           <Flex className="navs">
              {
                this.renderNavs()
              }
            </Flex>
             {/* 租房小组 */}
             <div className="groups" onClick={() => {
               this.props.history.push('/map')
             }}>
              {/* 头部区域 */}
                <div className="groups-title">
                    <h3>租房小组</h3>
                    <span>更多</span>
                </div>
             { /* 内容区 */}
             <Grid data={this.state.groups}
              hasLine={false}
              square={false}
              columnNum={2}
              activeStyle={true}
              renderItem={(item, index) => (
               <Flex className="content" justify="between">
                  <div className="content-text">
                  <h3>{item.title}</h3>
                  <span>{item.desc}</span>
                  </div>
                  <img className="img" src={`http://api-haoke-dev.itheima.net${item.imgSrc}`} alt=""/>
               </Flex>
              )}
              />
             </div>
             {/* 新闻资讯 */}
            <div className="news">
              <div className="news-title">
              <h3>最新资讯</h3>
              </div>
                {
                 this.renderNews()
                }
            </div>
        </div>
        )
    }
}
