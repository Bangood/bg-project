import Router from 'koa-router';
import { login, register } from '../controllers/auth.controller';
const router = new Router();


router.post('/login', login)
    .post('/register', register);


export default router;