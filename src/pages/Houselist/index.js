import React, { Component } from 'react'
import  SearchHeader from '../../components/SearchHeader/'
import  Filter from './components/Filter/'
import {getLocation} from '../../utils/index.js'
import './Houselist.scss'
export default class Houselist extends Component {
    state = {
        myCity: ''
    }
    componentDidMount () {
        // 获取位置信息
        this.getmyCity()
    }
    async getmyCity () {
        let myCity = await getLocation()
        this.setState({
            myCity:myCity.label
        })
    }
    render() {
        return (
            <div className="Houselist">

               {/* 搜索组件 */}
               <div className="searchHeader">
               <div className= " iconfont icon-back"></div>
               <SearchHeader myCity={this.state.myCity}></SearchHeader>
               </div>
               {/* 筛选组件 */}
               <Filter/>
            </div>
        )
    }
}
