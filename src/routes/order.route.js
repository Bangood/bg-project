import Router from 'koa-router';
import { create, list } from '../controllers/order.controller';
const router = new Router();
router.post('/public/', create) //创建订单
    .get('/private/list', list); //获取订单列表

export default router;