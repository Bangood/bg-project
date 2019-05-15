"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlipaySDK = void 0;

var _alipaySdk = _interopRequireDefault(require("alipay-sdk"));

var _crypto = _interopRequireDefault(require("crypto"));

var _alipay = require("../config/alipay.config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ALIPAY_ALGORITHM_MAPPING = {
  RSA: 'RSA-SHA1',
  RSA2: 'RSA-SHA256'
};

var AlipaySDK =
/*#__PURE__*/
function () {
  function AlipaySDK() {
    _classCallCheck(this, AlipaySDK);

    this.instance = null;
  }

  _createClass(AlipaySDK, null, [{
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