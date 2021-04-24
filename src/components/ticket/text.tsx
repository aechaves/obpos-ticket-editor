import React from 'react'

export type TextProps = {
  size?: string
  align?: 'left' | 'right' | 'center'
  length?: string
  bold?: boolean
  underline?: boolean
  children?: JSX.Element
}

export default function text({ size, align, bold, underline, length, children }: TextProps) {
  /* 
  text attribute, size: Defines the font size used, by Default is 0, the avalable values are:
    0: Normal size
    1: Double height
    2: Double width
    3: Double height, double width  
  */
  function getTransform(size: string) {
    switch (size) {
      case '0':
        return 'transform-none'
      case '1':
        return 'transform scale-y-150'
      case '2':
        return 'transform scale-x-150'
      case '3':
        return 'transform scale-150'
      default:
        return 'transform-none'
    }
  }

  // length defines the text max size
  const maxLength: number = length ? parseInt(length) : children?.props.children.length
  const content: string = children ? children?.props.children : ''
  const transformClass = getTransform(size || '0')
  return (
    <p className={transformClass} style={{ textAlign: align, fontWeight: bold ? 'bold' : 'normal', textDecoration: underline ? 'underline' : 'none' }}>
      {content.trim().substring(0, maxLength)}
    </p>
  )
}


