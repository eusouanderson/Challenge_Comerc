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
  status: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}
