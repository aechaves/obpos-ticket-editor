import React, { Component } from 'react'
import JsxParser from 'react-jsx-parser'
import { template as compile } from 'underscore'
import { barcode, image, line, output, text, ticket } from './ticket'
import OB from '../helpers/OB'
import './Display.css'
import { data as ticketExamples } from '../ticket-examples/ticket_example_1.json'

interface DisplayProps {
  value: string
  className: string
}

interface DisplayState { }

export default class Display extends Component<DisplayProps, DisplayState> {

  constructor(props: DisplayProps) {
    super(props);
  }

  compileTemplate(_template: string): string {
    let template = _template.replace('<?xml version="1.0" encoding="UTF-8"?>', '')
    let compiledTemplate = compile(template)
    console.log(ticketExamples[0].documentNo);

    let result = compiledTemplate({ name: 'test', OB, ticket: ticketExamples[0] })

    return result
  }

  render() {
    const { className, value } = this.props;
    return (
      <div className={className}>
        <div className='displayContent'>
          <JsxParser
            showWarnings
            components={{ ticket, output, line, text, image, barcode }}
            jsx={this.compileTemplate(value)}
          />
        </div>
      </div>
    )
  }
}
