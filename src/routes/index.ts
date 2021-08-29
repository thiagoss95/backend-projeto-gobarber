import { Router } from 'express';
import appointmentsRouter from '../services/appointments.routes';

const routes = Router();

// As rotas do appointmentsRouter serão resolvidas para o path '/appointments'
routes.use('/appointments', appointmentsRouter);

export default routes;
