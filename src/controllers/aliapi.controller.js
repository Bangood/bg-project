import {AlipaySDK} from '../utils/AlipaySDK';
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
            notifyUrl: 'http://39.100.71.78/v1/gateway'
        });
        console.log('tradePay-result:',result);
    }catch(err){
        console.log(err);
    }
}
// alipay.fund.auth.order.unfreeze 资金授权解冻 
async function fundAuthUnfreeze($ctx){
    try {
        let {authNo,outRequestNo,amount,remark} = $ctx.request.body;
        console.log( $ctx.request.body)
        let result = await alipaySDK.exec('alipay.fund.auth.order.unfreeze',{
            bizContent:{
                authNo,
                outRequestNo,
                amount,
                remark
            },
             notifyUrl: 'http://39.100.71.78/v1/gateway'
        })
        $ctx.ok(result);
    }catch($err){
        console.log($err);
    }
}
async function redirect($ctx) {
    console.log($ctx.params['id']);
    let { app_id, source, scope, auth_code } = $ctx.query;
    try {
        let result = await alipaySdk.exec('alipay.system.oauth.token', {
            grantType: 'authorization_code',
            code: auth_code,
        }, {
            validateSign: true,
            log: console
        });
        console.log(result);

        $ctx.redirect(`/v1/products/${$ctx.params['id']}?productId=`+$ctx.params['id']+`&paa_id=${app_id}&source=${source}&scope=${scope}&auth_code=${auth_code}`)
    } catch (err) {
        console.log(err);
    }

}
export {tradePay,fundAuthUnfreeze};