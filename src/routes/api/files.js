const express = require('express')
const router = express.Router()
const path = require('path')
const { uploadController } = require('../../controllers/uploadController')
const { asyncWrapper } = require('../../helpers/apiHelpers')

const multer = require('multer')
// const { v4: uuidv4 } = require('uuid')

const FILE_DIR = path.resolve('./static/avatars')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILE_DIR)
  },
  filename: (req, file, cb) => {
    // imgage.png
    const [name, extension] = file.originalname.split('.')

    cb(null, `${name}.${extension}`)
  }
})

const uploadMiddleware = multer({ storage })

// post api/files/upload
// content-type: multipart/form-data
router.post(
  '/upload',
  uploadMiddleware.single('avatar'),
  asyncWrapper(uploadController)
)

router.use('/download', express.static(FILE_DIR))

module.exports = router
