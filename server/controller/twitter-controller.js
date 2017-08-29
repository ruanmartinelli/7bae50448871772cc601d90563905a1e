const catchErrrors = require('../helpers/catch-errors')
const oauthPromise = require('../helpers/oauth-promise')()
const store = require('../helpers/store')

function init (app) {
  app.post('/connect', catchErrrors(getTwitterData))
  app.get('/tweets', catchErrrors(getUserTweets))
}

async function getTwitterData (req, res, next) {
  const { screen_name: screenName } = store.getUser()
  const url = `https://api.twitter.com/1.1/users/show.json?screen_name=${screenName}`
  const result = await oauthPromise.get(url)

  res.send(result)
}

async function getUserTweets (req, res, next) {
  const TWEET_COUNT = 100
  const { screen_name: screenName } = store.getUser()
  const url = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${screenName}&count=${TWEET_COUNT}`
  const result = await oauthPromise.get(url)
  const tweets = JSON.parse(result)

  const simplifiedTweets = tweets.map(tweet => {
    return {
      tweet_id: tweet.id,
      text: tweet.text,
      created_at: tweet.created_at,
      from_user: tweet.user.screen_name
    }
  })

  res.send(simplifiedTweets)
}

module.exports = { init }
