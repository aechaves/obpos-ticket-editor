import React from 'react'
import ticketImage from '../../ticket-image.png'
import './ticketStyles.css'

export type ImageProps = {
  type?: 'default' | 'url' | 'file' | 'classpath'
  /*
  default: The image is a file located in the img/ folder of the hardware manager installation
  url: The image is an URL.
  file: The image is a file located in the file system.
  classpath: The image is located in the java classpath.
  */
}

/**
 * Is defined inside a line element. Is used to print an image into a ticket. The image is converted to B/W before sending it to the printer.
 * @param props 
 * type: Defines where the image type. Possible values are: \
 * default: The image is a file located in the img/ folder of the hardware manager installation \
 * url: The image is an URL. \
 * file: The image is a file located in the file system. \
 * classpath: The image is located in the java classpath.
 */
const image: React.FunctionComponent<ImageProps> = (props) => {
  // TODO handle type?
  return (
    <div>
      <img className='image' src={ticketImage} alt='ticket-image' />
    </div>
  )
}

export default image;


