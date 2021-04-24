import React from 'react'

export type LineProps = {
  size?: string
}

/**
 * Is defined inside a ticket element. Defines a ticket line in the receipt.
 * @param props size (unused in WebPOS?)
 */
const line: React.FunctionComponent<LineProps> = (props) => {
  return (
    props.children ? <div>{props.children}</div> : <br />
  )
}

export default line;