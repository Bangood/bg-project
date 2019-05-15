"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _MongoDB = require("../utils/MongoDB");

var OrderSchema = new _mongoose["default"].Schema({
  productId: String,
  userName: String,
  userId: String,
  userTelphone: String,
  province: String,
  area: String,
  county: String,
  address: String,
  outOrderNo: String,
  outRequestNo: String,
  totalFreezeAmount: Number,
  totalPayAmount: Number,
  operationId: String,
  authNo: String,
  status: Number // 0：冻结中 1：解冻 2：支付

}, {
  versionKey: false
});

var OrderModel = _MongoDB.MongoDB.getInstance().model('Orders', OrderSchema);

exports.OrderModel = OrderModel;