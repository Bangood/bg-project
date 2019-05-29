import microtime from 'microtime';
import { OrderModel } from '../models/order.model';
import { ProductModel } from '../models/product.model';
import { Redis } from '../utils/Redis';
import { AlipaySDK } from '../utils/AlipaySDK';
import AlipayFormData from 'alipay-sdk/lib/form';
import bgLogger from 'bg-logger';
const logger = new bgLogger({env:process.env.NODE_ENV});
const redisClient = Redis.getInstance();
const alipaySDK = AlipaySDK.getInstance();

async function create($ctx) {
    const id = microtime.now();
    const { productId, userName, userTelphone, province, area, county, address } = $ctx.request.body;
    const outOrderNo = `${productId}oon${id}`;
    const outRequestNo = `${productId}orn${id}`;

    try {
        await redisClient.set(outOrderNo, JSON.stringify({ productId, outOrderNo, outRequestNo, userName, userTelphone, province, area, county, address }))
        console.log(productId)
        const product = await ProductModel.findById(productId);
        const formData = new AlipayFormData();
        formData.setMethod('get');
        formData.addField('notifyUrl', 'http://39.100.71.78/v1/gateway');
        formData.addField('bizContent', {
            outOrderNo: outOrderNo,
            outRequestNo: outRequestNo,
            orderTitle: '预授权冻结',
            amount: product.creditAmount,
            productCode: 'PRE_AUTH_ONLINE',
            payeeLogonId: '396493396@qq.com',
            payTimeout: '30m',
            enablePayChannels: "[{\"payChannelType\":\"CREDITZHIMA\"},{\"payChannelType\":\"MONEY_FUND\"}]",
            extraParam: "{\"category\":\"RENT_DIGITAL\"}"
        })
        let result = await alipaySDK.exec('alipay.fund.auth.order.app.freeze', {}, { formData: formData })

        const result1 = result.split('https://openapi.alipay.com/gateway.do?');
        const result2 = result1.slice(1);
        $ctx.ok({
            "status": 0,
            "data": {
                "key": 0,
                "msg": {
                    body: result2[0]
                }
            }
        })
    } catch ($err) {
        logger.error($err)
    }


}
async function update() {}
async function del() {}
async function list($ctx) {
    try {
        const result = await OrderModel.find({});
        $ctx.ok({ data: result });
    } catch ($err) {
        logger.error($err);
        $ctx.ok({ error: $err.message });
    }
}
export { create, list };