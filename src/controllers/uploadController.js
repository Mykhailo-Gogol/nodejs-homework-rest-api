//
const { HttpCode } = require('../helpers/constants')

const uploadController = async (req, res) => {
  res.status(HttpCode.OK).json({
    code: HttpCode.OK,
    status: 'success'
  })
}

module.exports = {
  uploadController
}
