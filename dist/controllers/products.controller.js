"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list = list;
exports.renderPage = renderPage;
exports.renderItem = renderItem;
exports.getAuthUrl = getAuthUrl;
exports.getProduct = getProduct;
exports.saveOrder = saveOrder;

var _alipaySdk = _interopRequireDefault(require("alipay-sdk"));

var _form = _interopRequireDefault(require("alipay-sdk/lib/form"));

var _email = require("../utils/email");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var privateKey = 'MIIEpAIBAAKCAQEAy0Ohf6pq+u9SYY/kTt0VffzdtglGFo0mK5cd+l6BzUrX2SFZaSxqaC98hrGYSvx0cjVCztKK+W7Ob7vjYhHk1+zHA8WO2KFSYQrfRPJNzJivLKSu3N7SwGMDW51kGFkVxJqafnBVm/r7wksaCeQkOA8rNFnPF0epv4jPEX3ua4++syFikneYvx0j6zPT7xefLfm858fOwHq+u1ES+xrO/HCxmG3yzwtHFQsqnxlmAHadC4VOBcU45W6rnhVH144+7hVEGieV7u9grRfuhfLZlkYyphMVHoyWsUSbzKN4V3Pha9S0PFQG4p9txKbY9mxbuzkp2WOsopyQ7EBwKf6n2QIDAQABAoIBAD76u4Vk9jS+BlZ4URMmaUxaFxAaG39NSLBk6EL1GV7Ue8CpFp0ByA5z+C97w2YohqQEYKjYj3rtnET+gFuYk8FbeeZvRe1VPsMWrUsdkIF+JXi9pfiFieNWSmoOgD8TCy2ZgZj/kWb9AxiWUIEUESzVdluIICRkbfIMn6wZys/Eclzhry6crf8a4xFrt4OjO0fvXOLN/OhGwI0MmtVpg3Xgu14M4hAVOaIU4po/9tB+1aOuVgI4k/cAPk++8vV5VImn9DBxOuAi1lMmlhYfJ5jCefxrAtUmPIuB+caPKmEnMwcBGkC0MRVH4eUsG1Ws9d7lHEo3fyK/YkFIHNivCIkCgYEA9fybPanXFEVIA9986X3hofsU148+htA55H9hpVLh3SDS87J5YZBvNmbN+PMKqL4nbXkD52hGsqMVKg/vJEz41KrAxlazRUextYRkFh6lsudgWd97KgXyJGEm2RTAVVRdLviKm/u6vJXVSxk/moKlSBxuK0W+O04TZGrTnZeDnvsCgYEA04nRjyHqXL2ytKEZUKs4K84hRgpPi0hHzRmaqNwiV4ELVRKoMSqMT1JNK9VTfCzhtDfCggQb1Wl0StC5Tixavc99XY9YCIX8qRdxyy6uBxdCMnOTXTA9owexxvKS+AsC4FzlxtaKy3Qv74WU+eXEdcf0lT198K8mMgTjLS6bzDsCgYBTI0s8rhh5S2kplfFb4SXPX1MN/+X8HohSiBLyk26vFBb4Mov/w5cy5dAbodkqawpcX5hIL+AlJCVVEAmdVT6MciGxZ0Az3CVd2h8Rss4CB11zQqsX6uaKESPWHsNak6bi5zHBwnS8pE9wkFoE2L8P/jvl+C5xUNQRDmHzU3Ay3QKBgQCBxBqsrkaBq9ETo3vPE6m6nZGl0K9pJub894b7rUbX3Q6hmndY6dv20OsMR6oWE8ZFcqs8bN7SNQWk25PBU846gC1MlqGPYPpUlFA3LySMrwTpxCKTWQOGnjK9c5Ma3E5gajx+lJ/CHT1GtvBjuEKjag0s+/LlEdzhdEQUNHJYfwKBgQCVH3OTQDtfzhFb2g8yw3hDhZopIaPI8dbNKkp7fQxJlAZAVuVS4cb4Lj0lV7i6orRtCL+HsrNH8kCEhXHOTx05wPNbRBKKhsI7z2XLWbNtzScRRCEk6WERRefQIKbFXe+wlqnUf7an3PxwWeCyxHi4I2w8n80Wh5AxA51XAc4naA==';
var alipayPublicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiULinfbmmNmsPiiBaNGTKl8abplmt62WBhmJ8l4b4eK0FM7TbLETBAzUgXY1OG9PjQBXyaADNzhdR1exU15NTSpnCWlqcQGZFzZ6Kt39p/dWU5+ZmObG1cX3ShN0qzVcbPxKBYlZvPsrbiBUZdTEOInF822ftcl4cp8OK0kdoHz5xYo/Vc6Ek2re85WeYja4zM/Y9ysyH7+ZdrgtLNs5iA+JJW1jTVwqfctc/lq4N7KmHA6WezIX2E9KZiOSbF8UnYk3ZerggaHoKvkRxHFIqqyHk8JT5Me+39ad1DSFS5J16Grq9S0ZjHcVYXN3z0NXHqRP5QMLe9pDxPk17dU+xQIDAQAB';
var publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy0Ohf6pq+u9SYY/kTt0VffzdtglGFo0mK5cd+l6BzUrX2SFZaSxqaC98hrGYSvx0cjVCztKK+W7Ob7vjYhHk1+zHA8WO2KFSYQrfRPJNzJivLKSu3N7SwGMDW51kGFkVxJqafnBVm/r7wksaCeQkOA8rNFnPF0epv4jPEX3ua4++syFikneYvx0j6zPT7xefLfm858fOwHq+u1ES+xrO/HCxmG3yzwtHFQsqnxlmAHadC4VOBcU45W6rnhVH144+7hVEGieV7u9grRfuhfLZlkYyphMVHoyWsUSbzKN4V3Pha9S0PFQG4p9txKbY9mxbuzkp2WOsopyQ7EBwKf6n2QIDAQAB';
var alipaySdk = new _alipaySdk["default"]({
  appId: '2019042364291281',
  privateKey: privateKey,
  alipayPublicKey: alipayPublicKey
});

function list(_x) {
  return _list.apply(this, arguments);
}

function _list() {
  _list = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee($ctx) {
    var products;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            products = [{
              "id": "CP190402133400000210",
              "productName": "考拉超收",
              "isNaturalMonth": 1,
              "productDesc": "该产品激活后拉卡拉会赠送您一个月0.5%+3手续费使用时长，使用过期后，恢复至0.6%+3。如需延长0.5%+3手续费时长，需推荐客户使用本产品，推荐成功一名，拉卡拉奖励3个月时长，和50元现金，可无限叠加。请您收到货后10天内激活，否则系统将会扣除您“信用借还”冻结100元押金，请您按要求使用产品",
              "creditAmount": 298,
              "deductions": 299.0,
              "logoImg": "/imgs/klcs.jpg",
              "titlePicture": "/upload/201904/02/10190402133300000208.jpg",
              "isOnline": 1,
              "checkTimeLength": 10,
              "ramark": null,
              "createTime": "2019-04-02 13:34:28",
              "selfUrl": "https://mobilecodec.alipay.com/show.htm?code=pvx09621eoclmzf3harqa5f&picSize=M",
              "withholdUrl": null,
              "hostUrl": "http://apply.epicbm.cn",
              "canGet": "true"
            }, {
              "id": "CP190402133400000211",
              "productName": "收钱吧立牌",
              "isNaturalMonth": 1,
              "productDesc": "该产品手续费0.38%，支持京东白条、蚂蚁花呗扫码付款。该产品免费向客户提供。办理需提供门店照、门头照以及收银台照。详情请咨询客服！",
              "creditAmount": 298,
              "deductions": 299.0,
              "logoImg": "/imgs/sqblp.png",
              "titlePicture": "/upload/201904/02/10190402133300000208.jpg",
              "isOnline": 1,
              "checkTimeLength": 10,
              "ramark": null,
              "createTime": "2019-04-02 13:34:28",
              "selfUrl": "https://mobilecodec.alipay.com/show.htm?code=pvx09621eoclmzf3harqa5f&picSize=M",
              "withholdUrl": null,
              "hostUrl": "http://apply.epicbm.cn",
              "canGet": "false"
            }, {
              "id": "CP190402133400000212",
              "productName": "拉卡拉智能POS",
              "isNaturalMonth": 1,
              "productDesc": "该产品刷卡手续费0.6%，支持扫码付款，刷卡实时到账，单笔刷卡额度30万。支持随身携带外地收款，通用网络WIFI+4G。详情请咨询客服！",
              "creditAmount": 298,
              "deductions": 299.0,
              "logoImg": "/imgs/lklznpos.png",
              "titlePicture": "/upload/201904/02/10190402133300000208.jpg",
              "isOnline": 1,
              "checkTimeLength": 10,
              "ramark": null,
              "createTime": "2019-04-02 13:34:28",
              "selfUrl": "https://mobilecodec.alipay.com/show.htm?code=pvx09621eoclmzf3harqa5f&picSize=M",
              "withholdUrl": null,
              "hostUrl": "http://apply.epicbm.cn",
              "canGet": "false"
            }, {
              "id": "CP190402133400000213",
              "productName": "收钱吧扫码王",
              "isNaturalMonth": 1,
              "productDesc": "该产品手续费0.38%，支持京东白条、蚂蚁花呗扫码付款。办理需提供门店照、门头照以及收银台照。详情请咨询客服！",
              "creditAmount": 298,
              "deductions": 299.0,
              "logoImg": "/imgs/sqbsmw.png",
              "titlePicture": "/upload/201904/02/10190402133300000208.jpg",
              "isOnline": 1,
              "checkTimeLength": 10,
              "ramark": null,
              "createTime": "2019-04-02 13:34:28",
              "selfUrl": "https://mobilecodec.alipay.com/show.htm?code=pvx09621eoclmzf3harqa5f&picSize=M",
              "withholdUrl": null,
              "hostUrl": "http://apply.epicbm.cn",
              "canGet": "false"
            }, {
              "id": "CP190402133400000213",
              "productName": "收钱吧小白盒",
              "isNaturalMonth": 1,
              "productDesc": "该产品手续费0.38%，支持京东白条、蚂蚁花呗扫码付款，需连接电脑使用！办理需提供门店照、门头照以及收银台照。详情请咨询客服！",
              "creditAmount": 298,
              "deductions": 299.0,
              "logoImg": "/imgs/sqbxbh.png",
              "titlePicture": "/upload/201904/02/10190402133300000208.jpg",
              "isOnline": 1,
              "checkTimeLength": 10,
              "ramark": null,
              "createTime": "2019-04-02 13:34:28",
              "selfUrl": "https://mobilecodec.alipay.com/show.htm?code=pvx09621eoclmzf3harqa5f&picSize=M",
              "withholdUrl": null,
              "hostUrl": "http://apply.epicbm.cn",
              "canGet": "false"
            }];
            $ctx.ok({
              status: 0,
              data: {
                key: 0,
                msg: products
              }
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _list.apply(this, arguments);
}

function renderPage(_x2) {
  return _renderPage.apply(this, arguments);
}

function _renderPage() {
  _renderPage = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2($ctx) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return $ctx.render('products/list', {
              "status": 0,
              "data": {
                "key": 0,
                "msg": {
                  "pageHeaderImg": "/imgs/klcs.jpg",
                  "productName": "考拉超收",
                  "noticeInfo": "该产品激活后拉卡拉会赠送您一个月0.5%+3手续费使用时长，使用过期后，恢复至0.6%+3。如需延长0.5%+3手续费时长，需推荐客户使用本产品，推荐成功一名，拉卡拉奖励3个月时长，和50元现金，可无限叠加。请您收到货后10天内激活，否则系统将会扣除您“信用借还”冻结100元押金，请您按要求使用产品"
                }
              }
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _renderPage.apply(this, arguments);
}

function renderItem(_x3) {
  return _renderItem.apply(this, arguments);
}

function _renderItem() {
  _renderItem = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3($ctx) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return $ctx.render('products/product', {});

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _renderItem.apply(this, arguments);
}

function getAuthUrl(_x4) {
  return _getAuthUrl.apply(this, arguments);
}

function _getAuthUrl() {
  _getAuthUrl = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4($ctx) {
    var redirectUrl;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            redirectUrl = encodeURI('http://39.100.71.78/v1/alipay/redirect/' + $ctx.query.id);
            $ctx.ok({
              status: 0,
              data: {
                key: 0,
                msg: 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2019042364291281&scope=auth_base&redirect_uri=' + redirectUrl
              }
            });

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getAuthUrl.apply(this, arguments);
}

function getProduct(_x5) {
  return _getProduct.apply(this, arguments);
} //生成商户授权资金订单号


function _getProduct() {
  _getProduct = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5($ctx) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            $ctx.ok({
              "status": 0,
              "data": {
                "key": 0,
                "msg": {
                  "pageHeaderImg": "/imgs/klcs.jpg",
                  "productName": "考拉超收",
                  "noticeInfo": "该产品激活后拉卡拉会赠送您一个月0.5%+3手续费使用时长，使用过期后，恢复至0.6%+3。如需延长0.5%+3手续费时长，需推荐客户使用本产品，推荐成功一名，拉卡拉奖励3个月时长，和50元现金，可无限叠加。请您收到货后10天内激活，否则系统将会扣除您“信用借还”冻结100元押金，请您按要求使用产品"
                }
              }
            });

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _getProduct.apply(this, arguments);
}

function genOutOrderNo(productID) {
  return "".concat(productID, "oon").concat(Date.now());
} //生成商户本次资金操作的请求流水号


function genOutRequestNo(productID) {
  return "".concat(productID, "orn").concat(Date.now());
}

function saveOrder(_x6) {
  return _saveOrder.apply(this, arguments);
}

function _saveOrder() {
  _saveOrder = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6($ctx) {
    var _JSON$parse, openId, productId, userName, userTelphone, userEmail, province, area, county, address, isWithhold, pid, outOrderNo, formData, result, result1, result2;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _JSON$parse = JSON.parse($ctx.request.body.param), openId = _JSON$parse.openId, productId = _JSON$parse.productId, userName = _JSON$parse.userName, userTelphone = _JSON$parse.userTelphone, userEmail = _JSON$parse.userEmail, province = _JSON$parse.province, area = _JSON$parse.area, county = _JSON$parse.county, address = _JSON$parse.address, isWithhold = _JSON$parse.isWithhold;
            pid = "\u8003\u62C9\u8D85\u6536-".concat(productId);
            outOrderNo = genOutOrderNo(productId);
            global.userInfoMap.set(outOrderNo, {
              pid: pid,
              userName: userName,
              userTelphone: userTelphone,
              userEmail: userEmail,
              province: province,
              area: area,
              county: county,
              address: address
            }); // sendMail({openId, pid, userName, userTelphone, userEmail, province, area, county, address, isWithhold})

            _context6.prev = 4;
            formData = new _form["default"]();
            formData.setMethod('get');
            formData.addField('notifyUrl', 'http://39.100.71.78/v1/notify');
            formData.addField('bizContent', {
              outOrderNo: outOrderNo,
              outRequestNo: genOutRequestNo(productId),
              orderTitle: '预授权冻结',
              amount: 0.01,
              productCode: 'PRE_AUTH_ONLINE',
              payeeLogonId: '396493396@qq.com',
              payTimeout: '10d',
              enablePayChannels: "[{\"payChannelType\":\"CREDITZHIMA\"},{\"payChannelType\":\"MONEY_FUND\"}]",
              extraParam: "{\"category\":\"RENT_DIGITAL\"}"
            });
            _context6.next = 11;
            return alipaySdk.exec('alipay.fund.auth.order.app.freeze', {}, {
              formData: formData
            });

          case 11:
            result = _context6.sent;
            result1 = result.split('https://openapi.alipay.com/gateway.do?');
            result2 = result1.slice(1);
            console.log(result2);
            $ctx.ok({
              "status": 0,
              "data": {
                "key": 0,
                "msg": {
                  body: result2[0]
                }
              }
            });
            _context6.next = 22;
            break;

          case 18:
            _context6.prev = 18;
            _context6.t0 = _context6["catch"](4);
            $ctx.ok({
              "status": 1,
              "data": {
                "key": 1,
                "msg": JSON.stringify(_context6.t0)
              }
            });
            console.log(_context6.t0);

          case 22:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[4, 18]]);
  }));
  return _saveOrder.apply(this, arguments);
}