"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _MongoDB = require("../utils/MongoDB");

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