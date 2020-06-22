import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import styles from './index.module.scss'
import PropTypes  from 'prop-types'
 class NvaHeader extends Component {
    render() {
        return (
            <NavBar
                className={styles.navbar}
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.props.history.go(-1)}
           >{this.props.children}</NavBar>
        )
    }
}
// 校验
NvaHeader.propTypes = {
    children: PropTypes.string
} 
// 不传默认
NvaHeader.defaultProps = {
    children: '好客租房'
}
export default withRouter(NvaHeader)
