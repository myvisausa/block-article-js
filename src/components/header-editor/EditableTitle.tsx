import { useRef, useEffect } from 'react'

interface EditableTitleProps {
  title: string
  setTitle: (title: string) => void
}

const EditableTitle = ({ title, setTitle }: EditableTitleProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null)

  const handleBlur = () => {
    if (titleRef.current) {
      setTitle(titleRef.current.innerText)
    }
  }

  useEffect(() => {
    const el = titleRef.current
    if (el) {
      const range = document.createRange()
      const sel = window.getSelection()
      range.setStart(el.childNodes[0], title.length)
      range.collapse(true)
      if (sel) {
        sel.removeAllRanges()
        sel.addRange(range)
      }
    }
  }, [title])

  return (
    <h1
      ref={titleRef}
      contentEditable
      onBlur={handleBlur}
      suppressContentEditableWarning={true}
      style={{
        cursor: 'text',
        outline: 'none',
        border: 'none',
        padding: '4px',
      }}
      onFocus={() => {
        if (titleRef.current) {
          titleRef.current.style.border = '1px dashed #ccc'
        }
      }}
    >
      {title}
    </h1>
  )
}

export default EditableTitle
