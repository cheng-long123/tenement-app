import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile';
import './index.scss'
export default class CityList extends Component {
    render() {
        console.log(this.props);
        return (
            <div className="cityList">
            <NavBar
                className="navbar"
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.props.history.go(-1)}
            >城市选择</NavBar>
            </div>
        )
    }
}
