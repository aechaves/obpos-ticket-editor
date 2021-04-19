import React, { Component } from 'react'
import './ticketStyles.css';

export default class output extends Component {
  render() {
    return (
      <div className='output'>
        {this.props.children}
      </div>
    )
  }
}
