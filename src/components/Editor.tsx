import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

// @ts-ignore
self.MonacoEnvironment = {
  getWorker(_: any, label: string) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  }
}

interface EditorProps {
  value: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
  className: string
}

const Editor: React.FC<EditorProps> = ({ value, onChange, className }) => {
  const divEl = useRef<HTMLDivElement>(null);
  let editor: monaco.editor.IStandaloneCodeEditor;
  useEffect(() => {
    if (divEl.current) {
      editor = monaco.editor.create(divEl.current, {
        value: value,
        language: 'xml'
      });
    }
    return () => {
      editor.dispose();
    };
  }, []);
  return <div className={className} ref={divEl}></div>;
};

export default Editor