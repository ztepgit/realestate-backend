import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

// ✅ mock session (มี destroy)
const mockSession = () => {
  return (req, res, next) => {
    req.session = {
      destroy: (cb: Function) => cb(null),
    };
    next();
  };
};

describe('AuthController', () => {
  let app: INestApplication;
  let authService: AuthService;

  const mockAuthService = {
    signup: jest.fn(),
    login: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.use(mockSession()); // ✅ session mock
    await app.init();

    authService = moduleRef.get(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  // ---------------- SIGNUP ----------------
  describe('POST /auth/signup', () => {
    it('should signup successfully', async () => {
      mockAuthService.signup.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
      });

      const res = await request(app.getHttpServer()).post('/auth/signup').send({
        email: 'test@example.com',
        password: '123456',
      });

      expect(res.status).toBe(201);
      expect(authService.signup).toHaveBeenCalled();
      expect(res.body.email).toBe('test@example.com');
    });

    it('should fail when body invalid', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/signup')
        .send({ email: 'bad-email' });

      expect(res.status).toBe(400);
    });
  });

  // ---------------- LOGIN ----------------
  describe('POST /auth/login', () => {
    it('should login and set session', async () => {
      mockAuthService.login.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
      });

      const res = await request(app.getHttpServer()).post('/auth/login').send({
        email: 'test@example.com',
        password: '123456',
      });

      expect(res.status).toBe(200);
      expect(res.body.email).toBe('test@example.com');
      expect(authService.login).toHaveBeenCalled();
    });

    it('should fail when login invalid', async () => {
      const res = await request(app.getHttpServer()).post('/auth/login').send({
        email: '',
        password: '',
      });

      expect(res.status).toBe(400);
    });
  });

  // ---------------- LOGOUT ----------------
  describe('POST /auth/logout', () => {
    it('should logout successfully', async () => {
      const res = await request(app.getHttpServer()).post('/auth/logout');

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Logged out successfully');
    });
  });
});
