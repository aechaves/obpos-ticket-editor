import React from 'react'

export type TicketProps = {
  printer?: string
}

const ticket: React.FunctionComponent<TicketProps> = (props) => {
  return (
    <div>
      {props.children}
    </div>
  )
}

export default ticket;


