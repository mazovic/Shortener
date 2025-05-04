import { Router } from 'express';
import urlRoutes from '../modules/url/routes/url.routes';

const router = Router();

router.use('/urls', urlRoutes);

export default router;
