import React from 'react'

export type DisplayProps = {
  animation: 'none' | 'flyer' | 'scroll' | 'blink' | 'curtain'
}

/**
 * Changes the customer display content.
 * @param props animation: Defines animation usedto print the text the available values are:
 * - none: Text is not animated. This is the default value.
 * - flyer: Text appears from the right.
 * - scroll: Text is scrolling in the display from right to left continuously.
 * - blink: Text blinks continuously.
 * - curtain: Text appears behind a virtual curtain.
 */
const display: React.FC<DisplayProps> = ({ animation }) => {
  // TODO support the display tag fully
  return null
}

export default display