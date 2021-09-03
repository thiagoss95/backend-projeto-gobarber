import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';
import { UserResponseInterface } from '../interfaces/UserResponseInterface';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    const authenticateUser = new AuthenticateUserService();
    const { user, token } = await authenticateUser.execute({ email, password });

    const userResponse: UserResponseInterface = { ...user };
    delete userResponse.password;

    return response.json({ user: userResponse, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
