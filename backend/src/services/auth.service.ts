import { UnauthorizedError } from '@/error/unauthorized.error';
import { ValidationError } from '@/error/validation.error';
import { ClientRepository } from '@/repositories/client.repository';
import { comparePasswords, generateToken } from '@/utils/auth.util';

export class AuthService {
  private repository = new ClientRepository();

  async login({ email, password }: { email: string; password: string }) {
    if (!email || !password) {
      throw new ValidationError('Email and password are required');
    }

    const client = await this.repository.findByEmail(email);
    if (!client || !client.passwordHash) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const passwordMatch = await comparePasswords(password, client.passwordHash);
    if (!passwordMatch) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const token = generateToken({ id: client.id, email: client.email });

    return {
      message: 'Login successful',
      token,
      client: {
        id: client.id,
        name: client.name,
        email: client.email,
      },
    };
  }
}
