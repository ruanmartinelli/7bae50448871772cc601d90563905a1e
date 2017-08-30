const store = require('../helpers/store')

module.exports = (req, res, next) => {
  const { oauthAccessToken, oauthAccessTokenSecret } = store.getToken()

  if (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'test')
    return next()

  if (!oauthAccessToken || !oauthAccessTokenSecret) {
    return res
      .status(401)
      .send({ success: false, message: 'Please sign in firs' })
  }

  next()
}
