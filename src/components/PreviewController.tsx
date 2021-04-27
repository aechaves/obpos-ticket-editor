import React from 'react'
import { ZoomInIcon, ZoomOutIcon, XCircleIcon, PrinterIcon } from '@heroicons/react/solid'

export type PreviewControllerProps = {
  zoomIn: () => void
  zoomOut: () => void
  resetZoom: () => void
  print: () => void
}

const PreviewController: React.FunctionComponent<PreviewControllerProps> = (props) => {

  return (
    <div className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Preview Controls">
      <button
        onClick={props.zoomIn}
        className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <ZoomInIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        onClick={props.zoomOut}
        className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <ZoomOutIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        onClick={props.resetZoom}
        className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <XCircleIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        onClick={props.print}
        className="relative inline-flex items-center px-4  py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <PrinterIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  )
}

export default PreviewController