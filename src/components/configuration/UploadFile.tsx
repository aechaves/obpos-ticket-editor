import React, { useState } from 'react'

export type UploadFileProps = {
  title: string
  subtitle?: string
  hint?: string
  uploadHint?: string
  onLoadFile?: (file: string) => void
  onRemoveFile?: () => void
}

const STATUS = {
  initial: 'initial',
  loading: 'loading',
  loaded: 'loaded'
}

const UploadFile: React.FC<UploadFileProps> = ({ title, subtitle, hint, uploadHint, onLoadFile, onRemoveFile }) => {
  const key = title.toLowerCase().replaceAll(' ', '-')
  const [status, setStatus] = useState(STATUS.initial)
  const [fileName, setFileName] = useState('')

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0)
    if (file && onLoadFile) {
      setStatus(STATUS.loading)

      file
        .text()
        .then(text => {
          onLoadFile(text)
          setStatus(STATUS.loaded)
          setFileName(file.name)
        })
    }
  }

  const removeFile = () => {
    setFileName('')
    setStatus(STATUS.initial)
    if (onRemoveFile) {
      onRemoveFile()
    }
  }

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
        {
          status === STATUS.loading &&
          <div className="space-y-1 text-center">
            <div className="flex text-sm text-gray-600">
              <p
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                Loading...
                </p>
            </div>
          </div>
        }
        {
          status === STATUS.initial &&
          <div className="space-y-1 text-center">
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor={`file-upload-${key}`}
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload a file</span>
                <input id={`file-upload-${key}`} name={`file-upload-${key}`} type="file" className="sr-only" onChange={onChangeInput} />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            {uploadHint &&
              <p className="text-xs text-gray-500">{uploadHint}</p>
            }
          </div>
        }
        {
          status === STATUS.loaded &&
          <div className="space-y-1 text-center">
            <div className="flex text-sm text-gray-600">
              <span className="pl-1 font-medium">{fileName}</span>
            </div>
            <a
              onClick={removeFile}
              className="relative cursor-pointer bg-white text-sm rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              Remove
              </a>
          </div>
        }
      </div>
    </div>
  )
}

export default UploadFile