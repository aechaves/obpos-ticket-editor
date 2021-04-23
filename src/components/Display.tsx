import React, { Component } from 'react'
import JsxParser from 'react-jsx-parser'
import { template as compile } from 'underscore'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ReactPanZoom from "@ajainarayanan/react-pan-zoom";
import { barcode, image, line, output, text, ticket } from './ticket'
import OB from '../helpers/OB'
import { data as ticketExamples } from '../ticket-examples/ticket_example_1.json'
import ZoomController from './ZoomController';

interface DisplayProps {
  value: string
  className: string
}

interface DisplayState {
  zoom: number
}

export default class Display extends Component<DisplayProps, DisplayState> {

  constructor(props: DisplayProps) {
    super(props);
    this.state = {
      zoom: 1
    }
  }

  compileTemplate(_template: string): string {
    let template = _template.replace('<?xml version="1.0" encoding="UTF-8"?>', '')
    let compiledTemplate = compile(template)

    let result = compiledTemplate({ name: 'test', OB, ticket: ticketExamples[0] })

    return result
  }

  zoomIn = () => {
    this.setState((({ zoom }) => {
      this.setState({ zoom: zoom + 0.2 })
    }))
  }

  zoomOut = () => {
    this.setState((({ zoom }) => {
      this.setState({ zoom: zoom - 0.2 })
    }))
  }

  resetZoom = () => {
    this.setState({ zoom: 1 })
  }

  render() {
    const { className, value } = this.props
    const { zoom } = this.state
    return (
      <div className={className}>
        <div className='flex flex-grow justify-center overflow-scroll bg-gray-50'>
          <ReactPanZoom zoom={zoom}>
            <JsxParser
              showWarnings
              components={{ ticket, output, line, text, image, barcode }}
              jsx={this.compileTemplate(value)}
            />
          </ReactPanZoom>
        </div>
        <div className='absolute z-20 bottom-6'>
          <div className='flex justify-center items-center'>
            <ZoomController zoomIn={this.zoomIn} zoomOut={this.zoomOut} resetZoom={this.resetZoom} />
          </div>
        </div>
      </div>
    )
  }
}
