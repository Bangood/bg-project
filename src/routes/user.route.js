import Router from 'koa-router';
import { queryUser, updateUser } from '../controllers/auth.controller';
const router = new Router();
router.get('/:id', queryUser)
    .post('/:id', updateUser);

export default router;