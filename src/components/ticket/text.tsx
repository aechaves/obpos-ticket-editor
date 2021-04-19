import React from 'react'

export type TextProps = {
  size?: string
  align?: 'left' | 'right' | 'center'
  length?: string
  bold?: boolean
  underline?: boolean
}

const text: React.FunctionComponent<TextProps> = ({ size, align, bold, underline, length, children }) => {
  // TODO size:
  /* 
  text attribute, size: Defines the font size used, by Default is 0, the avalable values are:
    0: Normal size
    1: Double height
    2: Double width
    3: Double height, double width  
  */

  // TODO length defines the string max size, use a string type children prop
  return (
    <p style={{ textAlign: align, fontWeight: bold ? 'bold' : 'normal', textDecoration: underline ? 'underline' : 'none' }}>
      {children}
    </p>
  )
}

text.propTypes = {

}

export default text
