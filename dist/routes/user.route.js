"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _auth = require("../controllers/auth.controller");

var router = new _koaRouter["default"]();
router.get('/:id', _auth.queryUser).post('/:id', _auth.updateUser);
var _default = router;
exports["default"] = _default;