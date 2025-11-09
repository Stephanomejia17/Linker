import { Test, TestingModule } from '@nestjs/testing';
import { DetallesCertificadosService } from './detalles_certificados.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DetallesCertificado } from './entities/detalles_certificado.entity';
import { Repository } from 'typeorm';
import { CreateDetallesCertificadoDto } from './dto/create-detalles_certificado.dto';
import { UpdateDetallesCertificadoDto } from './dto/update-detalles_certificado.dto';

describe('DetallesCertificadosService', () => {
  let service: DetallesCertificadosService;
  let repository: Repository<DetallesCertificado>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DetallesCertificadosService,
        {
          provide: getRepositoryToken(DetallesCertificado),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DetallesCertificadosService>(
      DetallesCertificadosService,
    );
    repository = module.get<Repository<DetallesCertificado>>(
      getRepositoryToken(DetallesCertificado),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new detalles certificado', async () => {
      const createDetallesCertificadoDto: CreateDetallesCertificadoDto = {
        empresa: { id: 'empresa-1' } as any,
        certificado: { id_certificado: 'cert-1' } as any,
        fecha_emision: new Date(),
        fecha_caducidad: new Date(),
      };
      const detallesCertificado = { id: 1, ...createDetallesCertificadoDto };
      mockRepository.create.mockReturnValue(detallesCertificado);
      mockRepository.save.mockReturnValue(detallesCertificado);

      const result = service.create(createDetallesCertificadoDto);
      expect(mockRepository.create).toHaveBeenCalledWith(
        createDetallesCertificadoDto,
      );
      expect(mockRepository.save).toHaveBeenCalledWith(detallesCertificado);
      expect(result).toBe(detallesCertificado);
    });
  });

  describe('findAll', () => {
    it('should return all detalles certificados', async () => {
      const detallesCertificados = [{ id: 1 }];
      mockRepository.find.mockReturnValue(detallesCertificados);

      const result = service.findAll();
      expect(mockRepository.find).toHaveBeenCalledWith({
        relations: ['empresa', 'certificado'],
      });
      expect(result).toBe(detallesCertificados);
    });
  });

  describe('update', () => {
    it('should update a detalles certificado', async () => {
      const id = 1;
      const updateDetallesCertificadoDto: UpdateDetallesCertificadoDto = {
        fecha_emision: new Date(),
      };
      const updateResult = { affected: 1 };
      mockRepository.update.mockReturnValue(updateResult);

      const result = service.update(id, updateDetallesCertificadoDto);
      expect(mockRepository.update).toHaveBeenCalledWith(
        id,
        updateDetallesCertificadoDto,
      );
      expect(result).toBe(updateResult);
    });
  });

  describe('remove', () => {
    it('should remove a detalles certificado', async () => {
      const id = 1;
      const deleteResult = { affected: 1 };
      mockRepository.delete.mockReturnValue(deleteResult);

      const result = service.remove(id);
      expect(mockRepository.delete).toHaveBeenCalledWith(id);
      expect(result).toBe(deleteResult);
    });
  });

  describe('findAllByEmpresa', () => {
    it('should return detalles certificados for empresa', async () => {
      const id_empresa = 'empresa-1';
      const detallesCertificados = [{ id: 1 }];
      mockRepository.find.mockReturnValue(detallesCertificados);

      const result = await service.findAllByEmpresa(id_empresa);
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { empresa: { id: id_empresa } },
        relations: ['certificado'],
      });
      expect(result).toBe(detallesCertificados);
    });
  });
});
