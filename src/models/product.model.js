import mongoose from 'mongoose';
import {MongoDB} from '../utils/MongoDB';
const ProductSchema = new mongoose.Schema({
    name: String,
    desc:String,
    creditAmount:Number,
    logoUrl: String,
    createTime: Number,
    canApply:Boolean
}, { versionKey: false });
export const ProductModel = MongoDB.getInstance().model('Products', ProductSchema);