"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _aliapi = require("../controllers/aliapi.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = new _koaRouter["default"]();
router.post('/trade-pay', _aliapi.tradePay).post('/fund-auth-unfreeze', _aliapi.fundAuthUnfreeze);
var _default = router;
exports["default"] = _default;