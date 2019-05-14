import Router from 'koa-router';
import { create, update, del, list, showPage, findOne } from '../controllers/product.controller';
const router = new Router();
router
    .post('/', create)
    .get('/', showPage)
    .get('/list', list)
    .get('/:id', findOne)
    .post('/:id', update)
    .delete('/:id', del);
    

export default router;