import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new auth', () => {
      const createAuthDto: CreateAuthDto = {};
      const result = service.create(createAuthDto);
      expect(result).toBe('This action adds a new auth');
    });
  });

  describe('findAll', () => {
    it('should return all auth', () => {
      const result = service.findAll();
      expect(result).toBe('This action returns all auth');
    });
  });

  describe('findOne', () => {
    it('should return one auth by id', () => {
      const id = 1;
      const result = service.findOne(id);
      expect(result).toBe('This action returns a #1 auth');
    });
  });

  describe('update', () => {
    it('should update an auth', () => {
      const id = 1;
      const updateAuthDto: UpdateAuthDto = {};
      const result = service.update(id, updateAuthDto);
      expect(result).toBe('This action updates a #1 auth');
    });
  });

  describe('remove', () => {
    it('should remove an auth', () => {
      const id = 1;
      const result = service.remove(id);
      expect(result).toBe('This action removes a #1 auth');
    });
  });
});
