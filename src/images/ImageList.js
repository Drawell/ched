import React from 'react'
import { List, ListItem, Typography } from '@material-ui/core'
import ImageItem from './ImageItem'

export default function ImageList({ images, isEditable, onUpdate }) {
  return (
    <>
      {images.length > 0 ? (
        <List>
          {images.map((image, idx) => (
            <ListItem key={idx} style={{ padding: '0px' }}>
              <ImageItem
                imageItem={image}
                isEditable={isEditable}
                onUpdate={onUpdate}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography style={{ marginTop: '8px' }}>
          Изображения отсутствуют
        </Typography>
      )}
    </>
  )
}
