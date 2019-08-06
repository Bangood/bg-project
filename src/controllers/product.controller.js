import { ProductModel } from '../models/product.model';
import bgLogger from 'bg-logger';
const logger = new bgLogger({ env: process.env.NODE_ENV });

async function create($ctx) {
    try {
        const { name, desc, creditAmount, canApply, logoUrl } = $ctx.request.body;
        const createTime = Date.now();
        const result = await ProductModel.create({ name, desc, creditAmount, logoUrl, canApply, createTime })
        $ctx.ok(result);
    } catch ($err) {
        logger.error($err);
        $ctx.ok($err);
    }
}
async function update($ctx) {
    try {
        const id = $ctx.params.id;
        const result = await ProductModel.findByIdAndUpdate(id, $ctx.request.body);
        $ctx.ok(result);
    } catch ($err) {
        logger.error($err);
        $ctx.ok($err);
    }
}
async function del($ctx) {
    try {
        const id = $ctx.params.id;
        const result = await ProductModel.findByIdAndRemove(id);
        $ctx.ok({ status: 0, data: { key: 0, msg: result } });
    } catch ($err) {
        logger.error($err);
        $ctx.ok($err);
    }
}
async function list($ctx) {
    try {
        const result = await ProductModel.find({});
        $ctx.ok({ status: 0, data: { key: 0, msg: result } });
    } catch ($err) {
        logger.error($err);
        $ctx.ok($err);
    }
}
async function findOne($ctx) {
    try {
        const id = $ctx.params.id;
        const product = await ProductModel.findById(id);
        logger.info(`获取产品信息：${product.name}`);
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
        logger.error($err);
    }
}
async function renderPage($ctx) {

    await $ctx.render('products/product');
}
async function getAuthUrl($ctx) {
    $ctx.ok({ status: 0, data: { key: 0, msg: 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2019042364291281&scope=auth_base&redirect_uri=http%3A%2F%2F39.100.232.50%2Fv1%2Faliapi%2Fredirect&pid=' + $ctx.query.id } })
}
async function renderListPage($ctx) {
    await $ctx.render('products/list');
}
async function h5InvokeAlipay($ctx){
    await $ctx.redirect('alipays://platformapi/startapp?appId=20000067&url=https%3A%2F%2Fopenauth.alipay.com%2Foauth2%2FpublicAppAuthorize.htm%3Fapp_id%3D2019042364291281%26scope%3Dauth_base%26redirect_uri%3Dhttp%253A%252F%252F39.100.71.78%252Fv1%252Faliapi%252Fredirect%26pid%3D5cda6bd18d205f4ea85377e1');
}
export { create, update, del, list, findOne, renderPage, renderListPage, getAuthUrl,h5InvokeAlipay };