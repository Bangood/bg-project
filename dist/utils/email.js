"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendMail = sendMail;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var transporter = _nodemailer["default"].createTransport({
  service: 'qq',
  auth: {
    user: '2117704062@qq.com',
    pass: 'jyysohtzprdudiig'
  }
});

function sendMail(_ref) {
  var userName = _ref.userName,
      userTelphone = _ref.userTelphone,
      province = _ref.province,
      area = _ref.area,
      county = _ref.county,
      address = _ref.address,
      pid = _ref.pid,
      totalFreezeAmount = _ref.totalFreezeAmount,
      totalPayAmount = _ref.totalPayAmount,
      outOrderNo = _ref.outOrderNo,
      outRequestNo = _ref.outRequestNo,
      operationId = _ref.operationId,
      authNo = _ref.authNo;
  transporter.sendMail({
    from: '2117704062@qq.com',
    // sender address
    to: "2419281635@qq.com,287215760@qq.com",
    // list of receivers
    subject: "生活号-商品申请",
    // Subject line
    html: "\n        <div>\n            <h3>\u59D3\u540D:</h3>\n            <span>".concat(userName, "</span>\n        </div>\n        <div>\n            <h3>\u624B\u673A\u53F7\u7801:</h3>\n            <span>").concat(userTelphone, "</span>\n        </div>\n        <div>\n            <h3>\u6240\u5728\u7701\u4EFD:</h3>\n            <span>").concat(province, "</span>\n        </div>\n        <div>\n            <h3>\u6240\u5728\u5730\u5E02:</h3>\n            <span>").concat(area, "</span>\n        </div>\n        <div>\n            <h3>\u6240\u5728\u533A\u53BF:</h3>\n            <span>").concat(county, "</span>\n        </div>\n        <div>\n            <h3>\u8857\u9053\u5730\u5740:</h3>\n            <span>").concat(address, "</span>\n        </div>\n        <div>\n            <h3>\u7533\u8BF7\u7684\u4EA7\u54C1:</h3>\n            <span>").concat(pid, "</span>\n        </div>\n        <div>\n            <h3>\u51BB\u7ED3\u8D44\u91D1:</h3>\n            <span>").concat(totalFreezeAmount, "</span>\n        </div>\n        <div>\n            <h3>\u652F\u4ED8\u8D44\u91D1:</h3>\n            <span>").concat(totalPayAmount, "</span>\n        </div>\n        <div>\n            <h3>\u5546\u6237\u6388\u6743\u8D44\u91D1\u8BA2\u5355\u53F7:</h3>\n            <span>").concat(outOrderNo, "</span>\n        </div>\n        <div>\n            <h3>\u5546\u6237\u672C\u6B21\u8D44\u91D1\u64CD\u4F5C\u7684\u8BF7\u6C42\u6D41\u6C34\u53F7:</h3>\n            <span>").concat(outRequestNo, "</span>\n        </div>\n        <div>\n            <h3>\u8BA2\u5355\u53F7:</h3>\n            <span>").concat(operationId, "</span>\n        </div>\n        <div>\n            <h3>\u6388\u6743\u53F7:</h3>\n            <span>").concat(authNo, "</span>\n        </div>\n        ")
  });
}