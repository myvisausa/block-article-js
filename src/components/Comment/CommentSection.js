import React, { useState, useEffect } from 'react'
import styles from './CommentSection.module.css'
import EditNoteIcon from '@mui/icons-material/EditNote'
import DeleteIcon from '@mui/icons-material/Delete'
import { Modal, Button, Form } from 'react-bootstrap'
import Link from 'next/link'

const CommentSection = ({ articleId, otherText }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [editIndex, setEditIndex] = useState(null)
  const [editText, setEditText] = useState('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const storedComments =
      JSON.parse(localStorage.getItem(`comments-${articleId}`)) || []
    setComments(storedComments)
  }, [articleId])

  const handleAddComment = () => {
    const updatedComments = [
      ...comments,
      { text: newComment, date: new Date().toISOString() },
    ]
    setComments(updatedComments)
    localStorage.setItem(
      `comments-${articleId}`,
      JSON.stringify(updatedComments),
    )
    setNewComment('')
  }

  const handleEditComment = () => {
    const updatedComments = [...comments]
    updatedComments[editIndex].text = editText
    setComments(updatedComments)
    localStorage.setItem(
      `comments-${articleId}`,
      JSON.stringify(updatedComments),
    )
    handleCloseModal()
  }

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index)
    setComments(updatedComments)
    localStorage.setItem(
      `comments-${articleId}`,
      JSON.stringify(updatedComments),
    )
  }

  const openEditModal = (index, text) => {
    setEditIndex(index)
    setEditText(text)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditIndex(null)
    setEditText('')
  }

  return (
    <>
      <h3 className='mb-0'>{otherText.commentsHeader}</h3>
      <div className={styles.commentSection}>
        <div className={`${styles.overlay}`}>
          <h2 className={styles.overlayText}>{otherText.overlayText}</h2>
          <Link href='/auth/sign-up' className={styles.startBtn}>
            {otherText.startHere}
          </Link>
        </div>
        <div className={styles.commentsList}>
          {comments.map((comment, index) => (
            <div key={index} className={styles.comment}>
              <div className={styles.commentText}>
                <div className={styles.commentHeader}>
                  <span className='time'>
                    {new Date(comment.date).toLocaleString()}
                  </span>
                </div>
                <div className={styles.titleSection}>
                  <p className={styles.textTitle}>{comment.text}</p>
                  <div className='d-flex gap-2'>
                    <EditNoteIcon
                      onClick={() => openEditModal(index, comment.text)}
                    />
                    <DeleteIcon onClick={() => handleDeleteComment(index)} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.addComment}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={otherText.addCommentPlaceholder}
          />
          <button className={styles.submitBtn} onClick={handleAddComment}>
            {otherText.submitButton}
          </button>
        </div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{otherText.editCommentTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Control
                  as='textarea'
                  rows={3}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <button className={styles.cancelBtn} onClick={handleCloseModal}>
              {otherText.cancelButton}
            </button>
            <button className={styles.saveChanges} onClick={handleEditComment}>
              {otherText.saveChangesButton}
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default CommentSection
