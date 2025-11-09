import { Test, TestingModule } from '@nestjs/testing';
import { EmpresaService } from './empresa.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('EmpresaService', () => {
  let service: EmpresaService;
  let empresaRepository: Repository<Empresa>;
  let userRepository: Repository<User>;

  const mockEmpresaRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  const mockUserRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmpresaService,
        {
          provide: getRepositoryToken(Empresa),
          useValue: mockEmpresaRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<EmpresaService>(EmpresaService);
    empresaRepository = module.get<Repository<Empresa>>(
      getRepositoryToken(Empresa),
    );
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all empresas with user relations', async () => {
      const empresas = [
        {
          id: '1',
          name_empresa: 'Test Company',
          user: { id: 'user-1', email: 'test@example.com' },
        },
      ];

      mockEmpresaRepository.find.mockResolvedValue(empresas);

      const result = await service.findAll();

      expect(mockEmpresaRepository.find).toHaveBeenCalledWith({
        relations: ['user'],
      });
      expect(result).toEqual(empresas);
    });
  });

  describe('createEmpresa', () => {
    it('should create a new empresa successfully', async () => {
      const createEmpresaDto = {
        name_empresa: 'Test Company',
        descripcion: 'A test company',
        foto: 'test.jpg',
        NIT: '123456789',
        id_perfil: 'user-1',
      };

      const user = { id: 'user-1', email: 'test@example.com' };
      const empresaEntity = {
        id: 'empresa-1',
        ...createEmpresaDto,
        user,
      };

      const savedEmpresa = {
        ...empresaEntity,
        id: 'empresa-1',
      };

      mockUserRepository.findOne.mockResolvedValue(user);
      mockEmpresaRepository.create.mockReturnValue(empresaEntity);
      mockEmpresaRepository.save.mockResolvedValue(savedEmpresa);

      const result = await service.createEmpresa(createEmpresaDto);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: createEmpresaDto.id_perfil },
      });
      expect(mockEmpresaRepository.create).toHaveBeenCalledWith({
        ...createEmpresaDto,
        user,
      });
      expect(mockEmpresaRepository.save).toHaveBeenCalledWith(empresaEntity);
      expect(result).toEqual({
        message: 'Empresa registrada con éxito',
        empresa: savedEmpresa,
      });
    });

    it('should throw NotFoundException if user not found', async () => {
      const createEmpresaDto = {
        name_empresa: 'Test Company',
        descripcion: 'A test company',
        foto: 'test.jpg',
        NIT: '123456789',
        id_perfil: 'nonexistent-user',
      };

      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.createEmpresa(createEmpresaDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: createEmpresaDto.id_perfil },
      });
    });
  });

  describe('getEmpresaById', () => {
    it('should return empresa data by user id', async () => {
      const userId = 'user-1';
      const empresa = {
        id: 'empresa-1',
        name_empresa: 'Test Company',
        user: { id: userId },
      };

      mockEmpresaRepository.findOne.mockResolvedValue(empresa);

      const result = await service.getEmpresaById(userId);

      expect(mockEmpresaRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: userId } },
        relations: ['user'],
      });
      expect(result).toEqual({
        name_empresa: empresa.name_empresa,
      });
    });

    it('should return null if empresa not found', async () => {
      const userId = 'user-1';

      mockEmpresaRepository.findOne.mockResolvedValue(null);

      const result = await service.getEmpresaById(userId);

      expect(result).toBeNull();
    });
  });

  describe('isEmpresa', () => {
    it('should return true if user is empresa', async () => {
      const userId = 'user-1';
      const empresa = { id: 'empresa-1', user: { id: userId } };

      mockEmpresaRepository.findOne.mockResolvedValue(empresa);

      const result = await service.isEmpresa(userId);

      expect(mockEmpresaRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: userId } },
      });
      expect(result).toBe(true);
    });

    it('should return false if user is not empresa', async () => {
      const userId = 'user-1';

      mockEmpresaRepository.findOne.mockResolvedValue(null);

      const result = await service.isEmpresa(userId);

      expect(result).toBe(false);
    });
  });
});
