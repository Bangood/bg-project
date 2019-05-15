"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _MongoDB = require("../utils/MongoDB");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ProductSchema = new _mongoose["default"].Schema({
  name: String,
  desc: String,
  creditAmount: Number,
  logoUrl: String,
  createTime: Number,
  canApply: Boolean
}, {
  versionKey: false
});

var ProductModel = _MongoDB.MongoDB.getInstance().model('Products', ProductSchema);

exports.ProductModel = ProductModel;