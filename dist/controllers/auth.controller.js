"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;
exports.register = register;
exports.queryUser = queryUser;
exports.updateUser = updateUser;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _webUser = require("../models/webUser.model");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var jwt = {
  secretKey: '#production#Bangood#',
  expires: 60 * 60 * 2
};

function login(_x) {
  return _login.apply(this, arguments);
}

function _login() {
  _login = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee($ctx) {
    var _$ctx$request$body, email, password, user, isMatch, token;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _$ctx$request$body = $ctx.request.body, email = _$ctx$request$body.email, password = _$ctx$request$body.password;
            _context.prev = 1;
            _context.next = 4;
            return _webUser.WebUser.findByName(email);

          case 4:
            user = _context.sent;

            if (!user) {
              $ctx["throw"](423, '该用户不存在');
            }

            _context.next = 8;
            return user.comparePassword(password);

          case 8:
            isMatch = _context.sent;

            if (!isMatch) {
              $ctx["throw"](423, '用户名或密码错误');
            }

            token = genToken(user);
            $ctx.ok({
              message: '登录成功',
              token: token
            });
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](1);
            $ctx["throw"](_context.t0);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 14]]);
  }));
  return _login.apply(this, arguments);
}

function register(_x2) {
  return _register.apply(this, arguments);
}

function _register() {
  _register = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2($ctx) {
    var _$ctx$request$body2, email, password, confirmPassword, fullName, user, result;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _$ctx$request$body2 = $ctx.request.body, email = _$ctx$request$body2.email, password = _$ctx$request$body2.password, confirmPassword = _$ctx$request$body2.confirmPassword, fullName = _$ctx$request$body2.fullName;

            if (!(email && password && password === confirmPassword)) {
              _context2.next = 9;
              break;
            }

            user = new _webUser.WebUser({
              userName: fullName,
              email: email,
              password: password
            });
            _context2.next = 5;
            return user.save();

          case 5:
            result = _context2.sent;

            if (result) {
              $ctx.ok({
                message: '注册成功',
                token: genToken(result)
              });
            }

            _context2.next = 10;
            break;

          case 9:
            $ctx.ok({
              message: '注册失敗'
            });

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _register.apply(this, arguments);
}

function queryUser(_x3) {
  return _queryUser.apply(this, arguments);
}

function _queryUser() {
  _queryUser = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3($ctx) {
    var user, userHead, isAdmin, userName, email, _id;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return checkToken($ctx, true);

          case 3:
            user = _context3.sent;
            userHead = user.userHead, isAdmin = user.isAdmin, userName = user.userName, email = user.email, _id = user._id;
            $ctx.ok({
              data: {
                id: _id,
                userHead: userHead,
                isAdmin: isAdmin,
                userName: userName,
                email: email
              }
            });
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            $ctx.ok({
              error: _context3.t0.message
            });

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return _queryUser.apply(this, arguments);
}

function updateUser(_x4) {
  return _updateUser.apply(this, arguments);
}

function _updateUser() {
  _updateUser = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4($ctx) {
    var userHead;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            userHead = $ctx.request.body.userHead;
            _context4.next = 4;
            return _webUser.WebUser.findOneAndUpdate({
              _id: $ctx.state.user.id
            }, {
              userHead: userHead
            });

          case 4:
            $ctx.ok({
              data: null
            });
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            $ctx.ok({
              error: _context4.t0.message
            });

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return _updateUser.apply(this, arguments);
}

function genToken($user) {
  var token = _jsonwebtoken["default"].sign({
    id: $user._id,
    secret: $user.appSecret,
    userName: $user.userName,
    userHead: $user.userHead,
    pleaseFuckMe: $user.isAdmin
  }, jwt.secretKey, {
    expiresIn: jwt.expires
  });

  return token;
}

function checkToken(_x5, _x6) {
  return _checkToken.apply(this, arguments);
}

function _checkToken() {
  _checkToken = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5($ctx, $getUser) {
    var token, user;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            token = $ctx.state.user;

            if (!token) {
              _context5.next = 16;
              break;
            }

            _context5.next = 4;
            return _webUser.WebUser.findById(token.id);

          case 4:
            user = _context5.sent;

            if (!user) {
              _context5.next = 13;
              break;
            }

            if (!$getUser) {
              _context5.next = 10;
              break;
            }

            return _context5.abrupt("return", user);

          case 10:
            return _context5.abrupt("return", genToken(user));

          case 11:
            _context5.next = 14;
            break;

          case 13:
            $ctx["throw"](501, 'token信息异常');

          case 14:
            _context5.next = 17;
            break;

          case 16:
            $ctx["throw"](404, 'token丢失');

          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _checkToken.apply(this, arguments);
}