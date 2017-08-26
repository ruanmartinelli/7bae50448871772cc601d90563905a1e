const catchErrrors = require('../helpers/catch-errors')
const oauthPromise = require('../helpers/oauth-promise')()

let temp = {}

function init (app) {
  app.get('/oauth_request', catchErrrors(requestRequestToken))
  app.get('/twitter/callback', catchErrrors(requestAccessToken))
}

async function requestRequestToken (req, res, next) {
  const {
    oauthToken,
    oauthTokenSecret
  } = await oauthPromise.getOAuthRequestToken()

  temp = {
    oauthToken,
    oauthTokenSecret
  }

  res.redirect(
    302,
    `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}`
  )
}

async function requestAccessToken (req, res, next) {
  const { oauth_verifier: oauthVerifier, denied } = req.query

  if (!oauthVerifier && !denied) {
    return res.sendStatus(400)
  }

  if (denied) return res.redirect('/')

  const { oauthToken, oauthTokenSecret } = temp

  // const accessToken =
  await oauthPromise.getOAuthAccessToken({
    oauthToken,
    oauthTokenSecret,
    oauthVerifier
  })

  temp = {}

  res.redirect('/')
}

module.exports = { init }
