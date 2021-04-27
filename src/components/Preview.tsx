import React, { Component } from 'react'
import JsxParser from 'react-jsx-parser'
import { template as compile } from 'underscore'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ReactPanZoom from "@ajainarayanan/react-pan-zoom";
import { barcode, display, image, line, output, text, ticket } from './ticket'
import OB from '../helpers/OB'
import { data as ticketExamples } from '../ticket-examples/ticket_example_1.json'
import ZoomController from './ZoomController';
import PreviewError from './PreviewError';

interface PreviewProps {
  value: string
  className: string
}

interface PreviewState {
  zoom: number
  error?: Error
}

export default class Preview extends Component<PreviewProps, PreviewState> {

  constructor(props: PreviewProps) {
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

  onJSXError = (error: Error) => {
    this.setState({ error })
  }

  render() {
    const { className, value } = this.props
    const { zoom, error } = this.state
    return (
      <div className={className}>
        <div className='flex flex-grow justify-center overflow-scroll bg-gray-50 print:absolute print:inset-0 print:overflow-visible'>
          {error ?
            <PreviewError title={error.name} message={error.message} />
            :
            <ReactPanZoom zoom={zoom}>
              <JsxParser
                showWarnings
                componentsOnly
                components={{ ticket, output, line, text, image, barcode, display }}
                jsx={this.compileTemplate(value)}
                onError={this.onJSXError}
              />
            </ReactPanZoom>
          }
        </div>
        <div className='absolute z-20 bottom-6 print:hidden'>
          <div className='flex justify-center items-center'>
            <ZoomController zoomIn={this.zoomIn} zoomOut={this.zoomOut} resetZoom={this.resetZoom} />
          </div>
        </div>
      </div>
    )
  }
}
