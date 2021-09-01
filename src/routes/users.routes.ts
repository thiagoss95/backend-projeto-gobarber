import { Router } from 'express';
import { UserResponseInterface } from '../interfaces/UserResponseInterface';
import CreateUserService from '../services/CreateUserService';

const userRouter = Router();

userRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    // Para que não seja retornada a senha no response
    const userResponse: UserResponseInterface = { ...user };
    delete userResponse.password;

    return response.json(userResponse);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default userRouter;
