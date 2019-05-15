"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNotify = getNotify;
exports.postNotify = postNotify;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _email = require("../utils/email");

function getNotify(_x) {
  return _getNotify.apply(this, arguments);
}
/**
 * 
 * { operation_id: '20190508678435411502',
  auth_no: '2019050810002001150278073409',
  sign_type: 'RSA2',
  payee_user_id: '2088431978724276',
  out_order_no: 'CP190402133400000211oon1557307796056',
  auth_app_id: '2019042364291281',
  notify_type: 'fund_auth_freeze',
  payer_user_id: '2088102932328154',
  version: '1.0',
  amount: '0.01',
  rest_amount: '0.01',
  notify_time: '2019-05-08 17:30:02',
  status: 'SUCCESS',
  charset: 'utf-8',
  operation_type: 'FREEZE',
  total_unfreeze_amount: '0.00',
  sign:
   'HRI1nvPKwTkp7ObzvHSKsZUl8wIqc5v0ZhuHH7jXurpIjIVLjMKjXbpsVZeJJrRAcB9Ve4a5Y/iTl/u9yGjC41ioeVrBPJ7qaSCxwoGqhLAcUjnuwP22EGo4uqM4bCi5HtX6Sg6kTeivfI8GHu8ihj8V8oZ9HKNZs/lz+yclbmBIFGsp4uPVr9Qe5dMJ95SyOQAo4rpfy7zFiSCN24TMHndUjvtuXoulIxVSf5EaqrTkzkprjT9T0rxHdxWmlyafHRiGUgeul+uEOklIY1YxSD4rUqPmocXjDD27fquK/mFXzaEnjhWs9WtGO3mwnLzSA154BfBS8aTK0ge4rwIM5g==',
  payee_logon_id: '396***@qq.com',
  gmt_create: '2019-05-08 17:29:56',
  total_freeze_amount: '0.01',
  payer_logon_id: 'wan***@126.com',
  out_request_no: 'CP190402133400000211orn1557307796056',
  app_id: '2019042364291281',
  total_pay_amount: '0.00',
  notify_id: '2019050800222173002059101025382688',
  gmt_trans: '2019-05-08 17:30:02' }

 */


function _getNotify() {
  _getNotify = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee($ctx) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('获得一条get notify======');
            console.log($ctx.request);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getNotify.apply(this, arguments);
}

function postNotify(_x2) {
  return _postNotify.apply(this, arguments);
}

function _postNotify() {
  _postNotify = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2($ctx) {
    var result, _$ctx$request$body, out_order_no, total_freeze_amount, total_pay_amount, out_request_no, status, operation_id, auth_no, _sendMail, _global$userInfoMap$g, pid, userName, userTelphone, userEmail, province, area, county, address;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log('获得一条post notify======');
            console.log($ctx.request.body);

            if (!($ctx.request.body.notify_type !== 'fund_auth_freeze')) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return");

          case 4:
            _context2.next = 6;
            return global.alipaySdk.checkNotifySign($ctx.request.body);

          case 6:
            result = _context2.sent;
            console.log(result);
            _$ctx$request$body = $ctx.request.body, out_order_no = _$ctx$request$body.out_order_no, total_freeze_amount = _$ctx$request$body.total_freeze_amount, total_pay_amount = _$ctx$request$body.total_pay_amount, out_request_no = _$ctx$request$body.out_request_no, status = _$ctx$request$body.status, operation_id = _$ctx$request$body.operation_id, auth_no = _$ctx$request$body.auth_no;

            if (status === 'SUCCESS' && global.userInfoMap.has(out_order_no)) {
              _global$userInfoMap$g = global.userInfoMap.get(out_order_no), pid = _global$userInfoMap$g.pid, userName = _global$userInfoMap$g.userName, userTelphone = _global$userInfoMap$g.userTelphone, userEmail = _global$userInfoMap$g.userEmail, province = _global$userInfoMap$g.province, area = _global$userInfoMap$g.area, county = _global$userInfoMap$g.county, address = _global$userInfoMap$g.address;
              global.userInfoMap["delete"](out_order_no);
              console.log(global.userInfoMap);
              (0, _email.sendMail)((_sendMail = {
                pid: pid,
                userName: userName,
                userTelphone: userTelphone,
                userEmail: userEmail,
                province: province,
                area: area,
                county: county,
                address: address,
                outOrderNo: out_order_no,
                totalFreezeAmount: total_freeze_amount,
                totalPayAmount: total_pay_amount,
                outRequestNo: out_request_no
              }, (0, _defineProperty2["default"])(_sendMail, "outOrderNo", out_order_no), (0, _defineProperty2["default"])(_sendMail, "operationId", operation_id), (0, _defineProperty2["default"])(_sendMail, "authNo", auth_no), _sendMail));
            }

            $ctx.ok('success');

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _postNotify.apply(this, arguments);
}