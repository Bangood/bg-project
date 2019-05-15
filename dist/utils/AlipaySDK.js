"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlipaySDK = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _alipaySdk = _interopRequireDefault(require("alipay-sdk"));

var _crypto = _interopRequireDefault(require("crypto"));

var _alipay = require("../config/alipay.config");

var ALIPAY_ALGORITHM_MAPPING = {
  RSA: 'RSA-SHA1',
  RSA2: 'RSA-SHA256'
};

var AlipaySDK =
/*#__PURE__*/
function () {
  function AlipaySDK() {
    (0, _classCallCheck2["default"])(this, AlipaySDK);
    this.instance = null;
  }

  (0, _createClass2["default"])(AlipaySDK, null, [{
    key: "getInstance",
    value: function getInstance() {
      if (!this.instance) {
        this.instance = new _alipaySdk["default"]({
          appId: _alipay.appID,
          privateKey: _alipay.merchantPrivateKey,
          alipayPublicKey: _alipay.alipayPublicKey
        }); //为网关验签

        this.instance.checkNotifySignForGateway = function (postData) {
          var signStr = postData.sign;
          var signType = postData.sign_type || 'RSA2';

          if (!this.config.alipayPublicKey || !signStr) {
            return false;
          }

          var signArgs = Object.assign({}, postData); // 除去sign、sign_type 皆是待验签的参数。

          delete signArgs.sign;
          var decodeSign = Object.keys(signArgs).sort().filter(function (val) {
            return val;
          }).map(function (key) {
            var value = signArgs[key];

            if (Array.prototype.toString.call(value) !== '[object String]') {
              value = JSON.stringify(value);
            }

            return "".concat(key, "=").concat(decodeURIComponent(value));
          }).join('&');

          var verifier = _crypto["default"].createVerify(ALIPAY_ALGORITHM_MAPPING[signType]);

          verifier.update(decodeSign, 'utf8');
          return verifier.verify(this.config.alipayPublicKey, signStr, 'base64');
        }; //为网关签名


        this.instance.signForGateway = function () {
          return _crypto["default"].createSign('RSA-SHA256').update("<biz_content>".concat(_alipay.merchantPublicKey, "</biz_content><success>true</success>"), 'utf8').sign(this.config.privateKey, 'base64');
        };

        return this.instance;
      }

      return this.instance;
    }
  }]);
  return AlipaySDK;
}();

exports.AlipaySDK = AlipaySDK;