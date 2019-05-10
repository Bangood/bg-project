import Router from 'koa-router';
import { gateway } from '../controllers/gateway.controller';
const router = new Router();
router.post('/', gateway);
export default router;