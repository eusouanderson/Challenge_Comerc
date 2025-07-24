export interface Client {
  id: string;
  name: string;
  lastname: string;
  cpf: string;
  email: string;
  cell: string;
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  uf: string;
  password: string;
  status: 'active' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
}
