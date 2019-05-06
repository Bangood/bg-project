

import Router from 'koa-router';
import {redirect} from '../controllers/alipay.controller';
const router = new Router();
router.get('/redirect', redirect);
 


export default router;