import { db } from '@/db/client';
import { client, users } from '@/schema/schema';
import { hashPassword } from '@/utils/auth.util';
import { faker } from '@faker-js/faker/locale/pt_BR';
import dotenv from 'dotenv';

dotenv.config();

const generateId = () => faker.string.uuid();
const generateCPF = () => faker.helpers.replaceSymbols('###.###.###-##');
const generateCEP = () => faker.location.zipCode('#####-###');
const generateCell = () => {
  return faker.phone.number({ style: 'international' });
};
const hashedPassword = await hashPassword('admin123');

function generateRandomUser() {
  return {
    id: generateId(),
    name: faker.person.fullName(),
    document: generateCPF(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    status: faker.helpers.arrayElement(['active', 'inactive']),
  };
}

function generateRandomClient() {
  return {
    id: generateId(),
    name: faker.person.firstName(),
    lastname: faker.person.lastName(),
    cpf: generateCPF(),
    email: faker.internet.email(),
    cell: generateCell(),
    cep: generateCEP(),
    street: faker.location.streetAddress(),
    neighborhood: faker.location.county(),
    city: faker.location.city(),
    uf: faker.location.state({ abbreviated: true }),
    password: faker.internet.password(),
    status: faker.helpers.arrayElement(['active', 'inactive']),
  };
}

async function seedDatabase() {
  try {
    console.log('⏳ Iniciando seed...');

    await db.insert(users).values({
      id: generateId(),
      name: 'User',
      document: generateCPF(),
      email: 'user@admin.com',
      password: hashedPassword,
      status: 'active',
    });
    console.log('✅ Admin inserido!');

    await db.insert(client).values({
      id: generateId(),
      name: 'Cliente',
      lastname: 'Cliente',
      cpf: generateCPF(),
      email: 'client@admin.com',
      cell: generateCell(),
      cep: generateCEP(),
      street: faker.location.streetAddress(),
      neighborhood: faker.location.county(),
      city: faker.location.city(),
      uf: faker.location.state({ abbreviated: true }),
      password: hashedPassword,
      status: 'active',
    });
    console.log('✅ Cliente Admin inserido!');

    const fakeUsers = Array.from({ length: 10 }, generateRandomUser);
    await db.insert(users).values(fakeUsers);
    console.log('✅ 10 usuários inseridos!');

    const fakeClients = Array.from({ length: 20 }, generateRandomClient);
    await db.insert(client).values(fakeClients);
    console.log('✅ 20 clientes inseridos!');

    console.log('🎉 Seed concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
    process.exit(1);
  }
}

seedDatabase();
