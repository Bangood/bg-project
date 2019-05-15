"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Redis = void 0;

var _redis = _interopRequireDefault(require("redis"));

var _util = require("util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Redis =
/*#__PURE__*/
function () {
  function Redis() {
    _classCallCheck(this, Redis);

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

  _createClass(Redis, [{
    key: "set",
    value: function () {
      var _set = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee($key, $val) {
        var $expire,
            res,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
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
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2($key) {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
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