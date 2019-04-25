import Koa from 'koa';
import Router from 'koa-router';
const app = new Koa();
const router = new Router();
router.post('/gateway.do',(ctx,next)=>{
    const sign = '';
    const sign_type = '';
    const biz_content = '';
    const service = '';
    const charset = '';
    console.log(ctx.request.body);
});
router.get('/',(ctx,next)=>{
    ctx.body = 'hi';
})
app.use(router.routes());

export function init(port) {
    app.listen(port);
    console.log('listen on :',port);
}