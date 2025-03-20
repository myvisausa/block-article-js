import React, { useRef } from 'react'
import ContentEditableDiv from './ContentEditableDiv'
// Import Material-UI components
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'

const EditableImage = ({
  url,
  uploadEndPoint,
  onImageChange,
  caption,
  setCaption,
  altDescription,
  setAltDescription,
}) => {
  const fileInputRef = useRef(null)

  const uploadImage = async (file) => {
    const formData = new FormData()
    formData.append('image', file)
    try {
      const response = await fetch(uploadEndPoint, {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      if (data.success === 1) {
        onImageChange(data.file.url)
      } else {
        console.error('Failed to upload image:', data)
      }
    } catch (err) {
      console.error('Error uploading the image:', err)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      uploadImage(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      uploadImage(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current.click()
  }

  return (
    <Box className='container' style={{ maxWidth: '650px' }}>
      {url ? (
        <Box display='flex' justifyContent='center'>
          <ButtonBase
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            style={{
              display: 'flex',
              justifyContent: 'center',
              maxWidth: '100%',
              height: 'auto',
              border: '1px dashed #ccc',
              padding: '0px',
            }}
          >
            <input
              type='file'
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <img
              src={url}
              alt={altDescription}
              style={{ maxWidth: '100%', maxHeight: '300px' }}
            />
          </ButtonBase>
        </Box>
      ) : (
        <Box>
          <ButtonBase
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            style={{
              display: 'flex',
              justifyContent: 'center',
              maxWidth: '100%',
              height: 'auto',
              border: '1px dashed #ccc',
              padding: '10px',
            }}
          >
            <input
              type='file'
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <Box
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'auto',
              }}
            >
              <Typography variant='body1'>
                Click or Drag & Drop Image
              </Typography>
            </Box>
          </ButtonBase>
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
          margin: 5,
        }}
      >
        <ContentEditableDiv
          label='Caption:'
          content={caption}
          setContent={setCaption}
        />
        <ContentEditableDiv
          label='Alt description:'
          content={altDescription}
          setContent={setAltDescription}
        />
      </Box>
    </Box>
  )
}

export default EditableImage
