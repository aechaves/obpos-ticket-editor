import React, { useState } from 'react'
import Display from './components/Display'
import Editor from './components/Editor'
import Sidebar from './components/sidebar/Sidebar'
import SidebarButton from './components/sidebar/SidebarButton'
import { data as ticketStructure } from './ticket-examples/ticket_structure_example.json'

function App() {
  const [editorText, setEditorText] = useState('')

  function onChangeEditorText(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setEditorText(event.target.value)
  }

  function loadExample() {
    setEditorText(ticketStructure)
  }

  return (
    <div className='flex justify-between items-stretch'>
      <Sidebar>
        <SidebarButton onClick={loadExample}>Load Example</SidebarButton>
      </Sidebar>
      <Editor className='flex flex-grow h-screen w-1/2' value={editorText} onChange={onChangeEditorText} />
      <Display className='flex flex-grow justify-center h-screen w-1/2' value={editorText} />
    </div>
  )
}

export default App
