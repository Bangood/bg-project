import {AlipaySDK} from '../utils/AlipaySDK';
import bgLogger from 'bg-logger';
const logger = new bgLogger({env:process.env.NODE_ENV});
const alipaySDK = AlipaySDK.getInstance();
// alipay.trade.pay(统一收单交易支付接口)
async function tradePay($ctx){
    try {
        let {outTradeNo,authNo,sellerId,buyerId,storeId,totalAmount} = $ctx.request.body;
        let result = await alipaySDK.exec('alipay.trade.pay',{
            bizContent: {
                outTradeNo,
                productCode: 'PRE_AUTH_ONLINE',
                authNo,
                subject: '预授权转支付',
                totalAmount,
                sellerId:'2088431978724276',
                buyerId,
                storeId,
                body: '预授权解冻转支付',
                authConfirmMode: 'COMPLETE'
            },
            notifyUrl: 'http://39.100.232.50/v1/gateway'
        });
        logger.info(`tradePay-result:${JSON.stringify(result)}`);
        $ctx.ok(result);
    }catch(err){
        logger.error(err);
    }
}
// alipay.fund.auth.order.unfreeze 资金授权解冻 
async function fundAuthUnfreeze($ctx){
    try {
        let {authNo,outRequestNo,amount,remark} = $ctx.request.body;
        let result = await alipaySDK.exec('alipay.fund.auth.order.unfreeze',{
            bizContent:{
                authNo,
                outRequestNo,
                amount,
                remark
            },
             notifyUrl: 'http://39.100.232.50/v1/gateway'
        })
        logger.info(`开始资金授权解冻：${outRequestNo}`);
        $ctx.ok(result);
    }catch($err){
        logger.error($err);
    }
}
async function redirect($ctx) {
    let { app_id, source, scope, auth_code,pid } = $ctx.query;
    try {
        let result = await alipaySDK.exec('alipay.system.oauth.token', {
            grantType: 'authorization_code',
            code: auth_code,
        }, {
            validateSign: true,
            log: console
        });

        // $ctx.redirect(`/v1/products/${$ctx.params['id']}?productId=`+$ctx.params['id']+`&paa_id=${app_id}&source=${source}&scope=${scope}&auth_code=${auth_code}`)
        logger.info(JSON.stringify(result));
        $ctx.redirect('/v1/product/public?id='+pid);
    } catch (err) {
        logger.error(err);
    }

}
export {tradePay,fundAuthUnfreeze,redirect};