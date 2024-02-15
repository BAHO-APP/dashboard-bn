import { Router } from 'express';
import trafficRouter from './traffic.routes';

const router = Router();

router.use('/traffic', trafficRouter);

export default router;
