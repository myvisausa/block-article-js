import React from 'react'
import { Grid, TextField } from '@mui/material'

const EditableDiv = ({ label, content, setContent }) => {
  const handleChange = (event) => {
    setContent(event.target.value)
  }

  return (
    <Grid container alignItems='center' spacing={1}>
      <Grid item xs={3}>
        <label>{label}</label>
      </Grid>
      <Grid item xs={9}>
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
