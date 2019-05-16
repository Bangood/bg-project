"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _crypto = _interopRequireDefault(require("crypto"));

var _MongoDB = require("../utils/MongoDB");

var saltRounds = 10;
var WebUserSchema = new _mongoose["default"].Schema({
  userName: String,
  userHead: {
    type: String,
    "default": ''
  },
  isAdmin: {
    type: Boolean,
    "default": false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  appSecret: {
    type: String,
    "default": GetHmac()
  },
  createAt: {
    type: Date,
    "default": Date.now()
  },
  updateAt: {
    type: Date,
    "default": Date.now()
  }
}, {
  versionKey: false
});

function GetHmac() {
  var hmac = _crypto["default"].createHmac('sha256', '5201314');

  hmac.update(Date.now().toString());
  return hmac.digest('hex');
}

WebUserSchema.pre('save',
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee($next) {
    var user, salt, hash;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            user = this;

            if (user.isModified('password')) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", $next());

          case 4:
            _context.next = 6;
            return _bcrypt["default"].genSalt(saltRounds);

          case 6:
            salt = _context.sent;
            _context.next = 9;
            return _bcrypt["default"].hash(this.password, salt);

          case 9:
            hash = _context.sent;
            user.password = hash;
            return _context.abrupt("return", $next());

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", $next(_context.t0));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 14]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

WebUserSchema.methods.comparePassword =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2($password) {
    var isMatch;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _bcrypt["default"].compare($password, this.password);

          case 2:
            isMatch = _context2.sent;
            return _context2.abrupt("return", isMatch);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();

WebUserSchema.statics.findByName =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3($email) {
    var user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return this.findOne({
              email: $email
            });

          case 2:
            user = _context3.sent;
            return _context3.abrupt("return", user);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}();

WebUserSchema.statics.checkToken =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4($token) {
    var secret, user;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            secret = GetHmac();
            _context4.next = 3;
            return this.findOneAndUpdate({
              _id: $token.id
            }, {
              appSecret: secret
            });

          case 3:
            user = _context4.sent;

            if (!($token.secret === user.appSecret)) {
              _context4.next = 9;
              break;
            }

            user.appSecret = secret;
            return _context4.abrupt("return", user);

          case 9:
            throw new Error('token验证未通过!');

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function (_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var WebUser = _MongoDB.MongoDB.getInstance().model('WebUser', WebUserSchema);

exports.WebUser = WebUser;