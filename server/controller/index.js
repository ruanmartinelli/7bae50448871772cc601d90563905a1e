function init (app) {
  require('./oauth-controller.js').init(app)
  require('./twitter-controller.js').init(app)
}

module.exports = { init }
