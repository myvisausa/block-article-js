import EditorEditor from './components/editor-editor/Editor'
import Renderer from './Renderer'

interface EditorProps {
  onDataChange: (updatedData: any) => void
  data: any
  setData: (updatedData: any) => void
  uploadEndPoint: string
  isEditMode: boolean
  tocTitle?: string
  textDirection?: 'ltr' | 'rtl'
  locale?: string
  innerStyle?: React.CSSProperties
}

const DEFAULT_INNER_STYLE = {
  marginTop: '0rem',
  maxWidth: '1000px',
  width: '100%',
}

export default function Editor({
  onDataChange,
  data,
  setData,
  uploadEndPoint,
  isEditMode,
  textDirection = 'ltr',
  locale = 'en',
  innerStyle = DEFAULT_INNER_STYLE,
}: EditorProps) {
  const handleDataChange = (updatedData: any) => {
    setData(updatedData)
    if (onDataChange) {
      onDataChange(updatedData)
    }
  }

  // Define the inline styles
  const outerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '0.25rem',
    margin: '1.5rem',
  }
  
  const otherText = {
    articleNotFound: 'Article not found',
    socialShare: 'Share this article',
    toc: 'In this article',
  }

  return (
    <div style={outerStyle}>
      <div style={innerStyle}>
        {isEditMode ? (
          <EditorEditor
            data={data}
            setData={handleDataChange}
            uploadEndPoint={uploadEndPoint}
            textDirection={textDirection}
          />
        ) : (
          <Renderer data={data} locale={locale} otherText={otherText} />
        )}
      </div>
    </div>
  )
}
