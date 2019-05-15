"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MongoDB = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MongoDB =
/*#__PURE__*/
function () {
  function MongoDB() {
    _classCallCheck(this, MongoDB);

    this.instance = null;
  }

  _createClass(MongoDB, null, [{
    key: "getInstance",
    value: function getInstance() {
      if (!this.instance) {
        this.instance = _mongoose["default"].createConnection('mongodb://bangood:alipay15196634454@ds155076.mlab.com:55076/alipay', {
          useNewUrlParser: true,
          useFindAndModify: false
        });
        this.instance.once('open', function () {
          console.log('hi');
        });
        this.instance.once('close', function () {
          console.log('hiclose');
        });
      }

      return this.instance;
    }
  }]);

  return MongoDB;
}();

exports.MongoDB = MongoDB;