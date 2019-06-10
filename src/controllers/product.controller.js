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

    //    await $ctx.render('products/product');
    await $ctx.redirect('https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2019042364291281&scope=auth_base&redirect_uri=http%3A%2F%2F39.100.71.78%2Fv1%2Fgateway')
}
async function getAuthUrl($ctx) {
    $ctx.ok({ status: 0, data: { key: 0, msg: 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2019042364291281&scope=auth_base&redirect_uri=http%3A%2F%2F39.100.71.78%2Fv1%2Falipay%2Fredirect&pid='+$ctx.query.id } })
}
async function renderListPage($ctx) {
    await $ctx.render('products/list');
}

export { create, update, del, list, findOne, renderPage, renderListPage, getAuthUrl };