"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gateway = gateway;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _AlipaySDK = require("../utils/AlipaySDK");

var _order = require("../models/order.model");

var _Redis = require("../utils/Redis");

var _email = require("../utils/email");

var _alipay = require("../config/alipay.config");

var alipaySDK = _AlipaySDK.AlipaySDK.getInstance();

var redisClient = _Redis.Redis.getInstance(); //网关验证


function verify(_x) {
  return _verify.apply(this, arguments);
} //alipay.fund.auth.order.app.freeze(线上资金授权冻结接口)


function _verify() {
  _verify = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(ctx) {
    var result, sign;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return alipaySDK.checkNotifySignForGateway(ctx.request.body);

          case 3:
            result = _context.sent;

            if (!result) {
              _context.next = 10;
              break;
            }

            _context.next = 7;
            return alipaySDK.signForGateway();

          case 7:
            sign = _context.sent;
            ctx.response.type = 'text/xml;charset=GBK';
            return _context.abrupt("return", ctx.body = "<?xml version=\"1.0\" encoding=\"GBK\"?><alipay><response><biz_content>".concat(_alipay.merchantPublicKey, "</biz_content><success>true</success></response><sign>").concat(sign, "</sign><sign_type>RSA2</sign_type></alipay>"));

          case 10:
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));
  return _verify.apply(this, arguments);
}

function fundAuthFreeze(_x2) {
  return _fundAuthFreeze.apply(this, arguments);
} // alipay.trade.pay  授权转支付 


function _fundAuthFreeze() {
  _fundAuthFreeze = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2($ctx) {
    var _OrderModel$create, _sendMail, result, _$ctx$request$body, out_order_no, total_freeze_amount, total_pay_amount, out_request_no, operation_id, auth_no, payer_user_id, order, _JSON$parse, userName, productId, userTelphone, province, area, county, address;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return alipaySDK.checkNotifySign($ctx.request.body);

          case 3:
            result = _context2.sent;

            if (result) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return");

          case 6:
            _$ctx$request$body = $ctx.request.body, out_order_no = _$ctx$request$body.out_order_no, total_freeze_amount = _$ctx$request$body.total_freeze_amount, total_pay_amount = _$ctx$request$body.total_pay_amount, out_request_no = _$ctx$request$body.out_request_no, operation_id = _$ctx$request$body.operation_id, auth_no = _$ctx$request$body.auth_no, payer_user_id = _$ctx$request$body.payer_user_id;
            _context2.next = 9;
            return redisClient.get(out_order_no);

          case 9:
            order = _context2.sent;
            _JSON$parse = JSON.parse(order), userName = _JSON$parse.userName, productId = _JSON$parse.productId, userTelphone = _JSON$parse.userTelphone, province = _JSON$parse.province, area = _JSON$parse.area, county = _JSON$parse.county, address = _JSON$parse.address;
            _context2.next = 13;
            return _order.OrderModel.create((_OrderModel$create = {
              userName: userName,
              userId: payer_user_id,
              productId: productId,
              userTelphone: userTelphone,
              province: province,
              area: area,
              county: county,
              address: address,
              outOrderNo: out_order_no,
              totalFreezeAmount: total_freeze_amount,
              totalPayAmount: total_pay_amount,
              outRequestNo: out_request_no
            }, (0, _defineProperty2["default"])(_OrderModel$create, "outOrderNo", out_order_no), (0, _defineProperty2["default"])(_OrderModel$create, "operationId", operation_id), (0, _defineProperty2["default"])(_OrderModel$create, "authNo", auth_no), (0, _defineProperty2["default"])(_OrderModel$create, "status", 0), _OrderModel$create));

          case 13:
            (0, _email.sendMail)((_sendMail = {
              pid: productId,
              userName: userName,
              userTelphone: userTelphone,
              province: province,
              area: area,
              county: county,
              address: address,
              outOrderNo: out_order_no,
              totalFreezeAmount: total_freeze_amount,
              totalPayAmount: total_pay_amount,
              outRequestNo: out_request_no
            }, (0, _defineProperty2["default"])(_sendMail, "outOrderNo", out_order_no), (0, _defineProperty2["default"])(_sendMail, "operationId", operation_id), (0, _defineProperty2["default"])(_sendMail, "authNo", auth_no), _sendMail));
            $ctx.body = 'success';
            _context2.next = 20;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 17]]);
  }));
  return _fundAuthFreeze.apply(this, arguments);
}

function tradePay(_x3) {
  return _tradePay.apply(this, arguments);
} //alipay.fund.auth.order.unfreeze 资金授权解冻 


function _tradePay() {
  _tradePay = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3($ctx) {
    var out_trade_no, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            out_trade_no = $ctx.request.body.out_trade_no;
            _context3.next = 4;
            return _order.OrderModel.findOneAndUpdate({
              outOrderNo: out_trade_no
            }, {
              status: 2
            });

          case 4:
            result = _context3.sent;
            console.log(result);
            $ctx.body = 'success';
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return _tradePay.apply(this, arguments);
}

function fundAuthUnfreeze(_x4) {
  return _fundAuthUnfreeze.apply(this, arguments);
}

function _fundAuthUnfreeze() {
  _fundAuthUnfreeze = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4($ctx) {
    var out_order_no, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            out_order_no = $ctx.request.body.out_order_no;
            _context4.next = 4;
            return _order.OrderModel.findOneAndUpdate({
              outOrderNo: out_order_no
            }, {
              status: 1
            });

          case 4:
            result = _context4.sent;
            console.log(result);
            $ctx.body = 'success';
            _context4.next = 12;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 9]]);
  }));
  return _fundAuthUnfreeze.apply(this, arguments);
}

function gateway(_x5) {
  return _gateway.apply(this, arguments);
}

function _gateway() {
  _gateway = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5($ctx) {
    var body;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            body = $ctx.request.body;
            console.log($ctx.request.body);

            if (!(body.service === 'alipay.service.check')) {
              _context5.next = 5;
              break;
            }

            console.log('alipay.service.check');
            return _context5.abrupt("return", verify($ctx));

          case 5:
            if (!($ctx.request.body.notify_type === 'fund_auth_freeze')) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", fundAuthFreeze($ctx));

          case 7:
            if (!($ctx.request.body.notify_type === 'trade_status_sync')) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt("return", tradePay($ctx));

          case 9:
            if (!($ctx.request.body.notify_type === 'fund_auth_unfreeze')) {
              _context5.next = 11;
              break;
            }

            return _context5.abrupt("return", fundAuthUnfreeze($ctx));

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _gateway.apply(this, arguments);
}