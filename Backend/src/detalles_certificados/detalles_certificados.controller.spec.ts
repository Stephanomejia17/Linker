import { Test, TestingModule } from '@nestjs/testing';
import { DetallesCertificadosController } from './detalles_certificados.controller';
import { DetallesCertificadosService } from './detalles_certificados.service';
import { CreateDetallesCertificadoDto } from './dto/create-detalles_certificado.dto';
import { UpdateDetallesCertificadoDto } from './dto/update-detalles_certificado.dto';

describe('DetallesCertificadosController', () => {
  let controller: DetallesCertificadosController;
  let service: DetallesCertificadosService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findAllByEmpresa: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetallesCertificadosController],
      providers: [
        {
          provide: DetallesCertificadosService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<DetallesCertificadosController>(
      DetallesCertificadosController,
    );
    service = module.get<DetallesCertificadosService>(
      DetallesCertificadosService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with correct dto', () => {
      const createDetallesCertificadoDto: CreateDetallesCertificadoDto = {
        empresa: { id: 'empresa-1' } as any,
        certificado: { id_certificado: 'cert-1' } as any,
        fecha_emision: new Date(),
        fecha_caducidad: new Date(),
      };
      const result = { id: 1 };
      mockService.create.mockReturnValue(result);

      const response = controller.create(createDetallesCertificadoDto);
      expect(mockService.create).toHaveBeenCalledWith(
        createDetallesCertificadoDto,
      );
      expect(response).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return all detalles certificados', () => {
      const result = [{ id: 1 }];
      mockService.findAll.mockReturnValue(result);

      const response = controller.findAll();
      expect(mockService.findAll).toHaveBeenCalled();
      expect(response).toBe(result);
    });
  });

  describe('findCertificadosForEmpresa', () => {
    it('should return certificados for empresa', async () => {
      const id = 'empresa-1';
      const result = [{ id: 1 }];
      mockService.findAllByEmpresa.mockReturnValue(result);

      const response = await controller.findCertificadosForEmpresa(id);
      expect(mockService.findAllByEmpresa).toHaveBeenCalledWith(id);
      expect(response).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a detalles certificado', () => {
      const id = '1';
      const updateDetallesCertificadoDto: UpdateDetallesCertificadoDto = {
        fecha_emision: new Date(),
      };
      const result = { affected: 1 };
      mockService.update.mockReturnValue(result);

      const response = controller.update(id, updateDetallesCertificadoDto);
      expect(mockService.update).toHaveBeenCalledWith(
        1,
        updateDetallesCertificadoDto,
      );
      expect(response).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a detalles certificado', () => {
      const id = '1';
      const result = { affected: 1 };
      mockService.remove.mockReturnValue(result);

      const response = controller.remove(id);
      expect(mockService.remove).toHaveBeenCalledWith(1);
      expect(response).toBe(result);
    });
  });
});
