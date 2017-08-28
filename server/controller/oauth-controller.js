const catchErrrors = require('../helpers/catch-errors')
const oauthPromise = require('../helpers/oauth-promise')()
const store = require('../helpers/store')

function init (app) {
  app.get('/oauth_request', catchErrrors(requestRequestToken))
  app.get('/twitter/callback', catchErrrors(requestAccessToken))
  app.post('/disconnect', catchErrrors(revokeAccess))
}

async function requestRequestToken (req, res, next) {
  const user = store.getUser()

  const {
    oauthToken,
    oauthTokenSecret
  } = await oauthPromise.getOAuthRequestToken()

  store.saveToken({
    oauthToken,
    oauthTokenSecret
  })

  let authUrl = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}`

  if (user.revoked) {
    authUrl += `&force_login=true`
  }

  res.redirect(302, authUrl)
}

async function requestAccessToken (req, res, next) {
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

async function revokeAccess (req, res, next) {
  const user = store.getUser()

  user.revoked = true

  store.saveUser(user)
  store.saveToken({})

  res.send({
    success: true,
    twitter_id: user.user_id
  })
}

module.exports = { init }
