import React from 'react'
import { Grid, TextField } from '@mui/material'

interface EditableDivProps {
  label: string
  content: string
  setContent: (content: string) => void
}

const EditableDiv = ({ label, content, setContent }: EditableDivProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value)
  }

  return (
    <Grid container spacing={1} alignItems='center'>
      <Grid size={3}>
        <label>{label}</label>
      </Grid>
      <Grid size={9}>
        <TextField
          fullWidth
          multiline
          variant='outlined'
          value={content}
          onChange={handleChange}
          onBlur={() => setContent(content.trim())} // Trim content on blur if needed
        />
      </Grid>
    </Grid>
  )
}

export default EditableDiv
