export interface User {
  id: string;
  name: string;
  document: string;
  password: string;
  status: 'active' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
}
