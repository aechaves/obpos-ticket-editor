import React from 'react'

export type TopbarButtonProps = {
  onClick: () => void
  label: string
}

const TopbarButton: React.FC<TopbarButtonProps> = ({ label, onClick, children }) => {
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

export default TopbarButton