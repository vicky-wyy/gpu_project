import React, { Component } from 'react'
import './index.less'
export default class Loading extends Component {
  render() {
    const { className = '', style = {} } = this.props
    return (
        <div id="my-loading" className={className} style={style}>
            <div className="loader"></div>
            <div className="shadow"></div>
        </div>
    )
  }
}
