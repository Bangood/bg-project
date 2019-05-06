import Router from 'koa-router';
import { list, renderPage, renderItem,getAuthUrl,getProduct } from '../controllers/products.controller';
const router = new Router();
router.get('/', renderPage)
    .post('/list', list)
    .post('/getauthurl',getAuthUrl)
    .post('getproduct',getProduct)
    .get('/:productId', renderItem);


export default router;