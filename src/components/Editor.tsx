import React, { Component } from 'react'

interface EditorProps {
  value: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
  className: string
}

interface EditorState { }

export default class Editor extends Component<EditorProps, EditorState> {

  constructor(props: EditorProps) {
    super(props);
  }

  render() {
    const { className, value, onChange } = this.props;
    return (
      <div className={className}>
        <textarea className='w-full h-full bg-gray-100 px-2 shadow-sm block focus:outline-none border-gray-300 rounded-md' value={value} onChange={onChange} />
      </div>
    )
  }
}
