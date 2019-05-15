"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;

var _microtime = _interopRequireDefault(require("microtime"));

var _order = require("../models/order.model");

var _product = require("../models/product.model");

var _Redis = require("../utils/Redis");

var _AlipaySDK = require("../utils/AlipaySDK");

var _form = _interopRequireDefault(require("alipay-sdk/lib/form"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var redisClient = _Redis.Redis.getInstance();

var alipaySDK = _AlipaySDK.AlipaySDK.getInstance();

function create(_x) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee($ctx) {
    var id, _$ctx$request$body, productId, userName, userTelphone, province, area, county, address, outOrderNo, outRequestNo, product, formData, result, result1, result2;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = _microtime["default"].now();
            _$ctx$request$body = $ctx.request.body, productId = _$ctx$request$body.productId, userName = _$ctx$request$body.userName, userTelphone = _$ctx$request$body.userTelphone, province = _$ctx$request$body.province, area = _$ctx$request$body.area, county = _$ctx$request$body.county, address = _$ctx$request$body.address;
            outOrderNo = "".concat(productId, "oon").concat(id);
            outRequestNo = "".concat(productId, "orn").concat(id);
            _context.prev = 4;
            _context.next = 7;
            return redisClient.set(outOrderNo, JSON.stringify({
              productId: productId,
              outOrderNo: outOrderNo,
              outRequestNo: outRequestNo,
              userName: userName,
              userTelphone: userTelphone,
              province: province,
              area: area,
              county: county,
              address: address
            }));

          case 7:
            console.log(productId);
            _context.next = 10;
            return _product.ProductModel.findById(productId);

          case 10:
            product = _context.sent;
            console.log(product);
            formData = new _form["default"]();
            formData.setMethod('get');
            formData.addField('notifyUrl', 'http://39.100.71.78/v1/gateway');
            formData.addField('bizContent', {
              outOrderNo: outOrderNo,
              outRequestNo: outRequestNo,
              orderTitle: '预授权冻结',
              amount: product.creditAmount,
              productCode: 'PRE_AUTH_ONLINE',
              payeeLogonId: '396493396@qq.com',
              payTimeout: '30m',
              enablePayChannels: "[{\"payChannelType\":\"CREDITZHIMA\"},{\"payChannelType\":\"MONEY_FUND\"}]",
              extraParam: "{\"category\":\"RENT_DIGITAL\"}"
            });
            _context.next = 18;
            return alipaySDK.exec('alipay.fund.auth.order.app.freeze', {}, {
              formData: formData
            });

          case 18:
            result = _context.sent;
            result1 = result.split('https://openapi.alipay.com/gateway.do?');
            result2 = result1.slice(1);
            $ctx.ok({
              "status": 0,
              "data": {
                "key": 0,
                "msg": {
                  body: result2[0]
                }
              }
            });
            _context.next = 26;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](4);

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 24]]);
  }));
  return _create.apply(this, arguments);
}

function update() {
  return _update.apply(this, arguments);
}

function _update() {
  _update = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _update.apply(this, arguments);
}

function del() {
  return _del.apply(this, arguments);
}

function _del() {
  _del = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _del.apply(this, arguments);
}