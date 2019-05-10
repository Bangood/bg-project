import { AlipaySDK } from '../utils/AlipaySDK';
import { merchantPublicKey } from '../config/alipay.config';
const alipaySDK = AlipaySDK.getInstance();
//网关验证
async function verify(ctx) {
    try {
        const result = await alipaySDK.checkNotifySignForGateway(ctx.request.body);
        if (result) {
            let sign = await alipaySDK.signForGateway();
            ctx.response.type = 'text/xml;charset=GBK';
            return ctx.body = `<?xml version="1.0" encoding="GBK"?><alipay><response><biz_content>${merchantPublicKey}</biz_content><success>true</success></response><sign>${sign}</sign><sign_type>RSA2</sign_type></alipay>`;

        }
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}
async function gateway(ctx){
    const body = ctx.request.body;
    if(body.service==='alipay.service.check'){
        return verify(ctx);
    }
}
export { gateway };