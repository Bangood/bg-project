"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _product = require("../controllers/product.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = new _koaRouter["default"]();
router.post('/', _product.create).get('/', _product.showPage).get('/list', _product.list).get('/:id', _product.findOne).post('/:id', _product.update)["delete"]('/:id', _product.del);
var _default = router;
exports["default"] = _default;