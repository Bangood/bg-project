"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MongoDB = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bgLogger = _interopRequireDefault(require("bg-logger"));

var logger = new _bgLogger["default"]();

var MongoDB =
/*#__PURE__*/
function () {
  function MongoDB() {
    (0, _classCallCheck2["default"])(this, MongoDB);
    this.instance = null;
  }

  (0, _createClass2["default"])(MongoDB, null, [{
    key: "getInstance",
    value: function getInstance() {
      if (!this.instance) {
        this.instance = _mongoose["default"].createConnection('mongodb://bangood:alipay15196634454@ds155076.mlab.com:55076/alipay', {
          useNewUrlParser: true,
          useFindAndModify: false,
          reconnectTries: Number.MAX_VALUE,
          reconnectInterval: 500,
          poolSize: 10,
          useCreateIndex: true,
          autoIndex: false
        });
        this.instance.once('open', function () {
          logger.success('数据库已连接');
        });
        this.instance.once('close', function () {
          logger.error('数据库已断开');
        });
      }

      return this.instance;
    }
  }]);
  return MongoDB;
}();

exports.MongoDB = MongoDB;