

import Router from 'koa-router';
import {redirect,tradePay} from '../controllers/alipay.controller';
const router = new Router();
router.get('/redirect/:id', redirect)
.post('/trade-pay',tradePay);
 


export default router;