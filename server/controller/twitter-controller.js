const catchErrrors = require('../helpers/catch-errors')
const oauthPromise = require('../helpers/oauth-promise')()
const store = require('../helpers/store')

function init (app) {
  app.post('/connect', catchErrrors(getTwitterData))
}

async function getTwitterData (req, res, next) {
  const { screen_name: screenName } = store.getUser()
  const url = `https://api.twitter.com/1.1/users/show.json?screen_name=${screenName}`
  const result = await oauthPromise.get(url)

  res.send(result)
}

module.exports = { init }
