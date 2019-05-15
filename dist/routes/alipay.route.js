"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _alipay = require("../controllers/alipay.controller");

var router = new _koaRouter["default"]();
router.get('/redirect/:id', _alipay.redirect).post('/trade-pay', _alipay.tradePay);
var _default = router;
exports["default"] = _default;