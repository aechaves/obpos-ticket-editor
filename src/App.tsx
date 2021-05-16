import React, { useReducer, useState } from 'react'
import Preview from './components/Preview'
import Topbar from './components/sidebar/Topbar'
import TopbarButton from './components/sidebar/TopbarButton'
import { tutorial } from './ticket-examples/ticket_structure_example.json'
import Editor from '@monaco-editor/react'
import Configuration from './components/configuration/Configuration'
import { DocumentTextIcon, CogIcon, ExclamationCircleIcon } from '@heroicons/react/solid'
import { UserConfiguration, ConfigurationDispatch, userContext, defaultConfiguration, loadFromStorage, saveToStorage } from './helpers/userContext';

function App() {
  const previousText = localStorage.getItem('editorText')
  const [editorText, setEditorText] = useState(previousText || tutorial)
  const [showConfigModal, setShowConfigModal] = useState(false)

  const updateConfiguration = (previous: UserConfiguration, action: ConfigurationDispatch) => {
    return { ...previous, [action.property]: action.value }
  }

  const [userConfiguration, dispatchUserConfiguration] = useReducer(updateConfiguration, defaultConfiguration, loadFromStorage)

  const onChangeEditorText = (value: string | undefined) => {
    setEditorText(value || '')
    localStorage.setItem('editorText', value || '')
  }

  const loadTutorial = () => {
    setEditorText(tutorial)
  }

  const showConfiguration = () => {
    setShowConfigModal(true)
  }

  const saveConfig = () => {
    saveToStorage(userConfiguration)
    setShowConfigModal(false)
  }

  return (
    <userContext.Provider value={{ configuration: userConfiguration, dispatchUserConfiguration }}>
      <div className='flex flex-col h-screen'>
        <Topbar>
          <TopbarButton onClick={showConfiguration} label='Configuration'>
            <CogIcon
              className='text-gray-400 group-hover:text-gray-300 mr-3 h-6 w-6'
              aria-hidden="true"
            />
          </TopbarButton>
          <TopbarButton onClick={loadTutorial} label='Load Tutorial'>
            <DocumentTextIcon
              className='text-gray-400 group-hover:text-gray-300 mr-3 h-6 w-6'
              aria-hidden="true"
            />
          </TopbarButton>
          <div className='flex flex-grow'>
            {/* Spacer */}
          </div>
          <TopbarButton
            link
            href={'https://github.com/aechaves/obpos-ticket-editor/issues'}
          >
            <ExclamationCircleIcon
              className='text-gray-400 group-hover:text-gray-300 h-6 w-6'
              aria-hidden="true"
            />
          </TopbarButton>
        </Topbar>
        <div className='flex flex-grow justify-between items-stretch overflow-scroll'>
          <div className='flex flex-grow print:hidden'>
            <Editor
              defaultLanguage='xml'
              theme={userConfiguration.monacoThemeLight ? 'light' : 'vs-dark'}
              options={{
                minimap: {
                  enabled: userConfiguration.monacoMinimap,
                },
                lineNumbers: userConfiguration.monacoLineNumbers,
              }}
              value={editorText}
              onChange={onChangeEditorText}
            />
          </div>
          <Preview className='flex justify-center w-1/4' value={editorText} />
          <Configuration open={showConfigModal} onDismiss={saveConfig} />
        </div>
      </div>
    </userContext.Provider>
  )
}

export default App
