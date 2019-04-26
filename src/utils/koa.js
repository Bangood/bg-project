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
        let bb = `biz_content=${biz_content}&charset=${charset}&sign_type=${sign_type},${service}`;
        const result = await alipaySdk.checkNotifySign(ctx.request.body)
        console.log(result);
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