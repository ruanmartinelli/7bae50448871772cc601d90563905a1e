const {
  OAUTH_REQUEST_URL,
  OAUTH_ACCESS_URL,
  OAUTH_CONSUMER_KEY,
  OAUTH_CONSUMER_SECRET,
  OAUTH_VERSION,
  OAUTH_AUTHORIZE_CALLBACK,
  OAUTH_SIGNATURE_METHOD
} = process.env

const OAuth = require('oauth').OAuth
const store = require('./store')

module.exports = () => {
  const oauth = new OAuth(
    OAUTH_REQUEST_URL,
    OAUTH_ACCESS_URL,
    OAUTH_CONSUMER_KEY,
    OAUTH_CONSUMER_SECRET,
    OAUTH_VERSION,
    OAUTH_AUTHORIZE_CALLBACK,
    OAUTH_SIGNATURE_METHOD
  )

  function getOAuthAccessToken ({
    oauthToken,
    oauthTokenSecret,
    oauthVerifier
  }) {
    return new Promise((resolve, reject) => {
      oauth.getOAuthAccessToken(
        oauthToken,
        oauthTokenSecret,
        oauthVerifier,
        (err, oauthAccessToken, oauthAccessTokenSecret, results) => {
          if (err) return reject(err)
          resolve({ oauthAccessToken, oauthAccessTokenSecret, results })
        }
      )
    })
  }

  function getOAuthRequestToken () {
    return new Promise((resolve, reject) => {
      oauth.getOAuthRequestToken(
        (err, oauthToken, oauthTokenSecret, results) => {
          if (err) return reject(err)

          resolve({
            oauthToken,
            oauthTokenSecret,
            results
          })
        }
      )
    })
  }

  function get (url) {
    const { oauthAccessToken, oauthAccessTokenSecret } = store.getToken()

    return new Promise((resolve, reject) => {
      oauth.get(
        url,
        oauthAccessToken,
        oauthAccessTokenSecret,
        (err, data, res) => {
          if (err) return reject(err)
          resolve(data)
        }
      )
    })
  }

  function post (url, body = {}) {
    const { oauthAccessToken, oauthAccessTokenSecret } = store.getToken()

    return new Promise((resolve, reject) => {
      oauth.post(
        url,
        oauthAccessToken,
        oauthAccessTokenSecret,
        body,
        (err, data, res) => {
          if (err) return reject(err)
          resolve(data)
        }
      )
    })
  }

  return {
    getOAuthRequestToken,
    getOAuthAccessToken,
    get,
    post
  }
}
