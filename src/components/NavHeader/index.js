import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile'
 class NvaHeader extends Component {
    render() {
        return (
            <NavBar
                className="navbar"
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.props.history.go(-1)}
           >城市选择</NavBar>
        )
    }
}
export default NvaHeader
