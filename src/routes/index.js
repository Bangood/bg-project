import Router from 'koa-router';
import products from './products.route';
import alipay from './alipay.route';

const router = new Router();
router.prefix('/v1');
router.use('/products',products.routes());
router.use('/alipay',alipay.routes());
export default router;