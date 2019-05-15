"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _product = require("../controllers/product.controller");

var router = new _koaRouter["default"]();
router.post('/', _product.create).get('/', _product.showPage).get('/list', _product.list).get('/:id', _product.findOne).post('/:id', _product.update)["delete"]('/:id', _product.del);
var _default = router;
exports["default"] = _default;