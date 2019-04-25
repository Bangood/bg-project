import Koa from 'koa';
import Router from 'koa-router';
import BodyParser from 'koa-bodyparser';
const app = new Koa();
const router = new Router();

app.use(BodyParser({ enableTypes: ['json', 'form'] }));

router.post('/gateway.do',(ctx,next)=>{
    const sign = '';
    const sign_type = '';
    const biz_content = '';
    const service = '';
    const charset = '';
    console.log(ctx.request.body);
});
app.use(router.routes());
router.get('/',(ctx,next)=>{
    ctx.body = 'hi';
})
export function init(port) {
    app.listen(port);
    console.log('listen on :',port);
}