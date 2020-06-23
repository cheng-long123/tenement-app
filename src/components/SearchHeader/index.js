import React, { Component } from 'react'
import { Flex } from 'antd-mobile';
import { withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import './search.scss'
 class SearchHeader extends Component {
    render() {
        return (
            <Flex className="search">
            <div className="left-search">
                <div className="region" onClick={ () => {
                  this.props.history.push('/cityList')
                }}>
                <span>{this.props.myCity}</span>
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
        )
    }
}
SearchHeader.propType = {
    myCity: PropTypes.string
}
SearchHeader.defaultProps = {
    myCity: '北京'
}
export default withRouter(SearchHeader)
