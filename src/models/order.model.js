import mongoose from 'mongoose';
const OrderSchema = new mongoose.Schema({
    userName:String,
    userTelphone:String
}, { versionKey: false });
export const OrderModel = mongoose.model('Orders', OrderSchema);