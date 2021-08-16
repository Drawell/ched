import React, { useCallback, useEffect, useState } from 'react'
import { Button, Typography } from '@material-ui/core'
import { getImagesListReq, uploadImageReq } from '../requests/ImageRequests'
import ImageList from './ImageList'

export default function ImageLoader({}) {
  const [images, setImages] = useState([])
  const [error, setError] = useState('')

  const loadImageList = useCallback(() => {
    getImagesListReq((data) => setImages(data))
  }, [])

  const handleLoadImg = (event) => {
    if (!event.target.files[0]) return

    let formData = new FormData()
    formData.append('file', event.target.files[0])

    uploadImageReq(formData, (response) => {
      event.target.value = ''
      loadImageList()
    })
  }

  useEffect(() => loadImageList(), [loadImageList])

  const onUpdateItems = () => {
    loadImageList()
  }

  return (
    <>
      <ImageList images={images} isEditable={true} onUpdate={onUpdateItems} />
      <Typography align="center" color="error" gutterBottom>
        {error}
      </Typography>
      <input
        accept='accept="image/jpg,image/jpeg,image/png'
        id="contained-button-file"
        type="file"
        name="file"
        style={{ display: 'None' }}
        onChange={(event) => handleLoadImg(event)}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Загрузить картинку
        </Button>
      </label>
    </>
  )
}
