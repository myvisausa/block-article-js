import React from 'react'
import EditableTitle from './EditableTitle'
import EditableImage from './EditableImage' // import the new component

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
}) => {
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
