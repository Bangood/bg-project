"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;

var _koa = _interopRequireDefault(require("koa"));

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

var _koaCompose = _interopRequireDefault(require("koa-compose"));

var _koaRespond = _interopRequireDefault(require("koa-respond"));

var _koaViews = _interopRequireDefault(require("koa-views"));

var _routes = _interopRequireDefault(require("../routes"));

var _path = _interopRequireDefault(require("path"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _cors = _interopRequireDefault(require("@koa/cors"));

var _koaJwt = _interopRequireDefault(require("koa-jwt"));

var _koaHelmet = _interopRequireDefault(require("koa-helmet"));

var _koaConditionalGet = _interopRequireDefault(require("koa-conditional-get"));

var _koaEtag = _interopRequireDefault(require("koa-etag"));

var _bgLogger = _interopRequireDefault(require("bg-logger"));

var logger = new _bgLogger["default"]({
  env: process.env.NODE_ENV
});
var app = new _koa["default"]();
var allMidlewares = (0, _koaCompose["default"])([(0, _koaHelmet["default"])(), (0, _koaConditionalGet["default"])(), (0, _koaEtag["default"])(), (0, _koaRespond["default"])(), (0, _koaBodyparser["default"])({
  enableTypes: ['json', 'form']
}), (0, _cors["default"])(), (0, _koaStatic["default"])(_path["default"].join(__dirname, '../../assets')), (0, _koaViews["default"])(__dirname + '/../views', {
  extension: 'html'
}), (0, _koaJwt["default"])({
  secret: '#production#Bangood#'
}).unless({
  path: [/^\/v1\/auth\/login/, /^\/v1\/auth\/register/, /\/v1\/product\/public/, /^\/v1\/products/, /^\/v1\/order\/public/, /^\/v1\/gateway/, /^\/v1\/aliapi\/redirect/]
}), _routes["default"].routes()]);
app.use(allMidlewares);
global.userInfoMap = new Map();

function init(port) {
  app.listen(port);
  logger.success("listen on :".concat(port));
}