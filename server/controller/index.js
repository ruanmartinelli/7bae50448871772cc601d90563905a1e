const authMiddleware = require('../middleware/auth-middleware')

function init (app) {
  require('./oauth-controller.js').init(app)

  app.use(authMiddleware)

  require('./twitter-controller.js').init(app)
}

module.exports = { init }
