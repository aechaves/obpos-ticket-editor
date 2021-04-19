import React from 'react'

export type LineProps = {
  size?: string
}

const line: React.FunctionComponent<LineProps> = (props) => {
  return (
    props.children ? <div>{props.children}</div> : <br />
  )
}

export default line;