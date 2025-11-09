import { Test, TestingModule } from '@nestjs/testing';
import { CertificadosService } from './certificados.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Certificado } from './entities/certificado.entity';
import { Repository } from 'typeorm';
import { CreateCertificadoDto } from './dto/create-certificado.dto';
import { UpdateCertificadoDto } from './dto/update-certificado.dto';

describe('CertificadosService', () => {
  let service: CertificadosService;
  let repository: Repository<Certificado>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CertificadosService,
        {
          provide: getRepositoryToken(Certificado),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CertificadosService>(CertificadosService);
    repository = module.get<Repository<Certificado>>(
      getRepositoryToken(Certificado),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new certificado', async () => {
      const createCertificadoDto: CreateCertificadoDto = {
        entidad_emisora: 'Test Entity',
        nombre_certificado: 'Test Cert',
      };
      const certificado = { id_certificado: '1', ...createCertificadoDto };
      mockRepository.create.mockReturnValue(certificado);
      mockRepository.save.mockReturnValue(certificado);

      const result = service.create(createCertificadoDto);
      expect(mockRepository.create).toHaveBeenCalledWith(createCertificadoDto);
      expect(mockRepository.save).toHaveBeenCalledWith(certificado);
      expect(result).toBe(certificado);
    });
  });

  describe('findAll', () => {
    it('should return all certificados', async () => {
      const certificados = [{ id_certificado: '1' }];
      mockRepository.find.mockReturnValue(certificados);

      const result = service.findAll();
      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toBe(certificados);
    });
  });

  describe('findOne', () => {
    it('should return one certificado by id', async () => {
      const id = 1;
      const certificado = { id_certificado: '1' };
      mockRepository.findOne.mockReturnValue(certificado);

      const result = service.findOne(id);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id_certificado: id.toString() },
      });
      expect(result).toBe(certificado);
    });
  });

  describe('update', () => {
    it('should update a certificado', async () => {
      const id = 1;
      const updateCertificadoDto: UpdateCertificadoDto = {
        entidad_emisora: 'Updated Entity',
      };
      const updateResult = { affected: 1 };
      mockRepository.update.mockReturnValue(updateResult);

      const result = service.update(id, updateCertificadoDto);
      expect(mockRepository.update).toHaveBeenCalledWith(
        { id_certificado: id.toString() },
        updateCertificadoDto,
      );
      expect(result).toBe(updateResult);
    });
  });

  describe('remove', () => {
    it('should remove a certificado', async () => {
      const id = 1;
      const deleteResult = { affected: 1 };
      mockRepository.delete.mockReturnValue(deleteResult);

      const result = service.remove(id);
      expect(mockRepository.delete).toHaveBeenCalledWith({
        id_certificado: id.toString(),
      });
      expect(result).toBe(deleteResult);
    });
  });
});
