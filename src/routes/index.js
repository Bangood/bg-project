import Router from 'koa-router';
import product from './product.route';
import order from './order.route';
import aliapi from './aliapi.route';
import gateway from './gateway.route';
import auth from './auth.route';
import user from './user.route';

const router = new Router();
router.prefix('/v1');
router.use('/product',product.routes());
router.use('/order',order.routes());
router.use('/aliapi',aliapi.routes());
router.use('/gateway',gateway.routes());
router.use('/auth',auth.routes());
router.use('/user',user.routes());
export default router;