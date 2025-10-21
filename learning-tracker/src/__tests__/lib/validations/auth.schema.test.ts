import { loginSchema, registerSchema } from '@/lib/validations/auth.schema';

describe('Auth Validation Schemas', () => {
  describe('loginSchema', () => {
    it('validates correct login data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
      };
      expect(() => loginSchema.parse(validData)).not.toThrow();
    });

    it('rejects invalid email', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'password123',
      };
      expect(() => loginSchema.parse(invalidData)).toThrow();
    });

    it('rejects short password', () => {
      const invalidData = {
        email: 'test@example.com',
        password: '12345',
      };
      expect(() => loginSchema.parse(invalidData)).toThrow();
    });
  });

  describe('registerSchema', () => {
    it('validates correct registration data', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123',
      };
      expect(() => registerSchema.parse(validData)).not.toThrow();
    });

    it('rejects password without uppercase', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };
      expect(() => registerSchema.parse(invalidData)).toThrow();
    });

    it('rejects password without lowercase', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'PASSWORD123',
      };
      expect(() => registerSchema.parse(invalidData)).toThrow();
    });

    it('rejects password without number', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'PasswordABC',
      };
      expect(() => registerSchema.parse(invalidData)).toThrow();
    });

    it('rejects short name', () => {
      const invalidData = {
        name: 'J',
        email: 'john@example.com',
        password: 'Password123',
      };
      expect(() => registerSchema.parse(invalidData)).toThrow();
    });
  });
});

