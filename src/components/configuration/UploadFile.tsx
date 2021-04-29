import React from 'react'

export type UploadFileProps = {
  title: string
  subtitle?: string
  hint?: string
  uploadHint?: string
}

const UploadFile: React.FC<UploadFileProps> = ({ title, subtitle, hint, uploadHint }) => {
  return (
    <div className="sm:col-span-6">
      <label className="block text-sm font-medium text-gray-700">
        {title}
      </label>
      {subtitle &&
        <p className="mt-1 text-sm text-gray-500">
          {subtitle}
        </p>
      }
      {hint &&
        <p className="mt-1 text-xs text-gray-500">
          {hint}
        </p>
      }
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <span>Upload a file</span>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          {uploadHint &&
            <p className="text-xs text-gray-500">{uploadHint}</p>
          }
        </div>
      </div>
    </div>
  )
}

export default UploadFile