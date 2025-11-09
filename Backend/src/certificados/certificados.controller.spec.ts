import { Test, TestingModule } from '@nestjs/testing';
import { CertificadosController } from './certificados.controller';
import { CertificadosService } from './certificados.service';
import { CreateCertificadoDto } from './dto/create-certificado.dto';
import { UpdateCertificadoDto } from './dto/update-certificado.dto';

describe('CertificadosController', () => {
  let controller: CertificadosController;
  let service: CertificadosService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CertificadosController],
      providers: [
        {
          provide: CertificadosService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CertificadosController>(CertificadosController);
    service = module.get<CertificadosService>(CertificadosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with correct dto', () => {
      const createCertificadoDto: CreateCertificadoDto = {
        entidad_emisora: 'Test',
        nombre_certificado: 'Cert',
      };
      const result = { id_certificado: '1' };
      mockService.create.mockReturnValue(result);

      const response = controller.create(createCertificadoDto);
      expect(mockService.create).toHaveBeenCalledWith(createCertificadoDto);
      expect(response).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return all certificados', () => {
      const result = [{ id_certificado: '1' }];
      mockService.findAll.mockReturnValue(result);

      const response = controller.findAll();
      expect(mockService.findAll).toHaveBeenCalled();
      expect(response).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return one certificado by id', () => {
      const id = '1';
      const result = { id_certificado: '1' };
      mockService.findOne.mockReturnValue(result);

      const response = controller.findOne(id);
      expect(mockService.findOne).toHaveBeenCalledWith(1);
      expect(response).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a certificado', () => {
      const id = '1';
      const updateCertificadoDto: UpdateCertificadoDto = {
        entidad_emisora: 'Updated',
      };
      const result = { affected: 1 };
      mockService.update.mockReturnValue(result);

      const response = controller.update(id, updateCertificadoDto);
      expect(mockService.update).toHaveBeenCalledWith(1, updateCertificadoDto);
      expect(response).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a certificado', () => {
      const id = '1';
      const result = { affected: 1 };
      mockService.remove.mockReturnValue(result);

      const response = controller.remove(id);
      expect(mockService.remove).toHaveBeenCalledWith(1);
      expect(response).toBe(result);
    });
  });
});
