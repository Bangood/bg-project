"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _notify = require("../controllers/notify.controller");

var router = new _koaRouter["default"]();
router.get('/', _notify.getNotify).post('/', _notify.postNotify);
var _default = router;
exports["default"] = _default;