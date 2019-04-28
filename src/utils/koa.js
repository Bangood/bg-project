import Koa from 'koa';
import Router from 'koa-router';
import BodyParser from 'koa-bodyparser';
import AlipaySdk from 'alipay-sdk';
import path from 'path';
import fs from 'fs';
const alipaySdk = new AlipaySdk({
    appId: '2019042364291281',
    privateKey: fs.readFileSync(path.resolve(__dirname,'../../assets/private-key.pem'),'ascii'),
    alipayPublicKey: fs.readFileSync(path.resolve(__dirname,'../../assets/public-key.pem'),'ascii'),
});
const app = new Koa();
const router = new Router();

app.use(BodyParser({ enableTypes: ['json', 'form'] }));

router.post('/gateway.do',async (ctx,next)=>{
    const {sign,charset,biz_content,sign_type,service} = ctx.request.body;
    try {
        // let bb = `biz_content=${biz_content}&charset=${charset}&sign_type=${sign_type},${service}`;
        // const result = await alipaySdk.checkNotifySign(ctx.request.body)
        // if(result){
        //     let return_xml = `
        //     <?xml version="1.0" encoding="GBK"?>
        //     <alipay>
        //         <response>
        //             <biz_content>MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy0Ohf6pq+u9SYY/kTt0VffzdtglGFo0mK5cd+l6BzUrX2SFZaSxqaC98hrGYSvx0cjVCztKK+W7Ob7vjYhHk1+zHA8WO2KFSYQrfRPJNzJivLKSu3N7SwGMDW51kGFkVxJqafnBVm/r7wksaCeQkOA8rNFnPF0epv4jPEX3ua4++syFikneYvx0j6zPT7xefLfm858fOwHq+u1ES+xrO/HCxmG3yzwtHFQsqnxlmAHadC4VOBcU45W6rnhVH144+7hVEGieV7u9grRfuhfLZlkYyphMVHoyWsUSbzKN4V3Pha9S0PFQG4p9txKbY9mxbuzkp2WOsopyQ7EBwKf6n2QIDAQAB</biz_content>
        //             <success>true</success>
        //         </response>
        //         <sign_type>RSA2</sign_type>
        //     </alipay>
        //     `
           
        // }
        return ctx.body = `
        <?xml version="1.0" encoding="GBK"?>
        <alipay>
            <response>
                <biz_content>MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy0Ohf6pq+u9SYY/kTt0VffzdtglGFo0mK5cd+l6BzUrX2SFZaSxqaC98hrGYSvx0cjVCztKK+W7Ob7vjYhHk1+zHA8WO2KFSYQrfRPJNzJivLKSu3N7SwGMDW51kGFkVxJqafnBVm/r7wksaCeQkOA8rNFnPF0epv4jPEX3ua4++syFikneYvx0j6zPT7xefLfm858fOwHq+u1ES+xrO/HCxmG3yzwtHFQsqnxlmAHadC4VOBcU45W6rnhVH144+7hVEGieV7u9grRfuhfLZlkYyphMVHoyWsUSbzKN4V3Pha9S0PFQG4p9txKbY9mxbuzkp2WOsopyQ7EBwKf6n2QIDAQAB</biz_content>
                <success>true</success>
            </response>
            <sign>DXr8LVfHytoZ3RR0K95pzGtA3d9LdpjIjLEis2BDIPQisPwS+FMFxZt9NCMt531EeDj/nbzoIAz8Or7PuqxNfSzNI8qnhirm/Hvr8uedXX9JiQxHu8q3Rw2lJWD8cqQzgf3xwV/+wbN8yuI7s8xjo6odq6NCqrAIu7E0DDfZyKo=</sign>
            <sign_type>RSA2</sign_type>
        </alipay>
        `
    }catch(err){
        console.log('errrrrrrr')
        console.log(err);
    }

});
app.use(router.routes());
router.get('/',(ctx,next)=>{
    ctx.body = 'hi';
})
export function init(port) {
    app.listen(port);
    console.log('listen on :',port);
}