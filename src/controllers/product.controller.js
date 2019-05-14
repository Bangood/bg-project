import { ProductModel } from '../models/product.model';

async function create($ctx) {
    try {
        const { name, desc, creditAmount, canApply, logoUrl } = $ctx.request.body;
        const createTime = Date.now();
        const result = await ProductModel.create({ name, desc, creditAmount, logoUrl, canApply, createTime })
        $ctx.ok(result);
    } catch ($err) {
        console.log($err);
        $ctx.ok($err);
    }
}
async function update($ctx) {
    try {
        const id = $ctx.params.id;
        const result = await ProductModel.findByIdAndUpdate(id, $ctx.request.body);
        $ctx.ok(result);
    } catch ($err) {
        console.log($err);
        $ctx.ok($err);
    }
}
async function del($ctx) {
    try {
        const id = $ctx.params.id;
        const result = await ProductModel.findByIdAndRemove(id);
        $ctx.ok({ status: 0, data: { key: 0, msg: result } });
    } catch ($err) {
        console.log($err);
        $ctx.ok($err);
    }
}
async function list($ctx) {
    try {
        const result = await ProductModel.find({});
        $ctx.ok({ status: 0, data: { key: 0, msg: result } });
    } catch ($err) {
        console.log($err);
        $ctx.ok($err);
    }
}
async function findOne($ctx){
    try {
        const id = $ctx.params.id;
        const product = await ProductModel.findById(id);
        $ctx.ok({
            status: 0,
            data: {
                key: 0,
                msg: {
                    pageHeaderImg: product.logoUrl,
                    productName: product.name,
                    noticeInfo: product.desc
                }
            }
        })
    } catch ($err) {
        console.log($err);
    }
}
async function showPage($ctx) {
   await $ctx.render('products/product');
}

export { create, update, del, list, findOne,showPage };