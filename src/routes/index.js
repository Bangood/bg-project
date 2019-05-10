import Router from 'koa-router';
import products from './products.route';
import alipay from './alipay.route';
import notify from './notify.route';
import gateway from './gateway.route';

const router = new Router();
router.prefix('/v1');
router.use('/products',products.routes());
router.use('/alipay',alipay.routes());
router.use('/notify',notify.routes());
router.use('/gateway',gateway.routes());
export default router;