"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _product = require("../controllers/product.controller");

var router = new _koaRouter["default"]();
router.get('/public/', _product.renderPage) //获取产品页面 public
.get('/public/list-page', _product.renderListPage) //获取产品列表页面 public
.get('/public/h5InvokeAlipay', _product.h5InvokeAlipay) //获取产品页面，h5唤起支付宝 public
.get('/public/list', _product.list) //获取产品列表 public
.get('/public/getauthurl', _product.getAuthUrl).get('/public/:id', _product.findOne) //查询产品 public
.post('/private', _product.create) //创建产品
.post('/private/:id', _product.update) //更新产品
["delete"]('/private/:id', _product.del); //删除产品

var _default = router;
exports["default"] = _default;