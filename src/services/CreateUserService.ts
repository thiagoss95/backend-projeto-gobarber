import { getRepository } from 'typeorm';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    // Inicializa o repositório para a constante 'userRepository'
    const userRepository = getRepository(User);

    // Validação se o email informado já está em uso
    const userExist = await userRepository.findOne({
      where: { email },
    });

    if (userExist) {
      throw Error('Email already in use.');
    }

    // Criação do usuário após a validação do email
    const user = userRepository.create({
      name,
      email,
      password,
    });

    // Salva o novo usuário no banco de dados (commit)
    await userRepository.save(user);
    return user;
  }
}

export default CreateUserService;
