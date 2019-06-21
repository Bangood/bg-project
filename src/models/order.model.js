import mongoose from 'mongoose';
import {MongoDB} from '../utils/MongoDB';
const OrderSchema = new mongoose.Schema({
    productId:String,
    userName:String,
    userId:String,
    userTelphone:String,
    province:String,
    area: String,
    county:String,
    address: String,
    outOrderNo:String,
    outRequestNo:String,
    totalFreezeAmount:Number,
    totalPayAmount:Number,
    operationId:String,
    authNo:String,
    createTime:{
        type: Number,
        default:Date.now
    },
    status:Number // 0：冻结中 1：解冻 2：支付
}, { versionKey: false });
export const OrderModel = MongoDB.getInstance().model('Orders', OrderSchema);