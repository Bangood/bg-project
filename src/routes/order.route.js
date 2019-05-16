import Router from 'koa-router';
import { create, list } from '../controllers/order.controller';
const router = new Router();
router.post('/', create)
    .get('/list', list);

export default router;