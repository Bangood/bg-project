import {AlipaySDK} from '../utils/AlipaySDK';
const alipaySDK = AlipaySDK.getInstance();
//网关验证
async function verify($ctx){
    try {
        const {sign,service,sign_type,biz_content,charset} = ctx.request.body;
        const result = await alipaySDK.checkNotifySign(ctx.request.body);
        console.log(result);
    }catch(err){
        console.log(err);
    }
}
export {verify};