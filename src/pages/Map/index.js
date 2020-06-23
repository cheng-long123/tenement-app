import React, { Component } from 'react'
import request from '../../utils/request.js'
import './index.scss'
import styles from './map.module.scss'
import { Toast} from 'antd-mobile';
import NvaHeader from '../../components/NavHeader'
import {getLocation} from '../../utils/index.js'
var BMap = window.BMap
export default class Map extends Component {
    state = {
        count: 0,
        list: [],
        isShow: false
    }
    componentDidMount () {
        this.mapInit()
    }

    async mapInit () {
        let dingwei = await getLocation()
          this.map = new BMap.Map("container")
        // var point = new BMap.Point(116.404, 39.915)
        // map.centerAndZoom(point, 15)
        this.map.addEventListener('movestart', () => {
            this.setState({
                isShow: false
            })
        })
        var myGeo = new BMap.Geocoder();      
        // 将地址解析结果显示在地图上，并调整地图视野    
        // console.log(this.renderOverlay);
        myGeo.getPoint (dingwei.label, (point) => {      
            if (point) {     
                // 组件 
                // console.log(this.map);
                this.map.centerAndZoom(point, 11);      
                this.map.addOverlay(new BMap.Marker(point))    
                this.map.addControl(new BMap.NavigationControl())  
                this.map.addControl(new BMap.ScaleControl())
                this.map.addControl(new BMap.OverviewMapControl()) 
                this.map.addControl(new BMap.MapTypeControl())   
                this.map.addControl(new BMap.CopyrightControl())   
                 
            }
            this.renderOverlay(dingwei.value,'cycle')
        }, 
            dingwei.label)
}
  async renderOverlay(id, type) {
    Toast.loading('加载中.....', 0,null,false )
    const {data} = await request({
        method: 'GET',
        url: '/area/map',
        params:{
            id:id
        }   
    }) 
    // 销毁loading
    Toast.hide()
    // console.log(data);
      data.body.forEach((item, index) => {
            let point = new BMap.Point(item.coord.longitude,item.coord.latitude)
            var opts = {
                position : point,    // 指定文本标注所在的地理位置
                offset   : new BMap.Size(-35, -35)    //设置文本偏移量
            }
            var label = new BMap.Label( ' ' ,opts)  // 创建文本标注对象
                if (type === 'cycle' ) {
                    label.setContent(`
                    <div class="${styles.bubble}" key={index}>
                            <p class="${styles.name}">${item.label}</p>
                            <p>${item.count}套</p>
                    </div>
                    `)
                } else if (type === 'rect') {
                    label.setContent(`
                    <div class="${styles.rect}" key={index}>
                        <span class="${styles.housename}">${item.label}</span>
                        <span class="${styles.housenum}">${item.count}套</span>
                        <i class="${styles.arrow}"></i>
                    </div>
                  `)
                }
               
                label.setStyle({
                    padding: 0,
                    border: 'none'
                });
                // 点击事件
                label.addEventListener('click', (e) => {
                    // 获取
                    let zoom = this.map.getZoom()
                    // console.log(zoom);
                    if (zoom === 11) {
                        // 点击放大到13
                        this.map.centerAndZoom(point, 13);
                        // 清除覆盖物
                        setTimeout(() => {
                        this.map.clearOverlays()
                        }, 10);
                        // 点击调用renderOverlay函数
                        this.renderOverlay(item.value,'cycle')
                    } else if (zoom === 13) {
                             // 点击放大到15
                        this.map.centerAndZoom(point, 15);
                        // 清除覆盖物
                        setTimeout(() => {
                        this.map.clearOverlays()
                        }, 10);
                        // 点击调用renderOverlay函数
                        this.renderOverlay(item.value,'rect')
                    } else {
                        // 获取x,y坐标
                        let clickX = e.changedTouches[0].clientX
                        let clickY = e.changedTouches[0].clientY
                        // 获取终点坐标
                        let centerX = (window.innerWidth / 2)
                        let centerY = (window.innerHeight - 330) / 2
                        // 点击坐标减去中心坐标
                        let distanceX = clickX - centerX
                        let distanceY = clickY - centerY
                        // 将地图在水平位置上移动x像素，垂直位置上移动y像素。
                        //如果指定的像素大于可视区域范围或者在配置中指定没有动画效果，
                        //则不执行滑动效果
                        this.map.panBy(-distanceX,-distanceY)
                        this.getHouses(item)
                        // console.log(e);
                        
                    }
                    
                })
            this.map.addOverlay(label);  
    })           
  }
  async getHouses (item) {
      // 获取房源信息
    Toast.loading('加载中.....', 0,null,false )
        const {data} = await request({
            method: 'GET',
            url: '/houses',
            params: {
                cityId: item.value
            }
        })
        Toast.hide()
        this.setState({
            count: data.body.count,
            list: data.body.list,
            isShow: true
        })
        // console.log(data);
        
  }

//   渲染房源列表
  renderHouselist () {
      return (
        this.state.list.map((item, index) => {
            return (
                <div className={styles.house} key={index}>
                <div className={styles.imgWrap}>
                    <img className={styles.img} src={`http://api-haoke-dev.itheima.net${item.houseImg}`} alt="" />
                </div>
                <div className={styles.content}>
                    <h3 className={styles.title}>{item.title}</h3>
                    <div className={styles.desc}>{item.desc}</div>
                    <div>
                        {/* ['近地铁', '随时看房'] */}
                             {
                                 item.tags.map((value, i) => {
                                     return   <span className={[styles.tag,styles.tag1 ].join(' ')} key={i}>
                                     {value}
                                 </span>
                                 })
                             }
                    </div>
                    <div className={styles.price}>
                        <span className={styles.priceNum}>7000</span> 元/月
                    </div>
                </div>
            </div>
         )
      })
      )
  }
    render() {
        return (
            <div className="map">
             <NvaHeader>地图找房</NvaHeader>
                <div id="container"/>
                 {/* 筛选房子列表 */}
                <div
                        className={[styles.houseList, this.state.isShow ? styles.show : ''  ].join(' ')}
                         >
                        <div className={styles.titleWrap}>
                            <h1 className={styles.listTitle}>房屋列表</h1>
                            <a className={styles.titleMore} href="/house/list">
                                更多房源
                            </a>
                        </div>
                        <div className={styles.houseItems}>

                          {
                              this.renderHouselist()
                          }
                          </div>
                    </div>

               </div>
        )
    }
}
