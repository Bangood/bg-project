"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _products = require("../controllers/products.controller");

var router = new _koaRouter["default"]();
router.get('/', _products.renderPage).post('/list', _products.list).post('/getauthurl', _products.getAuthUrl).post('/saveorder', _products.saveOrder).post('/getproduct', _products.getProduct).get('/:productId', _products.renderItem);
var _default = router;
exports["default"] = _default;