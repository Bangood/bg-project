import Router from 'koa-router';
import products from './products.route';
import product from './product.route';
import order from './order.route';
import aliapi from './aliapi.route';
import alipay from './alipay.route';
import notify from './notify.route';
import gateway from './gateway.route';

const router = new Router();
router.prefix('/v1');
router.use('/product',product.routes());
router.use('/order',order.routes());
router.use('/products',products.routes());
router.use('/aliapi',aliapi.routes());
router.use('/alipay',alipay.routes());
router.use('/notify',notify.routes());
router.use('/gateway',gateway.routes());
export default router;