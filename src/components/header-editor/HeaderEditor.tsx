import React from 'react'
import EditableTitle from './EditableTitle'
import EditableImage from './EditableImage' // import the new component

interface HeaderEditorProps {
  uploadEndPoint: string;
  title: string;
  setTitle: (title: string) => void;
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
  caption: string;
  setCaption: (caption: string) => void;
  altDescription: string;
  setAltDescription: (altDescription: string) => void;
}

const HeaderEditor = ({
  uploadEndPoint,
  title,
  setTitle,
  imageUrl,
  setImageUrl,
  caption,
  setCaption,
  altDescription,
  setAltDescription,
}: HeaderEditorProps) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <EditableTitle title={title} setTitle={setTitle} />
      <EditableImage
        url={imageUrl}
        uploadEndPoint={uploadEndPoint}
        onImageChange={(newUrl) => setImageUrl(newUrl)}
        caption={caption}
        setCaption={setCaption}
        altDescription={altDescription}
        setAltDescription={setAltDescription}
      />
    </div>
  )
}

export default HeaderEditor
