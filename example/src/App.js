import React from 'react'

import { Editor } from 'block-article-js'
import 'block-article-js/dist/index.css'

const mockProps = {
  "onDataChange": () => {},
  "data": { },
  "setData": () => {},
  "uploadEndPoint": "http://localhost:3000/upload",
  "isEditMode": true,
}

const App = () => {
  return <Editor onDataChange={mockProps.onDataChange} data={mockProps.data} setData={mockProps.setData} uploadEndPoint={mockProps.uploadEndPoint} isEditMode={mockProps.isEditMode} />
}

export default App
