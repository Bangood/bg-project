"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fundAuthOrderAppFreeze = fundAuthOrderAppFreeze;
exports.redirect = redirect;
exports.tradePay = tradePay;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _alipaySdk = _interopRequireDefault(require("alipay-sdk"));

var privateKey = 'MIIEpAIBAAKCAQEAy0Ohf6pq+u9SYY/kTt0VffzdtglGFo0mK5cd+l6BzUrX2SFZaSxqaC98hrGYSvx0cjVCztKK+W7Ob7vjYhHk1+zHA8WO2KFSYQrfRPJNzJivLKSu3N7SwGMDW51kGFkVxJqafnBVm/r7wksaCeQkOA8rNFnPF0epv4jPEX3ua4++syFikneYvx0j6zPT7xefLfm858fOwHq+u1ES+xrO/HCxmG3yzwtHFQsqnxlmAHadC4VOBcU45W6rnhVH144+7hVEGieV7u9grRfuhfLZlkYyphMVHoyWsUSbzKN4V3Pha9S0PFQG4p9txKbY9mxbuzkp2WOsopyQ7EBwKf6n2QIDAQABAoIBAD76u4Vk9jS+BlZ4URMmaUxaFxAaG39NSLBk6EL1GV7Ue8CpFp0ByA5z+C97w2YohqQEYKjYj3rtnET+gFuYk8FbeeZvRe1VPsMWrUsdkIF+JXi9pfiFieNWSmoOgD8TCy2ZgZj/kWb9AxiWUIEUESzVdluIICRkbfIMn6wZys/Eclzhry6crf8a4xFrt4OjO0fvXOLN/OhGwI0MmtVpg3Xgu14M4hAVOaIU4po/9tB+1aOuVgI4k/cAPk++8vV5VImn9DBxOuAi1lMmlhYfJ5jCefxrAtUmPIuB+caPKmEnMwcBGkC0MRVH4eUsG1Ws9d7lHEo3fyK/YkFIHNivCIkCgYEA9fybPanXFEVIA9986X3hofsU148+htA55H9hpVLh3SDS87J5YZBvNmbN+PMKqL4nbXkD52hGsqMVKg/vJEz41KrAxlazRUextYRkFh6lsudgWd97KgXyJGEm2RTAVVRdLviKm/u6vJXVSxk/moKlSBxuK0W+O04TZGrTnZeDnvsCgYEA04nRjyHqXL2ytKEZUKs4K84hRgpPi0hHzRmaqNwiV4ELVRKoMSqMT1JNK9VTfCzhtDfCggQb1Wl0StC5Tixavc99XY9YCIX8qRdxyy6uBxdCMnOTXTA9owexxvKS+AsC4FzlxtaKy3Qv74WU+eXEdcf0lT198K8mMgTjLS6bzDsCgYBTI0s8rhh5S2kplfFb4SXPX1MN/+X8HohSiBLyk26vFBb4Mov/w5cy5dAbodkqawpcX5hIL+AlJCVVEAmdVT6MciGxZ0Az3CVd2h8Rss4CB11zQqsX6uaKESPWHsNak6bi5zHBwnS8pE9wkFoE2L8P/jvl+C5xUNQRDmHzU3Ay3QKBgQCBxBqsrkaBq9ETo3vPE6m6nZGl0K9pJub894b7rUbX3Q6hmndY6dv20OsMR6oWE8ZFcqs8bN7SNQWk25PBU846gC1MlqGPYPpUlFA3LySMrwTpxCKTWQOGnjK9c5Ma3E5gajx+lJ/CHT1GtvBjuEKjag0s+/LlEdzhdEQUNHJYfwKBgQCVH3OTQDtfzhFb2g8yw3hDhZopIaPI8dbNKkp7fQxJlAZAVuVS4cb4Lj0lV7i6orRtCL+HsrNH8kCEhXHOTx05wPNbRBKKhsI7z2XLWbNtzScRRCEk6WERRefQIKbFXe+wlqnUf7an3PxwWeCyxHi4I2w8n80Wh5AxA51XAc4naA==';
var alipayPublicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiULinfbmmNmsPiiBaNGTKl8abplmt62WBhmJ8l4b4eK0FM7TbLETBAzUgXY1OG9PjQBXyaADNzhdR1exU15NTSpnCWlqcQGZFzZ6Kt39p/dWU5+ZmObG1cX3ShN0qzVcbPxKBYlZvPsrbiBUZdTEOInF822ftcl4cp8OK0kdoHz5xYo/Vc6Ek2re85WeYja4zM/Y9ysyH7+ZdrgtLNs5iA+JJW1jTVwqfctc/lq4N7KmHA6WezIX2E9KZiOSbF8UnYk3ZerggaHoKvkRxHFIqqyHk8JT5Me+39ad1DSFS5J16Grq9S0ZjHcVYXN3z0NXHqRP5QMLe9pDxPk17dU+xQIDAQAB';
var publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy0Ohf6pq+u9SYY/kTt0VffzdtglGFo0mK5cd+l6BzUrX2SFZaSxqaC98hrGYSvx0cjVCztKK+W7Ob7vjYhHk1+zHA8WO2KFSYQrfRPJNzJivLKSu3N7SwGMDW51kGFkVxJqafnBVm/r7wksaCeQkOA8rNFnPF0epv4jPEX3ua4++syFikneYvx0j6zPT7xefLfm858fOwHq+u1ES+xrO/HCxmG3yzwtHFQsqnxlmAHadC4VOBcU45W6rnhVH144+7hVEGieV7u9grRfuhfLZlkYyphMVHoyWsUSbzKN4V3Pha9S0PFQG4p9txKbY9mxbuzkp2WOsopyQ7EBwKf6n2QIDAQAB';
var alipaySdk = global.alipaySdk = new _alipaySdk["default"]({
  appId: '2019042364291281',
  privateKey: privateKey,
  alipayPublicKey: alipayPublicKey
}); // 格式化 key

function formatKey(key, type) {
  var item = key.split('\n').map(function (val) {
    return val.trim();
  });
  console.log(item); // 删除包含 `RSA PRIVATE KEY / PUBLIC KEY` 等字样的第一行

  if (item[0].includes(type)) {
    item.shift();
  } // 删除包含 `RSA PRIVATE KEY / PUBLIC KEY` 等字样的最后一行


  if (item[item.length - 1].includes(type)) {
    item.pop();
  }

  return "-----BEGIN ".concat(type, "-----\n").concat(item.join(''), "\n-----END ").concat(type, "-----");
}

function fundAuthOrderAppFreeze() {
  return _fundAuthOrderAppFreeze.apply(this, arguments);
}

function _fundAuthOrderAppFreeze() {
  _fundAuthOrderAppFreeze = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return alipaySdk.exec('alipay.fund.auth.order.app.freeze', {
              bizContent: {
                outOrderNo: '8077735255938023',
                outRequestNo: '8077735255938032',
                orderTitle: '预授权冻结',
                amount: 0.01,
                productCode: 'PRE_AUTH_ONLINE',
                payeeLogonId: '15196634454',
                payeeUserId: '2088102000275795',
                payTimeout: '2d',
                extraParam: '{\"category\":\"CHARGE_PILE_CAR\"}',
                sceneCode: 'OVERSEAS_ONLINE_AUTH_COMMON_SCENE',
                transCurrency: 'USD',
                settleCurrency: 'USD',
                enablePayChannels: '[{\"payChannelType\":\"PCREDIT_PAY\"},{\"payChannelType\":\"MONEY_FUND\"}]'
              }
            }, {
              validateSign: true,
              log: console
            });

          case 3:
            result = _context.sent;
            console.log(result);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _fundAuthOrderAppFreeze.apply(this, arguments);
}

function redirect(_x) {
  return _redirect.apply(this, arguments);
}

function _redirect() {
  _redirect = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2($ctx) {
    var _$ctx$query, app_id, source, scope, auth_code, result;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log($ctx.params['id']);
            _$ctx$query = $ctx.query, app_id = _$ctx$query.app_id, source = _$ctx$query.source, scope = _$ctx$query.scope, auth_code = _$ctx$query.auth_code;
            _context2.prev = 2;
            _context2.next = 5;
            return alipaySdk.exec('alipay.system.oauth.token', {
              grantType: 'authorization_code',
              code: auth_code
            }, {
              validateSign: true,
              log: console
            });

          case 5:
            result = _context2.sent;
            console.log(result);
            $ctx.redirect("/v1/products/".concat($ctx.params['id'], "?productId=") + $ctx.params['id'] + "&paa_id=".concat(app_id, "&source=").concat(source, "&scope=").concat(scope, "&auth_code=").concat(auth_code));
            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 10]]);
  }));
  return _redirect.apply(this, arguments);
}

function tradePay(_x2) {
  return _tradePay.apply(this, arguments);
}

function _tradePay() {
  _tradePay = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3($ctx) {
    var _$ctx$request$body, outTradeNo, authNo, sellerId, buyerId, storeId, totalAmount, result;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _$ctx$request$body = $ctx.request.body, outTradeNo = _$ctx$request$body.outTradeNo, authNo = _$ctx$request$body.authNo, sellerId = _$ctx$request$body.sellerId, buyerId = _$ctx$request$body.buyerId, storeId = _$ctx$request$body.storeId, totalAmount = _$ctx$request$body.totalAmount;
            _context3.next = 4;
            return global.alipaySdk.exec('alipay.trade.pay', {
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
              notifyUrl: 'http://39.100.71.78/v1/notify'
            });

          case 4:
            result = _context3.sent;
            console.log('tradePay-result:', result);
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return _tradePay.apply(this, arguments);
}