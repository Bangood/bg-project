"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _alipaySdk = _interopRequireDefault(require("alipay-sdk"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _koa = require("./utils/koa");

// const alipaySdk = new AlipaySdk({
//     appId: '2019042364291281',
//     privateKey: fs.readFileSync(path.resolve(__dirname,'../assets/private-key.pem'),'ascii'),
//     alipayPublicKey: fs.readFileSync(path.resolve(__dirname,'../assets/public-key.pem'),'ascii'),
// });
function check() {
  return _check.apply(this, arguments);
}

function _check() {
  _check = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _check.apply(this, arguments);
}

function init() {
  return _init.apply(this, arguments);
}

function _init() {
  _init = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            (0, _koa.init)(80);

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _init.apply(this, arguments);
}

init();