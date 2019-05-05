import Router from 'koa-router';
import products from './products.route';
import * as a from './alipay.route';
const router = new Router();
router.prefix('/v1');
router.use('/products',products.routes());
export default router;