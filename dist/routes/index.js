"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _products = _interopRequireDefault(require("./products.route"));

var _product = _interopRequireDefault(require("./product.route"));

var _order = _interopRequireDefault(require("./order.route"));

var _aliapi = _interopRequireDefault(require("./aliapi.route"));

var _alipay = _interopRequireDefault(require("./alipay.route"));

var _notify = _interopRequireDefault(require("./notify.route"));

var _gateway = _interopRequireDefault(require("./gateway.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = new _koaRouter["default"]();
router.prefix('/v1');
router.use('/product', _product["default"].routes());
router.use('/order', _order["default"].routes());
router.use('/products', _products["default"].routes());
router.use('/aliapi', _aliapi["default"].routes());
router.use('/alipay', _alipay["default"].routes());
router.use('/notify', _notify["default"].routes());
router.use('/gateway', _gateway["default"].routes());
var _default = router;
exports["default"] = _default;