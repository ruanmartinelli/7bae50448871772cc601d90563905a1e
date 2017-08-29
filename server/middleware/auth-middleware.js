const store = require('../helpers/store')

module.exports = (req, res, next) => {
  const { oauthAccessToken, oauthAccessTokenSecret } = store.getToken()

  if (!oauthAccessToken || !oauthAccessTokenSecret) {
    return res
      .send({ success: false, message: 'Please sign in firs' })
      .status(401)
  }

  next()
}
