import Router from 'koa-router';
import {verify} from '../controllers/gateway.controller';
const router = new Router();
router.post('/',verify)
.post('/notify',)
export default router;
