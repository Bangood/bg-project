import { AlipaySDK } from '../utils/AlipaySDK';
import { OrderModel } from '../models/order.model';
import { Redis } from '../utils/Redis';
import { sendMail } from '../utils/email';
import { merchantPublicKey } from '../config/alipay.config';
const alipaySDK = AlipaySDK.getInstance();
const redisClient = Redis.getInstance();
//网关验证
async function verify(ctx) {
    try {
        const result = await alipaySDK.checkNotifySignForGateway(ctx.request.body);
        if (result) {
            let sign = await alipaySDK.signForGateway();
            ctx.response.type = 'text/xml;charset=GBK';
            return ctx.body = `<?xml version="1.0" encoding="GBK"?><alipay><response><biz_content>${merchantPublicKey}</biz_content><success>true</success></response><sign>${sign}</sign><sign_type>RSA2</sign_type></alipay>`;

        }
    } catch (err) {
        console.log(err);
    }
}
//alipay.fund.auth.order.app.freeze(线上资金授权冻结接口)
async function fundAuchFreeze($ctx) {
    try {
        let result = await alipaySDK.checkNotifySign($ctx.request.body);
        if(!result){
            return;
        }
        const { out_order_no, total_freeze_amount, total_pay_amount, out_request_no, status, operation_id, auth_no } = $ctx.request.body;
        let order = await redisClient.get(out_order_no);
        const { userName, productId, userTelphone, province, area, county, address } = JSON.parse(order);
        await OrderModel.create({
            userName,
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
        });
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
        console.log($err);
    }
}

async function gateway($ctx) {
    const body = $ctx.request.body;
    console.log($ctx.request.body);
    if (body.service === 'alipay.service.check') {
        console.log('alipay.service.check');
        return verify($ctx);
    }
    if ($ctx.request.body.notify_type === 'fund_auth_freeze') {
        return fundAuchFreeze($ctx);
    }
}
export { gateway };