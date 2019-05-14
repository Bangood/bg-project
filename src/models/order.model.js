import mongoose from 'mongoose';
import {MongoDB} from '../utils/MongoDB';
const OrderSchema = new mongoose.Schema({
    productId:String,
    userName:String,
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
    authNo:String
}, { versionKey: false });
export const OrderModel = MongoDB.getInstance().model('Orders', OrderSchema);