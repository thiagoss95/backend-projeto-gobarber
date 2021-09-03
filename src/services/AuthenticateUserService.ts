import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid email/password combination.');
    }

    // user.password -> senha criptografada
    // password -> senha não criptografada

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new Error('Invalid email/password combination.');
    }

    // Autenticação ocorreu corretamente
    const token = sign({}, '7a1fd6322b01d21e8d682770ba3a7709', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
