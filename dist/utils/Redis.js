"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Redis = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _redis = _interopRequireDefault(require("redis"));

var _util = require("util");

var Redis =
/*#__PURE__*/
function () {
  function Redis() {
    (0, _classCallCheck2["default"])(this, Redis);
    this.instance = null;
    this.client = _redis["default"].createClient({
      host: '',
      port: 6379,
      retry_strategy: function retry_strategy($option) {
        if ($options.error && $options.error.code === 'ECONNREFUSED') {
          // End reconnecting on a specific error and flush all commands with
          // a individual error
          return new Error('The server refused the connection');
        }

        if ($options.total_retry_time > 1000 * 60 * 60) {
          // End reconnecting after a specific timeout and flush all commands
          // with a individual error
          return new Error('Retry time exhausted');
        }

        if ($options.attempt > 3) {
          // End reconnecting with built in error
          return undefined;
        } // reconnect after


        return Math.min($options.attempt * 100, 3000);
      }
    });
    this.client.on("error", function ($err) {
      console.log("Error" + $err);
    });
    this.client.on('connect', function () {
      console.log('redis connection');
    });
    this.client.on('end', function () {
      console.log('an established Redis server connection has closed');
    });
    this.client.on('reconnecting', function ($err) {
      console.log("redis \u6B63\u5728\u91CD\u65B0\u8FDE\u63A5......".concat($err.attempt));
    });
    this.getAsync = (0, _util.promisify)(this.client.get).bind(this.client);
    this.setAsync = (0, _util.promisify)(this.client.set).bind(this.client);
  }

  (0, _createClass2["default"])(Redis, [{
    key: "set",
    value: function () {
      var _set = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee($key, $val) {
        var $expire,
            res,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                $expire = _args.length > 2 && _args[2] !== undefined ? _args[2] : 60 * 5;
                _context.prev = 1;
                _context.next = 4;
                return this.setAsync($key, $val, 'EX', $expire);

              case 4:
                res = _context.sent;
                return _context.abrupt("return", res);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                console.log(_context.t0);
                return _context.abrupt("return", null);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 8]]);
      }));

      function set(_x, _x2) {
        return _set.apply(this, arguments);
      }

      return set;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2($key) {
        var res;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.getAsync($key);

              case 3:
                res = _context2.sent;
                return _context2.abrupt("return", res);

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);
                return _context2.abrupt("return", null);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 7]]);
      }));

      function get(_x3) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!this.instance) {
        this.instance = new Redis();
      }

      return this.instance;
    }
  }]);
  return Redis;
}();

exports.Redis = Redis;