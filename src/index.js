import React from 'react';
import ReactDOM from 'react-dom';
// 引进全局样式
import './index.css';
// 引入字体样式
import './assets/fonts/iconfont.css'
// 引入antd-mobile
import 'antd-mobile/dist/antd-mobile.css';
// 引入App组件
import App from './App';

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
