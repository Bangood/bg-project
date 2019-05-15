"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tradePay = tradePay;
exports.fundAuthUnfreeze = fundAuthUnfreeze;

var _AlipaySDK = require("../utils/AlipaySDK");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var alipaySDK = _AlipaySDK.AlipaySDK.getInstance(); // alipay.trade.pay(统一收单交易支付接口)


function tradePay(_x) {
  return _tradePay.apply(this, arguments);
} // alipay.fund.auth.order.unfreeze 资金授权解冻 


function _tradePay() {
  _tradePay = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee($ctx) {
    var _$ctx$request$body, outTradeNo, authNo, sellerId, buyerId, storeId, totalAmount, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
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
                sellerId: sellerId,
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
  _fundAuthUnfreeze = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2($ctx) {
    var _$ctx$request$body2, authNo, outRequestNo, amount, remark, result;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return _fundAuthUnfreeze.apply(this, arguments);
}