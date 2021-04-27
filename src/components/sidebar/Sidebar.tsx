import React from 'react'

export type SidebarProps = {}

export default function Sidebar(props: React.PropsWithChildren<SidebarProps>) {
  return (
    <div className="flex flex-col flex-1 bg-gray-800 print:hidden">
      <div className="flex-1 flex flex-col pt-5 pb-4">
        <div className="flex items-center flex-shrink-0 group px-2 py-2 text-base font-bold rounded-md text-gray-200">
          WebPOS Ticket Editor
        </div>
        <nav className="mt-5 flex-1 px-2 bg-gray-800 space-y-1" aria-label="Sidebar">
          {props.children}
        </nav>
      </div>
    </div>
  )
}