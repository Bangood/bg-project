"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _gateway = require("../controllers/gateway.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = new _koaRouter["default"]();
router.post('/', _gateway.gateway);
var _default = router;
exports["default"] = _default;