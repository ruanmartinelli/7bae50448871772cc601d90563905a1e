require('dotenv').config()

const _ = require('lodash')
const test = require('ava')
const request = require('axios')
const app = require('../server')
const store = require('../server/helpers/store')
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

test('POST /connect should return Twitter information', async t => {
  const response = await request.post('/connect')

  t.is(response.status, 200)
  t.is(_.isNil(response.data.id), false)
  t.is(_.isNil(response.data.name), false)
})

test('POST /disconnect should clean tokens & return twitter id', async t => {
  store.saveToken({
    oauthToken: '8888&&8',
    oauthTokenSecret: '88&8&8'
  })

  const response = await request.post('/disconnect')

  t.is(_.isEmpty(store.getToken()), true)

  t.is(response.status, 200)
  t.is(_.isNil(response.data.twitter_id), false)
})
