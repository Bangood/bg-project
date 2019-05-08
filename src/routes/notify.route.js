import Router from 'koa-router';
import { getNotify, postNotify } from '../controllers/notify.controller';
const router = new Router();
router.get('/', getNotify)
    .post('/', postNotify);


export default router;