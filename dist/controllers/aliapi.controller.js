"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tradePay = tradePay;
exports.fundAuthUnfreeze = fundAuthUnfreeze;
exports.redirect = redirect;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _AlipaySDK = require("../utils/AlipaySDK");

var _bgLogger = _interopRequireDefault(require("bg-logger"));

var logger = new _bgLogger["default"]({
  env: process.env.NODE_ENV
});

var alipaySDK = _AlipaySDK.AlipaySDK.getInstance(); // alipay.trade.pay(统一收单交易支付接口)


function tradePay(_x) {
  return _tradePay.apply(this, arguments);
} // alipay.fund.auth.order.unfreeze 资金授权解冻 


function _tradePay() {
  _tradePay = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee($ctx) {
    var _$ctx$request$body, outTradeNo, authNo, sellerId, buyerId, storeId, totalAmount, result;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _$ctx$request$body = $ctx.request.body, outTradeNo = _$ctx$request$body.outTradeNo, authNo = _$ctx$request$body.authNo, sellerId = _$ctx$request$body.sellerId, buyerId = _$ctx$request$body.buyerId, storeId = _$ctx$request$body.storeId, totalAmount = _$ctx$request$body.totalAmount;
            _context.next = 4;
            return alipaySDK.exec('alipay.trade.pay', {
              bizContent: {
                outTradeNo: outTradeNo,
                productCode: 'PRE_AUTH_ONLINE',
                authNo: authNo,
                subject: '预授权转支付',
                totalAmount: totalAmount,
                sellerId: '2088431978724276',
                buyerId: buyerId,
                storeId: storeId,
                body: '预授权解冻转支付',
                authConfirmMode: 'COMPLETE'
              },
              notifyUrl: 'http://39.100.71.78/v1/gateway'
            });

          case 4:
            result = _context.sent;
            logger.info('tradePay-result:', result);
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            logger.error(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));
  return _tradePay.apply(this, arguments);
}

function fundAuthUnfreeze(_x2) {
  return _fundAuthUnfreeze.apply(this, arguments);
}

function _fundAuthUnfreeze() {
  _fundAuthUnfreeze = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2($ctx) {
    var _$ctx$request$body2, authNo, outRequestNo, amount, remark, result;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _$ctx$request$body2 = $ctx.request.body, authNo = _$ctx$request$body2.authNo, outRequestNo = _$ctx$request$body2.outRequestNo, amount = _$ctx$request$body2.amount, remark = _$ctx$request$body2.remark;
            _context2.next = 4;
            return alipaySDK.exec('alipay.fund.auth.order.unfreeze', {
              bizContent: {
                authNo: authNo,
                outRequestNo: outRequestNo,
                amount: amount,
                remark: remark
              },
              notifyUrl: 'http://39.100.71.78/v1/gateway'
            });

          case 4:
            result = _context2.sent;
            $ctx.ok(result);
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            logger.error(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return _fundAuthUnfreeze.apply(this, arguments);
}

function redirect(_x3) {
  return _redirect.apply(this, arguments);
}

function _redirect() {
  _redirect = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3($ctx) {
    var _$ctx$query, app_id, source, scope, auth_code, pid, result;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _$ctx$query = $ctx.query, app_id = _$ctx$query.app_id, source = _$ctx$query.source, scope = _$ctx$query.scope, auth_code = _$ctx$query.auth_code, pid = _$ctx$query.pid;
            _context3.prev = 1;
            _context3.next = 4;
            return alipaySdk.exec('alipay.system.oauth.token', {
              grantType: 'authorization_code',
              code: auth_code
            }, {
              validateSign: true,
              log: console
            });

          case 4:
            result = _context3.sent;
            // $ctx.redirect(`/v1/products/${$ctx.params['id']}?productId=`+$ctx.params['id']+`&paa_id=${app_id}&source=${source}&scope=${scope}&auth_code=${auth_code}`)
            logger.info(result);
            $ctx.redirect('/v1/product/public?id=' + pid);
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](1);
            logger.error(_context3.t0);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 9]]);
  }));
  return _redirect.apply(this, arguments);
}