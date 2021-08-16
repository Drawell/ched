import React, { useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  IconButton,
  Typography,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DeleteIcon from '@material-ui/icons/Delete'
import { getImageReq, deleteImageReq } from '../requests/ImageRequests'

export default function ImageItem({ imageItem, isEditable, onUpdate }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [imgSrc, setImgSrc] = useState(null)

  const handleChange = () => {
    if (!isLoaded && !isLoading) {
      setIsLoading(true)
      loadImage()
    }
  }

  const loadImage = () => {
    getImageReq(imageItem.image_id, (image) => {
      const objectURL = URL.createObjectURL(image)
      setImgSrc(objectURL)
      setIsLoaded(true)
      setIsLoading(false)
    })
  }

  const handleDelete = (event) => {
    event.stopPropagation()
    deleteImageReq(imageItem.image_id, () => onUpdate())
  }

  return (
    <Accordion style={{ width: '100%' }} onChange={handleChange}>
      <AccordionSummary
        style={{ justifyContent: 'start' }}
        expandIcon={<ExpandMoreIcon />}
      >
        {isEditable && (
          <IconButton
            style={{ padding: '0px 8px 0px 0px' }}
            onClick={(event) => handleDelete(event)}
          >
            <DeleteIcon />
          </IconButton>
        )}

        <Typography>{imageItem.image_name}</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ flexDirection: 'column' }}>
        {isLoaded && imgSrc ? (
          <img
            src={imgSrc}
            style={{ objectFit: 'scale-down' }}
            id={'img' + imageItem.image_id}
            alt="Прикрепленное изображение"
          />
        ) : (
          <CircularProgress
            style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
        )}
      </AccordionDetails>
    </Accordion>
  )
}
