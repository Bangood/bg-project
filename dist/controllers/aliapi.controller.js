"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tradePay = tradePay;
exports.fundAuthUnfreeze = fundAuthUnfreeze;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _AlipaySDK = require("../utils/AlipaySDK");

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
            console.log('tradePay-result:', result);
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

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
            console.log($ctx.request.body);
            _context2.next = 5;
            return alipaySDK.exec('alipay.fund.auth.order.unfreeze', {
              bizContent: {
                authNo: authNo,
                outRequestNo: outRequestNo,
                amount: amount,
                remark: remark
              },
              notifyUrl: 'http://39.100.71.78/v1/gateway'
            });

          case 5:
            result = _context2.sent;
            $ctx.ok(result);
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return _fundAuthUnfreeze.apply(this, arguments);
}