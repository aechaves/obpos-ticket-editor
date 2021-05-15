import React, { useReducer, useState } from 'react'
import Preview from './components/Preview'
import Sidebar from './components/sidebar/Sidebar'
import SidebarButton from './components/sidebar/SidebarButton'
import { tutorial } from './ticket-examples/ticket_structure_example.json'
import Editor from '@monaco-editor/react'
import Configuration from './components/configuration/Configuration'
import { DocumentTextIcon, CogIcon } from '@heroicons/react/solid'
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
      <div className='flex justify-between items-stretch'>
        <Sidebar>
          <SidebarButton onClick={showConfiguration} label='Configuration'>
            <CogIcon
              className='text-gray-400 group-hover:text-gray-300 mr-3 h-6 w-6'
              aria-hidden="true"
            />
          </SidebarButton>
          <SidebarButton onClick={loadTutorial} label='Load Tutorial'>
            <DocumentTextIcon
              className='text-gray-400 group-hover:text-gray-300 mr-3 h-6 w-6'
              aria-hidden="true"
            />
          </SidebarButton>
        </Sidebar>
        <Editor
          className='flex flex-grow h-screen w-1/2 print:hidden'
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
        <Preview className='flex flex-grow justify-center h-screen w-1/2' value={editorText} />
        <Configuration open={showConfigModal} onDismiss={saveConfig} />
      </div>
    </userContext.Provider>
  )
}

export default App
