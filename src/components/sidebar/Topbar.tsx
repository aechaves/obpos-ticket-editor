import React from 'react'

export type TopbarProps = {}

export default function Topbar(props: React.PropsWithChildren<TopbarProps>) {
  return (
    <div className="flex flex-col bg-gray-800 print:hidden">
      <div className="flex-1 flex flex-row">
        <div className="flex items-center flex-shrink-0 group px-2 pb-4 pt-4 text-base font-bold rounded-md text-gray-200">
          WebPOS Ticket Editor
        </div>
        <nav className="flex space-x-4 flex-1 flex-row px-2 py-2 bg-gray-800" aria-label="Sidebar">
          {props.children}
        </nav>
      </div>
    </div>
  )
}