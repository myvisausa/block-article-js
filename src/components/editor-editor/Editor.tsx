import React, { useState, useEffect, useRef, useCallback } from 'react'
import HeaderEditor from '../header-editor/HeaderEditor'

// import tools for editor config
import { createEditorTools } from './tools/tools'

// create editor instance
import { createReactEditorJS } from 'react-editor-js'
import {
  json2cleanjson,
  cleanjson2md,
  md2json,
} from '../../../md-json-converter/src/index'

interface EditorEditorProps {
  data: any;
  setData: (data: any) => void;
  uploadEndPoint: string;
  textDirection?: 'ltr' | 'rtl';
}

export default function EditorEditor({
  data,
  setData,
  uploadEndPoint,
  textDirection = 'ltr',
}: EditorEditorProps) {
  const [title, setTitle] = useState(data.metadata.title)
  const [imageUrl, setImageUrl] = useState(data.metadata.ogImage)
  const [caption, setCaption] = useState(data.metadata.ogImageCaption)
  const [altDescription, setAltDescription] = useState(data.metadata.ogImageAlt)

  let initialData = json2cleanjson(data).bodyBlocks

  const editorCore = useRef<any>(null)

  const ReactEditorJS = createReactEditorJS()

  const handleInitialize = useCallback((instance: any) => {
    // await instance._editorJS.isReady;
    instance._editorJS.isReady
      .then(() => {
        // set reference to editor
        editorCore.current = instance
      })
      .catch((err: any) => console.log('An error occured', err))
  }, [])

  const handleSave = useCallback(async () => {
    // retrieve data inserted
    const savedData = await editorCore.current?.save()
    const markdown = cleanjson2md(savedData)
    const content = md2json(markdown)
    const newData = {
      ...data,
      content: content,
    }
    setData(newData)
  }, [setData])

  useEffect(() => {
    const updateData = {
      ...data,
      metadata: {
        ...data.metadata,
        title: title,
        ogImage: imageUrl,
        ogImageCaption: caption,
        ogImageAlt: altDescription,
      },
    }

    // Only update if the data has actually changed
    if (JSON.stringify(data) !== JSON.stringify(updateData)) {
      setData(updateData)
    }
  }, [title, imageUrl, caption, altDescription])

  return (
    <div className='editor-container'>
      <h4 className='edit-mode-alert'>! Edit Mode Enabled</h4>
      <HeaderEditor
        uploadEndPoint={uploadEndPoint}
        title={title}
        setTitle={setTitle}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        caption={caption}
        setCaption={setCaption}
        altDescription={altDescription}
        setAltDescription={setAltDescription}
      />
      <ReactEditorJS
        onInitialize={handleInitialize}
        tools={createEditorTools(uploadEndPoint)}
        i18n={{ direction: textDirection }}
        onChange={handleSave}
        defaultValue={initialData}
      />
    </div>
  )
}
