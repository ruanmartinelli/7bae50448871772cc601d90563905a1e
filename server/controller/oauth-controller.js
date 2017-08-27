const catchErrrors = require('../helpers/catch-errors')
const oauthPromise = require('../helpers/oauth-promise')()
const store = require('../helpers/store')

function init(app) {
  app.get('/oauth_request', catchErrrors(requestRequestToken))
  app.get('/twitter/callback', catchErrrors(requestAccessToken))
}

async function requestRequestToken(req, res, next) {
  const {
    oauthToken,
    oauthTokenSecret
  } = await oauthPromise.getOAuthRequestToken()

  store.saveToken({
    oauthToken,
    oauthTokenSecret
  })

  res.redirect(
    302,
    `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}`
  )
}

async function requestAccessToken(req, res, next) {
  const { oauth_verifier: oauthVerifier, denied } = req.query

  if (!oauthVerifier && !denied) {
    return res.sendStatus(400)
  }

  if (denied) return res.redirect('/')

  const { oauthToken, oauthTokenSecret } = store.getToken()

  const accessToken = await oauthPromise.getOAuthAccessToken({
    oauthToken,
    oauthTokenSecret,
    oauthVerifier
  })

  let updatedToken = store.getToken()
  updatedToken.oauthAccessToken = accessToken.oauthAccessToken
  updatedToken.oauthAccessTokenSecret = accessToken.oauthAccessTokenSecret

  store.saveToken(updatedToken)
  store.saveUser(accessToken.results)

  res.redirect('/')
}

module.exports = { init }
