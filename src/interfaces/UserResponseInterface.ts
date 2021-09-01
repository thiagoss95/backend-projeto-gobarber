// Interface criada para retorno da response de criação de usuário sem o
// retorno da senha
export interface UserResponseInterface {
  name: string;
  email: string;
  password?: string;
}
