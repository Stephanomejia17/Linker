import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with correct dto', () => {
      const createAuthDto: CreateAuthDto = {};
      const result = controller.create(createAuthDto);
      expect(result).toBe('This action adds a new auth');
    });
  });

  describe('findAll', () => {
    it('should return all auth', () => {
      const result = controller.findAll();
      expect(result).toBe('This action returns all auth');
    });
  });

  describe('findOne', () => {
    it('should return one auth by id', () => {
      const id = '1';
      const result = controller.findOne(id);
      expect(result).toBe('This action returns a #1 auth');
    });
  });

  describe('update', () => {
    it('should update an auth', () => {
      const id = '1';
      const updateAuthDto: UpdateAuthDto = {};
      const result = controller.update(id, updateAuthDto);
      expect(result).toBe('This action updates a #1 auth');
    });
  });

  describe('remove', () => {
    it('should remove an auth', () => {
      const id = '1';
      const result = controller.remove(id);
      expect(result).toBe('This action removes a #1 auth');
    });
  });
});
