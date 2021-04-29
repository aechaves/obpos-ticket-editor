import React from 'react'

export type SidebarButtonProps = {
  onClick: () => void
  label: string
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ label, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className='group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white'
    >
      {children}
      {label}
    </button>
  )
}

export default SidebarButton