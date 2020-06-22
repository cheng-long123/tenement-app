import React, { Component } from 'react'
import {AutoSizer, List} from 'react-virtualized'
import request from '../../utils/request.js'
import { Toast } from 'antd-mobile';
import './index.scss'
import NvaHeader from '../../components/NavHeader'
import { getLocation } from '../../utils/index'
export default class CityList extends Component {
     listRef = React.createRef()
    state = {
        cityList:[], // 城市数据
        cityIndex: [],
        activeIndex: 0
    }
    componentDidMount () {
        // 获取城市数据
        this.getCity()
    }
    // 组件卸载
    componentWillUnmount  () {
        
    }
    // 获取城市数据
    async getCity () {
        // 发送请求
        const { data } = await request({
            method: 'GET',
            url : '/area/city?level=1'
        })
        const {cityList, cityIndex} = this.formaCity(data.body)
        // console.log(cityIndex);
        const hot = await request({
            method: 'GET',
            url: '/area/hot'
        })
        cityList['hot'] = hot.data.body
        cityIndex.unshift('hot')
        // 获取位置信息
        const location = await getLocation()
        cityList['#'] = [location]
        cityIndex.unshift('#')

        // // 存储数据到state里(ES6语法，简写)
        this.setState({
        cityList,
        cityIndex
        })
        // 获取上热门城市
        // console.log(cityList,cityIndex, location);
    }
    // 处理城市数据
    formaCity (list) {
    // 定一个新的对象来存储数据
        let cityList = {}
        // 遍历城市数据
        list.forEach(item => {
            // 截取城市开头的字母
            let word = item.short.substr(0, 1)
            // 判断是否有某个字母开头的数组
            if (cityList[word]) {
                // 如果有 就往里添加数据
                cityList[word].push(item)
            } else {
                // 没有就赋值数组 把第一个遍历的添加到数组里
            cityList[word] = [item]
            }
        })
        let cityIndex = Object.keys(cityList).sort()
        // console.log(cityIndex);
        // console.log(cityList);
        return {
            cityIndex,
            cityList
        }
    }
    // 渲染城市数据
    rowRenderer = ({
        index, // Index of row
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        key, // Unique key within array of rendered rows
        parent, // Reference to the parent List (instance)
        style, // Style object to be applied to row (to position it);
        // This must be passed through to the rendered row element.
      }) => {
        let word = this.state.cityIndex[index]
        let city = this.state.cityList[word]
        return (
            <div  className="city" key={key} style={style}>
             {/* 首字母 */}
                <div className="title">
                {/* 判断 */}
                {
                  word === '#' ? '当前位置' :
                  (word === 'hot' ? '热门城市' : 
                  word.toUpperCase())
                }
                </div>
                    {/* 城市名称 */}
                {
                    city.map(item => {
                        return <div
                        className="name"
                        key={item.value}
                        onClick={ () => {
                        let house_city=['北京','上海','广州','深圳']
                        // 判断是否能找到城市名称 找不到返回-1
                        if (house_city.indexOf(item.label) !== -1) {
                            // 存到本地存储
                            localStorage.setItem('my-city', JSON.stringify(item))
                            // 跳转到首页
                            this.props.history.push('./home/index')
                        } else {
                            Toast.info('该城市没有房源呦 ^_^', 1)
                         }
                        }}
                        >{item.label}</div>
                    }    
                  )
                }
           </div>
        )
    }
    // 计算高度
    getHeight = ({index}) => {
        let word = this.state.cityIndex[index]
        let citys = this.state.cityList[word]
        return 36 + citys.length * 50
    }
    // 渲染单词
    renderOption () {
        return  this.state.cityIndex.map( (item, index) => (
            <li className="option-item" key={index} onClick={() => {
                // console.log(index);
                this.isend = index
                if (index === 20 ) {
                    this.setState({
                        activeIndex: 20
                    }, () => {
                        this.listRef.current.scrollToRow(20)
                    })
                    return
                }
                this.listRef.current.scrollToRow(index)
                // console.log(this);
            }}>
                <span
                className={ index === this.state.activeIndex ? 'active' : '' }
                >{item === 'hot' ? '热' : item.toUpperCase()}</span>
            </li>
            ) )
    }
    // 滚动
    onRowsRendered = ({overscanStartIndex,overscanStopIndex,startIndex,stopIndex}) => {
            if (startIndex !== this.state.activeIndex) {
                if (this.isend !== 20) {
                  this.setState({
                    activeIndex:  startIndex
                    })
                }
            } 
    }
    render() {
        return (
            <div className="cityList">
             <NvaHeader>城市选择</NvaHeader>
            <AutoSizer>
              { ({height, width}) => (
                  <List
                    ref={this.listRef}
                    className="List"
                    height={height}
                    width={width}
                    rowCount={this.state.cityIndex.length}
                    rowHeight={this.getHeight}
                    rowRenderer={this.rowRenderer}
                    onRowsRendered={this.onRowsRendered}
                    scrollToAlignment='start'
                   >
                  </List>
                )
              }
            </AutoSizer>
            <ul className="right-option">
              {
               this.renderOption()
               }
               </ul>
            </div>
        )
    }
}
