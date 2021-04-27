import React from 'react'
import line from './line'

export type DisplayProps = {
  animation?: 'none' | 'flyer' | 'scroll' | 'blink' | 'curtain'
  children?: typeof line
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
const display: React.FC<DisplayProps> = ({ animation, children }) => {
  // TODO support the animation prop
  return (
    <div className='bg-black text-white border-4 border-gray-400 mt-2 text-center'>
      {children}
    </div>
  )
}

export default display