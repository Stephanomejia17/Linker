import { Test, TestingModule } from '@nestjs/testing';
import { PostulanteService } from './postulante.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Postulante } from './entities/postulante.entity';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { InteraccionesService } from '../interacciones/interacciones.service';

describe('PostulanteService', () => {
  let service: PostulanteService;
  let postulanteRepository: Repository<Postulante>;
  let userRepository: Repository<User>;
  let interaccionesService: InteraccionesService;

  const mockPostulanteRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  const mockUserRepository = {
    findOne: jest.fn(),
  };

  const mockInteraccionesService = {
    isFilteredPostulantes: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostulanteService,
        {
          provide: getRepositoryToken(Postulante),
          useValue: mockPostulanteRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: InteraccionesService,
          useValue: mockInteraccionesService,
        },
      ],
    }).compile();

    service = module.get<PostulanteService>(PostulanteService);
    postulanteRepository = module.get<Repository<Postulante>>(
      getRepositoryToken(Postulante),
    );
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    interaccionesService =
      module.get<InteraccionesService>(InteraccionesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPostulante', () => {
    it('should create a new postulante successfully', async () => {
      const createPostulanteDto = {
        name: 'John',
        lastname: 'Doe',
        años_experiencia: 5,
        curriculum: 'cv.pdf',
        foto: 'photo.jpg',
        ubicacion: 'Bogota',
        id_perfil: 'user-1',
      };

      const user = { id: 'user-1', email: 'john@example.com' };
      const postulanteEntity = {
        id: 'postulante-1',
        ...createPostulanteDto,
        user,
      };

      const savedPostulante = {
        ...postulanteEntity,
        id: 'postulante-1',
      };

      mockUserRepository.findOne.mockResolvedValue(user);
      mockPostulanteRepository.create.mockReturnValue(postulanteEntity);
      mockPostulanteRepository.save.mockResolvedValue(savedPostulante);

      const result = await service.createPostulante(createPostulanteDto);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: createPostulanteDto.id_perfil },
      });
      expect(mockPostulanteRepository.create).toHaveBeenCalledWith({
        ...createPostulanteDto,
        user,
      });
      expect(mockPostulanteRepository.save).toHaveBeenCalledWith(
        postulanteEntity,
      );
      expect(result).toEqual({
        message: 'Postulante registrado con éxito',
        postulante: savedPostulante,
      });
    });

    it('should throw NotFoundException if user not found', async () => {
      const createPostulanteDto = {
        name: 'John',
        lastname: 'Doe',
        años_experiencia: 5,
        curriculum: 'cv.pdf',
        foto: 'photo.jpg',
        ubicacion: 'Bogota',
        id_perfil: 'nonexistent-user',
      };

      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(
        service.createPostulante(createPostulanteDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getPostulanteById', () => {
    it('should return postulante data by id', async () => {
      const id = 'postulante-1';
      const postulante = {
        id,
        name: 'John',
        lastname: 'Doe',
        user: { id: 'user-1' },
      };

      mockPostulanteRepository.findOne.mockResolvedValue(postulante);

      const result = await service.getPostulanteById(id);

      expect(mockPostulanteRepository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: ['user'],
      });
      expect(result).toEqual({
        name: postulante.name,
        lastname: postulante.lastname,
      });
    });

    it('should throw NotFoundException if postulante not found', async () => {
      const id = 'nonexistent';

      mockPostulanteRepository.findOne.mockResolvedValue(null);

      await expect(service.getPostulanteById(id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all postulantes with user relations', async () => {
      const postulantes = [
        {
          id: '1',
          name: 'John',
          lastname: 'Doe',
          user: { id: 'user-1' },
        },
      ];

      mockPostulanteRepository.find.mockResolvedValue(postulantes);

      const result = await service.findAll();

      expect(mockPostulanteRepository.find).toHaveBeenCalledWith({
        relations: ['user'],
      });
      expect(result).toEqual(postulantes);
    });
  });

  describe('getPostulantes', () => {
    it('should return postulantes excluding filtered ones', async () => {
      const vacanteId = 'vacante-1';
      const excludedIds = ['postulante-2', 'postulante-3'];
      const postulantes = [
        {
          id: 'postulante-1',
          name: 'John',
          lastname: 'Doe',
          postulanteHabilidades: [],
          postulanteIdiomas: [],
        },
      ];

      mockInteraccionesService.isFilteredPostulantes.mockResolvedValue(
        excludedIds,
      );
      mockPostulanteRepository.find.mockResolvedValue(postulantes);

      const result = await service.getPostulantes(vacanteId);

      expect(
        mockInteraccionesService.isFilteredPostulantes,
      ).toHaveBeenCalledWith(vacanteId);
      expect(mockPostulanteRepository.find).toHaveBeenCalledWith({
        where: {
          id: expect.any(Object), // Not(In(excludedIds))
        },
        relations: ['postulanteHabilidades', 'postulanteIdiomas'],
      });
      expect(result).toEqual(postulantes);
    });
  });

  describe('updatePostulante', () => {
    it('should update postulante experiencia', async () => {
      const idUsuario = 'postulante-1';
      const dto = { experiencia: 10 };
      const postulante = {
        id: idUsuario,
        name: 'John',
        lastname: 'Doe',
        años_experiencia: 5,
      };

      const updatedPostulante = {
        ...postulante,
        años_experiencia: 10,
      };

      mockPostulanteRepository.findOne.mockResolvedValue(postulante);
      mockPostulanteRepository.save.mockResolvedValue(updatedPostulante);

      const result = await service.updatePostulante(idUsuario, dto);

      expect(mockPostulanteRepository.findOne).toHaveBeenCalledWith({
        where: { id: idUsuario },
      });
      expect(mockPostulanteRepository.save).toHaveBeenCalledWith(
        updatedPostulante,
      );
      expect(result).toEqual(updatedPostulante);
    });

    it('should update postulante curriculum', async () => {
      const idUsuario = 'postulante-1';
      const dto = { cv: 'new-cv.pdf' };
      const postulante = {
        id: idUsuario,
        name: 'John',
        lastname: 'Doe',
        curriculum: 'old-cv.pdf',
      };

      const updatedPostulante = {
        ...postulante,
        curriculum: 'new-cv.pdf',
      };

      mockPostulanteRepository.findOne.mockResolvedValue(postulante);
      mockPostulanteRepository.save.mockResolvedValue(updatedPostulante);

      const result = await service.updatePostulante(idUsuario, dto);

      expect(mockPostulanteRepository.save).toHaveBeenCalledWith(
        updatedPostulante,
      );
      expect(result).toEqual(updatedPostulante);
    });

    it('should throw NotFoundException if postulante not found', async () => {
      const idUsuario = 'nonexistent';
      const dto = { experiencia: 10 };

      mockPostulanteRepository.findOne.mockResolvedValue(null);

      await expect(service.updatePostulante(idUsuario, dto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
