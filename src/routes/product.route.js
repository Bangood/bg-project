import Router from 'koa-router';
import { create, update, del, list, renderPage, renderListPage, findOne,getAuthUrl,h5InvokeAlipay } from '../controllers/product.controller';
const router = new Router();
router
    
    .get('/public/', renderPage) //获取产品页面 public
    .get('/public/list-page', renderListPage) //获取产品列表页面 public
    .get('/public/h5InvokeAlipay',h5InvokeAlipay) //获取产品页面，h5唤起支付宝 public
    .get('/public/list', list) //获取产品列表 public
    .get('/public/getauthurl',getAuthUrl)
    .get('/public/:id', findOne) //查询产品 public
    .post('/private', create) //创建产品
    .post('/private/:id', update) //更新产品
    .delete('/private/:id', del); //删除产品


export default router;