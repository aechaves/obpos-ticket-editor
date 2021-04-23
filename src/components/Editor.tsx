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
        <textarea className='w-full h-full bg-yellow-300' value={value} onChange={onChange} />
      </div>
    )
  }
}
