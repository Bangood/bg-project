import { AlipaySDK } from '../utils/AlipaySDK';
import { OrderModel } from '../models/order.model';
import { Redis } from '../utils/Redis';
import { sendMail } from '../utils/email';
import { merchantPublicKey } from '../config/alipay.config';
import bgLogger from 'bg-logger';
const logger = new bgLogger({ env: process.env.NODE_ENV });
const alipaySDK = AlipaySDK.getInstance();
const redisClient = Redis.getInstance();
//网关验证
async function verify(ctx) {
    logger.info('这是一条网关验证信息');
    try {
        const result = await alipaySDK.checkNotifySignForGateway(ctx.request.body);
        if (result) {
            let sign = await alipaySDK.signForGateway();
            ctx.response.type = 'text/xml;charset=GBK';
            return ctx.body = `<?xml version="1.0" encoding="GBK"?><alipay><response><biz_content>${merchantPublicKey}</biz_content><success>true</success></response><sign>${sign}</sign><sign_type>RSA2</sign_type></alipay>`;

        }
    } catch (err) {
        logger.error(err);
    }
}
//alipay.fund.auth.order.app.freeze(线上资金授权冻结接口)
async function fundAuthFreeze($ctx) {
    logger.info('这是一条线上资金授权冻结信息');
    let result, order;
    try {
        result = await alipaySDK.checkNotifySign($ctx.request.body);
        if (!result) {
            return;
        }
        const { out_order_no, total_freeze_amount, total_pay_amount, out_request_no, operation_id, auth_no, payer_user_id } = $ctx.request.body;
        order = await redisClient.get(out_order_no);
        const { userName, productId, userTelphone, province, area, county, address } = JSON.parse(order);
        logger.info(`开始创建新订单-${out_order_no}`);
        await OrderModel.create({
            userName,
            userId: payer_user_id,
            productId,
            userTelphone,
            province,
            area,
            county,
            address,
            outOrderNo: out_order_no,
            totalFreezeAmount: total_freeze_amount,
            totalPayAmount: total_pay_amount,
            outRequestNo: out_request_no,
            outOrderNo: out_order_no,
            operationId: operation_id,
            authNo: auth_no,
            status: 0
        });
        logger.info(`创建新订单-${out_order_no}成功,并发送邮件`);
        sendMail({
            pid: productId,
            userName,
            userTelphone,
            province,
            area,
            county,
            address,
            outOrderNo: out_order_no,
            totalFreezeAmount: total_freeze_amount,
            totalPayAmount: total_pay_amount,
            outRequestNo: out_request_no,
            outOrderNo: out_order_no,
            operationId: operation_id,
            authNo: auth_no,
        });
        $ctx.body = 'success';
    } catch ($err) {
        logger.error($err);
        logger.info('创建订单出错信息：');
        logger.info(JSON.stringify($ctx.request.body));
        logger.info(order);
    }
}
// alipay.trade.pay  授权转支付 
async function tradePay($ctx) {
    logger.info('这是一条授权转支付信息');
    try {
        const { out_trade_no } = $ctx.request.body;
        const result = await OrderModel.findOneAndUpdate({ outOrderNo: out_trade_no }, { status: 2 });
        $ctx.body = 'success';
    } catch ($err) {
        logger.error($err);
    }
}
//alipay.fund.auth.order.unfreeze 资金授权解冻 
async function fundAuthUnfreeze($ctx) {
    logger.info('这是一条资金授权解冻信息');
    try {
        const { out_order_no, out_request_no } = $ctx.request.body;
        const result = await OrderModel.findOneAndUpdate({ outOrderNo: out_order_no }, { status: 1 });
        logger.info(`资金授权解冻成功：${out_request_no}`)
        $ctx.body = 'success';
    } catch ($err) {
        logger.error($err);
    }
}
async function gateway($ctx) {
    const body = $ctx.request.body;
    logger.info('网关来信息了');
    if (body.service === 'alipay.service.check') {
        return verify($ctx);
    }
    if ($ctx.request.body.notify_type === 'fund_auth_freeze') {
        return fundAuthFreeze($ctx);
    }
    if ($ctx.request.body.notify_type === 'trade_status_sync') {
        return tradePay($ctx);
    }
    if ($ctx.request.body.notify_type === 'fund_auth_unfreeze') {
        return fundAuthUnfreeze($ctx);
    }
    logger.info('这是一条无法解读的信息');
    logger.info(JSON.stringify(body));
    
    return $ctx.ok('无效来源数据！');
}
export { gateway };