import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import userRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

// As rotas do appointmentsRouter serão resolvidas para o path '/appointments'
routes.use('/appointments', appointmentsRouter);

routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
