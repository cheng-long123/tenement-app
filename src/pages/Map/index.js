import React, { Component } from 'react'
import './index.scss'
var BMap = window.BMap
export default class Map extends Component {
    componentDidMount () {
        this.mapInit()
    }

    mapInit () {
        var map = new BMap.Map("container")
        var point = new BMap.Point(116.404, 39.915)
        map.centerAndZoom(point, 15)
    }
    render() {
        return (
            <div className="map">
                <div id="container"/>
            </div>
        )
    }
}
