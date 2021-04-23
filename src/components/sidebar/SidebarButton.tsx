import React from 'react'
import { DocumentTextIcon } from '@heroicons/react/solid'

export type SidebarButtonProps = {
  onClick: () => void
}

export default function SidebarButton(props: React.PropsWithChildren<SidebarButtonProps>) {
  return (
    <button
      onClick={props.onClick}
      className='group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white'
    >
      <DocumentTextIcon
        className='text-gray-400 group-hover:text-gray-300 mr-3 h-6 w-6'
        aria-hidden="true"
      />
      {props.children}
    </button>
  )
}