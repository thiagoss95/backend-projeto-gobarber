import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    // Inicializa o repositório para a constante 'usersRepository'
    const usersRepository = getRepository(User);

    // Validação se o email informado já está em uso
    const userExist = await usersRepository.findOne({
      where: { email },
    });

    if (userExist) {
      throw Error('Email already in use.');
    }

    // Criptografia da senha
    const hashedPassword = await hash(password, 8);

    // Criação do usuário após a validação do email
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    // Salva o novo usuário no banco de dados (commit)
    await usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;
