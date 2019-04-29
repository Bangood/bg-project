import Koa from 'koa';
import Router from 'koa-router';
import BodyParser from 'koa-bodyparser';
import AlipaySdk from 'alipay-sdk';
import path from 'path';
import fs from 'fs';
const crypto = require("crypto");
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
        let sign = crypto.createSign('RSA-SHA256').update('<biz_content>MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiULinfbmmNmsPiiBaNGTKl8abplmt62WBhmJ8l4b4eK0FM7TbLETBAzUgXY1OG9PjQBXyaADNzhdR1exU15NTSpnCWlqcQGZFzZ6Kt39p/dWU5+ZmObG1cX3ShN0qzVcbPxKBYlZvPsrbiBUZdTEOInF822ftcl4cp8OK0kdoHz5xYo/Vc6Ek2re85WeYja4zM/Y9ysyH7+ZdrgtLNs5iA+JJW1jTVwqfctc/lq4N7KmHA6WezIX2E9KZiOSbF8UnYk3ZerggaHoKvkRxHFIqqyHk8JT5Me+39ad1DSFS5J16Grq9S0ZjHcVYXN3z0NXHqRP5QMLe9pDxPk17dU+xQIDAQAB</biz_content><success>true</success>', 'utf8').sign(fs.readFileSync(path.resolve(__dirname,'../../assets/private-key.pem'),'ascii'), 'base64');
        return ctx.body = `
        <?xml version="1.0" encoding="GBK"?>
        <alipay>
            <response>
                <biz_content>MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy0Ohf6pq+u9SYY/kTt0VffzdtglGFo0mK5cd+l6BzUrX2SFZaSxqaC98hrGYSvx0cjVCztKK+W7Ob7vjYhHk1+zHA8WO2KFSYQrfRPJNzJivLKSu3N7SwGMDW51kGFkVxJqafnBVm/r7wksaCeQkOA8rNFnPF0epv4jPEX3ua4++syFikneYvx0j6zPT7xefLfm858fOwHq+u1ES+xrO/HCxmG3yzwtHFQsqnxlmAHadC4VOBcU45W6rnhVH144+7hVEGieV7u9grRfuhfLZlkYyphMVHoyWsUSbzKN4V3Pha9S0PFQG4p9txKbY9mxbuzkp2WOsopyQ7EBwKf6n2QIDAQAB</biz_content>
                <success>true</success>
            </response>
            <sign>${sign}</sign>
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