import React, { Component } from 'react'

/**
 * Required tag. All its contents are sent from the WebPOS to the Hardware Manager, and in turn to the printer.
 */
export default class output extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
