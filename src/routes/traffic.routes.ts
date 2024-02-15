import express from 'express';
import { getUserAgentStats } from '../controllers/analytics.controller';
import { track } from '../controllers/traffic.controller';

const trafficRouter = express.Router();

trafficRouter.get('/', track);
trafficRouter.get('/total-visits', getUserAgentStats);

export default trafficRouter;
