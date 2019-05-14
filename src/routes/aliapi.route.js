import Router from 'koa-router';
import { tradePay, fundAuthUnfreeze } from '../controllers/aliapi.controller';
const router = new Router();
router.post('/trade-pay', tradePay)
    .post('/fund-auth-unfreeze', fundAuthUnfreeze);

export default router;