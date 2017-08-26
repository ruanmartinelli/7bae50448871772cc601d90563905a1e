require('dotenv').config()

const test = require('ava')
const request = require('axios')
const app = require('../server')
const BASE_URL = 'http://localhost'

test.before(() => {
  app.listen()
  request.defaults.baseURL = `${BASE_URL}:${process.env.APP_PORT}/`
})

test('GET /oauth_request should redirect with 302', async t => {
  try {
    await request.get('/oauth_request', { maxRedirects: 0 })
    t.fail()
  } catch (err) {
    t.is(err.response.status, 302)
  }
})

test('GET /oauth_request should redirect to Twitter', async t => {
  const response = await request.get('/oauth_request', { maxRedirects: 1 })

  const twitterUrl = 'https://api.twitter.com/oauth/authenticate'

  t.true(response.request.res.responseUrl.includes(twitterUrl))
  t.is(response.status, 200)
})

test('GET /twitter/callback should check for QS parameters', async t => {
  try {
    await request.get('/twitter/callback', { maxRedirects: 0 })
    t.fail()
  } catch (err) {
    t.is(err.response.status, 400)
  }
})
