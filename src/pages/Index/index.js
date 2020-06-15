// 引进react
import React, { Component } from 'react'
import axios from 'axios'
// 轮播图
import { Carousel, Toast, Flex } from 'antd-mobile';
// 引进index样式
import './index.css'
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
        data: [],
        imgHeight: 176,
        isplay: false
      }
      componentDidMount() {
          this.getSwiper()
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
    render() {
        return (
        <div className="index">
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
        </div>
        )
    }
}
