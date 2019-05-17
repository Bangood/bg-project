"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _order = require("../controllers/order.controller");

var router = new _koaRouter["default"]();
router.post('/public/', _order.create) //创建订单
.get('/private/list', _order.list); //获取订单列表

var _default = router;
exports["default"] = _default;