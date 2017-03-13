'use strict';

const fs = require('fs');

try {
  if (fs.statSync(__dirname + "/../.env").isFile()) {
    require('dotenv').config();
  }
} catch (e) {
  console.log('.env not found -- skipping');
}

const path = require('path');
const serveStatic = require('feathers').static;
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');
const socketio = require('feathers-socketio');
const middleware = require('./middleware');
const services = require('./services');
const expressHandlebars = require('express-handlebars');
const frontend = require('./frontend/routes');
const handlebars = expressHandlebars.create({
  layoutsDir: __dirname + '/frontend/views/layouts',
  partialsDir: __dirname + '/frontend/views/partials',
  defaultLayout: 'main.handlebars'
});

const app = feathers();

app.configure(configuration(path.join(__dirname, '..')));

app.use(compress())
  .options('*', cors())
  .use(cors())
  .use(favicon(path.join(app.get('public'), 'favicon.ico')))
  .use('/assets', serveStatic(app.get('public')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
  .engine('handlebars', handlebars.engine)
  .set('views', __dirname + '/frontend/views')
  .set('view engine', 'handlebars')
  .use('/', frontend(app)) // Manage frontend pages.
  .configure(hooks())
  .configure(rest())
  .configure(socketio())
  .configure(services)
  .configure(middleware);

module.exports = app;
