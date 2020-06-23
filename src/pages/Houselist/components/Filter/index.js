import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'
import request from '../../../../utils/request.js'
import {getLocation} from '../../../../utils/index.js'
import styles from './index.module.css'
const titleStatus = {
  area: false,//区域
  mode: false,//方式
  price: false,//租金
  more: false//筛选
}

export default class Filter extends Component {
  state = {
    titleStatus: titleStatus,
    openType: '',
    PickerData: {}
  }
  componentDidMount () {
    // 获取下拉数据
    this.getPicker()
  }
  async getPicker () {
    let dingwei = await getLocation()
    const { data } = await request({
      method: 'GET',
      url: '/houses/condition',
      params: {
        id: dingwei.value
      }
    })
    this.setState({
      PickerData: data.body
    })
    console.log(data);
  }
  //高亮
  onTitleClick = (type) => {
    // console.log(type);
    this.setState({
      titleStatus: {
        ...titleStatus,
        [type]: true,
      },
      openType: type
    })
    
  }
  // 渲染下拉选择
  renderPicker () {
    let { openType } = this.state
    if (openType === 'area' || openType === 'mode' || openType === 'price' ) {
      let { PickerData } = this.state
      // console.log(PickerData);
      
      let data = [] //下拉数据
      let cols = 0
      switch (openType) {
        case 'area':
          data = [PickerData.area, PickerData.subway]
          cols = 3
          break;
        case 'mode':
          data = PickerData.rentType
          cols = 1
          break;
        case 'price':
          data = PickerData.price
          cols = 1
          break;
        default:
          
      }
      return (
        <FilterPicker 
          onCancel={this.onCancel}
          onSave={this.onSave}
          data={data}
          cols={cols}
         />
      )
    } else {
      return null
    }
   
  }
  // 取消隐藏下拉选择
  onCancel = () => {
    this.setState({
      openType: ''
    })
  }
  // 确认隐藏下拉选择
  onSave = () => {
    this.setState({
      openType: ''
    })
  }
  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {/* <div className={styles.mask} /> */}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle onTitleClick={this.onTitleClick} titleStatus={this.state.titleStatus} />

          {/* 前三个菜单对应的内容： */}
          {/* <FilterPicker /> */}
                {
                  this.renderPicker()
                }
          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
