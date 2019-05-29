"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.update = update;
exports.del = del;
exports.list = list;
exports.findOne = findOne;
exports.renderPage = renderPage;
exports.renderListPage = renderListPage;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _product = require("../models/product.model");

var _bgLogger = _interopRequireDefault(require("bg-logger"));

var logger = new _bgLogger["default"]({
  env: process.env.NODE_ENV
});

function create(_x) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee($ctx) {
    var _$ctx$request$body, name, desc, creditAmount, canApply, logoUrl, createTime, result;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _$ctx$request$body = $ctx.request.body, name = _$ctx$request$body.name, desc = _$ctx$request$body.desc, creditAmount = _$ctx$request$body.creditAmount, canApply = _$ctx$request$body.canApply, logoUrl = _$ctx$request$body.logoUrl;
            createTime = Date.now();
            _context.next = 5;
            return _product.ProductModel.create({
              name: name,
              desc: desc,
              creditAmount: creditAmount,
              logoUrl: logoUrl,
              canApply: canApply,
              createTime: createTime
            });

          case 5:
            result = _context.sent;
            $ctx.ok(result);
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            logger.error(_context.t0);
            $ctx.ok(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));
  return _create.apply(this, arguments);
}

function update(_x2) {
  return _update.apply(this, arguments);
}

function _update() {
  _update = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2($ctx) {
    var id, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = $ctx.params.id;
            _context2.next = 4;
            return _product.ProductModel.findByIdAndUpdate(id, $ctx.request.body);

          case 4:
            result = _context2.sent;
            $ctx.ok(result);
            _context2.next = 12;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            logger.error(_context2.t0);
            $ctx.ok(_context2.t0);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return _update.apply(this, arguments);
}

function del(_x3) {
  return _del.apply(this, arguments);
}

function _del() {
  _del = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3($ctx) {
    var id, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            id = $ctx.params.id;
            _context3.next = 4;
            return _product.ProductModel.findByIdAndRemove(id);

          case 4:
            result = _context3.sent;
            $ctx.ok({
              status: 0,
              data: {
                key: 0,
                msg: result
              }
            });
            _context3.next = 12;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            logger.error(_context3.t0);
            $ctx.ok(_context3.t0);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return _del.apply(this, arguments);
}

function list(_x4) {
  return _list.apply(this, arguments);
}

function _list() {
  _list = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4($ctx) {
    var result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _product.ProductModel.find({});

          case 3:
            result = _context4.sent;
            $ctx.ok({
              status: 0,
              data: {
                key: 0,
                msg: result
              }
            });
            _context4.next = 11;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            logger.error(_context4.t0);
            $ctx.ok(_context4.t0);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return _list.apply(this, arguments);
}

function findOne(_x5) {
  return _findOne.apply(this, arguments);
}

function _findOne() {
  _findOne = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5($ctx) {
    var id, product;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = $ctx.params.id;
            _context5.next = 4;
            return _product.ProductModel.findById(id);

          case 4:
            product = _context5.sent;
            $ctx.ok({
              status: 0,
              data: {
                key: 0,
                msg: {
                  pageHeaderImg: product.logoUrl,
                  productName: product.name,
                  noticeInfo: product.desc
                }
              }
            });
            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);
            logger.error(_context5.t0);

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 8]]);
  }));
  return _findOne.apply(this, arguments);
}

function renderPage(_x6) {
  return _renderPage.apply(this, arguments);
}

function _renderPage() {
  _renderPage = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6($ctx) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return $ctx.render('products/product');

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _renderPage.apply(this, arguments);
}

function renderListPage(_x7) {
  return _renderListPage.apply(this, arguments);
}

function _renderListPage() {
  _renderListPage = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7($ctx) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return $ctx.render('products/list');

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _renderListPage.apply(this, arguments);
}