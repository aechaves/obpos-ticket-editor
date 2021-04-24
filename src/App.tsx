import React, { useState } from 'react'
import Display from './components/Display'
import Sidebar from './components/sidebar/Sidebar'
import SidebarButton from './components/sidebar/SidebarButton'
import { data as ticketStructure } from './ticket-examples/ticket_structure_example.json'
import Editor, { EditorProps } from '@monaco-editor/react'

function App() {
  const [editorText, setEditorText] = useState('')

  const onChangeEditorText = (value: string | undefined) => {
    setEditorText(value || '')
  }

  function loadExample() {
    setEditorText(ticketStructure)
  }

  return (
    <div className='flex justify-between items-stretch'>
      <Sidebar>
        <SidebarButton onClick={loadExample}>Load Example</SidebarButton>
      </Sidebar>
      <Editor className='flex flex-grow h-screen w-1/2' defaultLanguage='xml' value={editorText} onChange={onChangeEditorText} />
      <Display className='flex flex-grow justify-center h-screen w-1/2' value={editorText} />
    </div>
  )
}

export default App
