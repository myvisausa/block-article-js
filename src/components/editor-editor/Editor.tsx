import { useState, useEffect, useRef, useCallback } from 'react'
import HeaderEditor from '../header-editor/HeaderEditor'

// import tools for editor config
import { createEditorTools } from './tools/tools'

// create editor instance
import EditorJS from '@editorjs/editorjs'
import {
  json2cleanjson,
  cleanjson2md,
  md2json,
} from '../../../md-json-converter/src/index'

interface EditorEditorProps {
  data: any
  setData: (data: any) => void
  uploadEndPoint: string
  textDirection?: 'ltr' | 'rtl'
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
  const [editorError, setEditorError] = useState<string | null>(null)

  let initialData
  try {
    initialData = json2cleanjson(data).bodyBlocks
  } catch (error) {
    console.error('Error transforming data:', error)
    // Fallback to empty editor data
    initialData = {
      time: Date.now(),
      blocks: [],
      version: '2.28.2'
    }
    setEditorError(`Data transformation failed: ${error instanceof Error ? error.message : String(error)}`)
  }

  const editorRef = useRef<EditorJS | null>(null)
  const editorHolderId = useRef(`editor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`)

  // Initialize native EditorJS
  useEffect(() => {
    if (!editorRef.current) {
      const editorElement = document.getElementById(editorHolderId.current)
      if (editorElement) {
        try {
          editorRef.current = new EditorJS({
            holder: editorHolderId.current,
            tools: createEditorTools(uploadEndPoint),
            data: initialData,
            placeholder: 'Start writing your content...',
            onChange: async () => {
              try {
                if (editorRef.current) {
                  const savedData = await editorRef.current.save()
                  const markdown = cleanjson2md(savedData)
                  const content = md2json(markdown)
                  const newData = {
                    ...data,
                    content: content,
                  }
                  setData(newData)
                }
              } catch (error) {
                console.error('Editor save error:', error)
              }
            }
          })
        } catch (error) {
          console.error('EditorJS initialization error:', error)
          setEditorError(`Editor failed to initialize: ${error instanceof Error ? error.message : String(error)}`)
        }
      }
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy()
        editorRef.current = null
      }
    }
  }, [initialData, uploadEndPoint, data, setData])

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

  // Validate initialData format
  const isValidData = initialData && 
    typeof initialData === 'object' && 
    Array.isArray(initialData.blocks) &&
    typeof initialData.time === 'number'

  if (!isValidData) {
    console.error('Invalid initialData format:', initialData)
    return (
      <div className='editor-container'>
        <h4 className='edit-mode-alert'>! Edit Mode Enabled</h4>
        <div style={{ padding: '20px', border: '1px solid red', margin: '10px' }}>
          <h3>Editor Error</h3>
          <p>Invalid data format. Expected EditorJS format with blocks array and time.</p>
          <pre>{JSON.stringify(initialData, null, 2)}</pre>
        </div>
      </div>
    )
  }

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
      
      {editorError && (
        <div style={{ padding: '10px', backgroundColor: '#ffebee', border: '1px solid #f44336', margin: '10px' }}>
          <strong>Editor Error:</strong> {editorError}
        </div>
      )}
      
      <div 
        id={editorHolderId.current}
        style={{ 
          minHeight: '200px', 
          border: '1px solid #e0e0e0', 
          borderRadius: '4px',
          padding: '10px',
          backgroundColor: '#fff'
        }}
      />
    </div>
  )
}
