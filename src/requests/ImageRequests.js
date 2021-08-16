import {
  tokenizedBlobMethodGet,
  tokenizedMethodGet,
  tokenizedMultipartMethodPost,
} from './TokenizedHttpMethods'

const getImagesReq = (troubleId, callback) => {
  tokenizedMethodGet('/api/trouble_images/' + troubleId, callback)
}

const uploadImageReq = (data, callback) => {
  tokenizedMultipartMethodPost('api/upload_image/', data, callback)
}

const getImagesListReq = (callback) => {
  tokenizedMethodGet('/api/get_images/', callback)
}

const getImageReq = (imageId, callback) => {
  tokenizedBlobMethodGet('/api/load_image_from_server/' + imageId, callback)
}

const deleteImageReq = (imageId, callback) => {
  tokenizedMethodGet('/api/delete_image/' + imageId, callback)
}

export {
  getImagesReq,
  uploadImageReq,
  getImagesListReq,
  getImageReq,
  deleteImageReq,
}
