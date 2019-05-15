"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _products = require("../controllers/products.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = new _koaRouter["default"]();
router.get('/', _products.renderPage).post('/list', _products.list).post('/getauthurl', _products.getAuthUrl).post('/saveorder', _products.saveOrder).post('/getproduct', _products.getProduct).get('/:productId', _products.renderItem);
var _default = router;
exports["default"] = _default;