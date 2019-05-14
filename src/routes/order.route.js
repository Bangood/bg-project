import Router from 'koa-router';
import { create} from '../controllers/order.controller';
const router = new Router();
router.post('/', create);

export default router;