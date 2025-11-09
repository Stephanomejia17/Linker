import { Test, TestingModule } from '@nestjs/testing';
import { EmpresaController } from './empresa.controller';
import { EmpresaService } from './empresa.service';

describe('EmpresaController', () => {
  let controller: EmpresaController;
  let empresaService: EmpresaService;

  const mockEmpresaService = {
    findAll: jest.fn(),
    createEmpresa: jest.fn(),
    getEmpresaById: jest.fn(),
    isEmpresa: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpresaController],
      providers: [
        {
          provide: EmpresaService,
          useValue: mockEmpresaService,
        },
      ],
    }).compile();

    controller = module.get<EmpresaController>(EmpresaController);
    empresaService = module.get<EmpresaService>(EmpresaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all empresas', async () => {
      const empresas = [
        {
          id: '1',
          name_empresa: 'Test Company',
          user: { id: 'user-1' },
        },
      ];

      mockEmpresaService.findAll.mockResolvedValue(empresas);

      const result = await controller.findAll();

      expect(mockEmpresaService.findAll).toHaveBeenCalled();
      expect(result).toEqual(empresas);
    });
  });

  describe('register', () => {
    it('should register a new empresa', async () => {
      const createEmpresaDto = {
        name_empresa: 'Test Company',
        descripcion: 'A test company',
        foto: 'test.jpg',
        NIT: '123456789',
        id_perfil: 'user-1',
      };

      const expectedResult = {
        message: 'Empresa registrada con éxito',
        empresa: { id: 'empresa-1', ...createEmpresaDto },
      };

      mockEmpresaService.createEmpresa.mockResolvedValue(expectedResult);

      const result = await controller.register(createEmpresaDto);

      expect(mockEmpresaService.createEmpresa).toHaveBeenCalledWith(
        createEmpresaDto,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getEmpresa', () => {
    it('should return empresa data by id', async () => {
      const id = 'user-1';
      const empresaData = {
        name_empresa: 'Test Company',
      };

      mockEmpresaService.getEmpresaById.mockResolvedValue(empresaData);

      const result = await controller.getEmpresa(id);

      expect(mockEmpresaService.getEmpresaById).toHaveBeenCalledWith(id);
      expect(result).toEqual(empresaData);
    });
  });

  describe('isEmpresa', () => {
    it('should check if user is empresa', async () => {
      const id = 'user-1';
      const isEmpresa = true;

      mockEmpresaService.isEmpresa.mockResolvedValue(isEmpresa);

      const result = await controller.isEmpresa(id);

      expect(mockEmpresaService.isEmpresa).toHaveBeenCalledWith(id);
      expect(result).toEqual(isEmpresa);
    });
  });
});
