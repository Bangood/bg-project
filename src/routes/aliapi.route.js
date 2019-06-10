import Router from 'koa-router';
import { tradePay, fundAuthUnfreeze,redirect } from '../controllers/aliapi.controller';
const router = new Router();
router.post('/trade-pay', tradePay)
    .post('/fund-auth-unfreeze', fundAuthUnfreeze)
    .get('/redirect',redirect);

export default router;