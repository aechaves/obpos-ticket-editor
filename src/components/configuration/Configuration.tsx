import { Dialog, Transition } from '@headlessui/react'
import { CogIcon } from '@heroicons/react/solid'
import React, { Fragment, useContext, useRef } from 'react'
import Toggle from './Toggle'
import UploadFile from './UploadFile'
import { userContext } from '../../helpers/userContext';

export type ConfigurationProps = {
  open: boolean
  onDismiss: () => void
}

const Configuration: React.FC<ConfigurationProps> = ({ open, onDismiss }) => {
  const cancelButtonRef = useRef(null)
  const { configuration, dispatchUserConfiguration } = useContext(userContext)

  const loadLabels = (fileName: string, contents: string) => {
    const parser = new DOMParser();
    const xmlLabels = parser.parseFromString(contents, 'application/xml');
    const labels: Record<string, string> = {}
    if (xmlLabels.documentElement.nodeName == 'parseerror') {
      // TODO, show message to the user and do not load the file.
      console.error('error while parsing message labels. Is your XML file well formed?')
    } else {
      for (const xmlLabel of xmlLabels.getElementsByTagName('AD_MESSAGE')) {
        const messageLabel = xmlLabel.getElementsByTagName('VALUE')[0].textContent || ''
        const messageContent = xmlLabel.getElementsByTagName('MSGTEXT')[0].textContent || ''
        labels[messageLabel] = messageContent
      }
      dispatchUserConfiguration({ property: 'messageLabels', value: labels })
      dispatchUserConfiguration({ property: 'messageFilename', value: fileName })
    }
  }
  // TODO preserve the loaded file name and show it, in UploadFile component

  return (
    <Transition.Root show={!!open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-scroll"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={onDismiss}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
                  <CogIcon className="h-6 w-6 text-gray-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Configuration
                          </Dialog.Title>
                  <div className="mt-2">
                    {/* Configuration Form */}
                    <form className="space-y-8 divide-y divide-gray-200">
                      <div className="space-y-8 divide-y divide-gray-200">
                        <div>
                          <div>
                            <p className="mt-1 text-sm text-gray-500">
                              Configure the WebPOS Ticket Editor
                                    </p>
                          </div>

                          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            {/* Monaco config section */}
                            <div className="sm:col-span-6">
                              <label className="block text-sm font-medium text-gray-700">
                                Monaco settings
                                      </label>
                            </div>
                            {/* Dark/Light theme */}
                            <div className="sm:col-span-6">
                              <Toggle
                                label={`Theme: ${configuration.monacoThemeLight ? 'Light' : 'Dark'}`}
                                enabled={configuration.monacoThemeLight}
                                onChange={() => dispatchUserConfiguration({ property: 'monacoThemeLight', value: !configuration.monacoThemeLight })}
                              />
                            </div>
                            {/* Minimap enable/disable */}
                            <div className="sm:col-span-6">
                              <Toggle
                                label='Enable Minimap'
                                enabled={configuration.monacoMinimap}
                                onChange={() => dispatchUserConfiguration({ property: 'monacoMinimap', value: !configuration.monacoMinimap })}
                              />
                            </div>
                            {/* lineNumbers enable/disable */}
                            <div className="sm:col-span-6">
                              <Toggle
                                label='Enable Line Numbers'
                                enabled={configuration.monacoLineNumbers}
                                onChange={() => dispatchUserConfiguration({ property: 'monacoLineNumbers', value: !configuration.monacoLineNumbers })}
                              />
                            </div>
                            {/* Message Labels */}
                            <UploadFile
                              title='Message Labels'
                              subtitle="Upload Openbravo' s WebPOS label strings."
                              hint='(org.openbravo.retail.posterminal)'
                              uploadHint='AD_MESSAGE.XML'
                              fileName={configuration.messageFilename}
                              onLoadFile={loadLabels}
                            />
                            {/* Translation Labels */}
                            <UploadFile
                              title='Message Translations'
                              subtitle="Upload Openbravo's WebPOS translation strings."
                              hint='(org.openbravo.retail.posterminal.lang_LANG)'
                              uploadHint='AD_MESSAGE_TRL.xml'
                            />
                            {/* Ticket sample JSON */}
                            <UploadFile
                              title='Ticket Data'
                              subtitle="Upload the ticket's data as a JSON file."
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                    {/* Configuration Form End */}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  ref={cancelButtonRef}
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={onDismiss}
                >
                  Dismiss
                        </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Configuration