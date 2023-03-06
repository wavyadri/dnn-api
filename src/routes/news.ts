import * as NewsController from '../controller/newsController';
import { Router } from 'express';
const router: Router = Router();

router.get('/', NewsController.getNews);

router.get('/:id', NewsController.getNewsBySourceID);

export default router;
