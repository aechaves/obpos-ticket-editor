import React, { Component } from 'react'
import JsxParser from 'react-jsx-parser'
import _, { template as compile } from 'underscore'
import ReactPanZoom from "@ajainarayanan/react-pan-zoom";
import { barcode, display, image, line, output, text, ticket } from './ticket'
import Utilities from '../helpers/Utilities'
import PreviewController from './PreviewController';
import PreviewError from './PreviewError';
import { userContext } from '../helpers/userContext';
import Order from '../helpers/Order'

interface PreviewProps {
  value: string
  className: string
}

interface PreviewState {
  compiledTemplate: string
  zoom: number
  error?: Error
}

export default class Preview extends Component<PreviewProps, PreviewState> {

  constructor(props: PreviewProps) {
    super(props);
    this.state = {
      zoom: 1,
      compiledTemplate: ''
    }
  }

  updatePreview = () => {
    let capturedError = undefined
    let compiledTemplate = this.state.compiledTemplate
    try {
      compiledTemplate = this.compileTemplate(this.props.value)
    } catch (error) {
      capturedError = error
      console.error(error)
    }

    this.setState({ error: capturedError, compiledTemplate })
  }

  componentDidMount() {
    this.updatePreview()
  }

  componentDidUpdate(previousProps: PreviewProps) {
    if (previousProps.value != this.props.value) {
      this.updatePreview()
    }
  }

  compileTemplate = (_template: string): string => {
    let result = ''
    // The first replace removes the comments, and then the other removes the xml header
    let template = _template.replace(/<!--[\s\S]*?-->/g, '').replace(/<\?[\s\S]*?\?>/, '')
    let compiledTemplate = compile(template)

    const ticketData = this.context.configuration.ticketData
    let ticket
    if (ticketData && ticketData.data) {
      ticket = ticketData.data.length > 0 ? ticketData.data[0] : ticketData.data
    } else {
      ticket = ticketData
    }

    const order = new Order(ticket)
    result = compiledTemplate({ OB: Utilities, ticket: order, order, _ })

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

  print = () => {
    this.setState({ zoom: 1 }, () => window.print())
  }

  render() {
    const { className, value } = this.props
    const { compiledTemplate, zoom, error } = this.state
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
                jsx={compiledTemplate}
                onError={this.onJSXError}
              />
            </ReactPanZoom>
          }
        </div>
        <div className='absolute z-20 bottom-6 print:hidden'>
          <div className='flex justify-center items-center'>
            <PreviewController zoomIn={this.zoomIn} zoomOut={this.zoomOut} resetZoom={this.resetZoom} print={this.print} />
          </div>
        </div>
      </div>
    )
  }
}

Preview.contextType = userContext
