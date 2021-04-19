import React, { useState } from 'react'
import './App.css'
import Display from './components/Display'
import Editor from './components/Editor'
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
    <div className='splitContainer'>
      <div>
        <button onClick={loadExample}>Load Example</button>
      </div>
      <Editor className='splitItemLeft' value={editorText} onChange={onChangeEditorText} />
      <Display className='splitItemRight' value={editorText} />
    </div>
  )
}

export default App
