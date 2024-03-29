"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _product = _interopRequireDefault(require("./product.route"));

var _order = _interopRequireDefault(require("./order.route"));

var _aliapi = _interopRequireDefault(require("./aliapi.route"));

var _gateway = _interopRequireDefault(require("./gateway.route"));

var _auth = _interopRequireDefault(require("./auth.route"));

var _user = _interopRequireDefault(require("./user.route"));

var router = new _koaRouter["default"]();
router.prefix('/v1');
router.use('/product', _product["default"].routes());
router.use('/order', _order["default"].routes());
router.use('/aliapi', _aliapi["default"].routes());
router.use('/gateway', _gateway["default"].routes());
router.use('/auth', _auth["default"].routes());
router.use('/user', _user["default"].routes());
var _default = router;
exports["default"] = _default;