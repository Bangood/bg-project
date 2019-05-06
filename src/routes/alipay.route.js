

import Router from 'koa-router';
import {redirect} from '../controllers/alipay.controller';
const router = new Router();
router.get('/redirect/:id', redirect);
 


export default router;