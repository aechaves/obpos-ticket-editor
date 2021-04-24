import React from 'react'

export type TicketProps = {
  printer?: string
}

/**
 * Prints a receipt. When this element is closed the receipt printer cuts the paper.
 * @param props printer: Defines the target printer of a ticket, by default 1. 
 */
const ticket: React.FunctionComponent<TicketProps> = (props) => {
  return (
    <div>
      {props.children}
    </div>
  )
}

export default ticket;


