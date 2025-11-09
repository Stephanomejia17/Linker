import { Test, TestingModule } from '@nestjs/testing';
import { PostulanteController } from './postulante.controller';
import { PostulanteService } from './postulante.service';

describe('PostulanteController', () => {
  let controller: PostulanteController;
  let postulanteService: PostulanteService;

  const mockPostulanteService = {
    createPostulante: jest.fn(),
    getPostulanteById: jest.fn(),
    findAll: jest.fn(),
    getPostulantes: jest.fn(),
    updatePostulante: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostulanteController],
      providers: [
        {
          provide: PostulanteService,
          useValue: mockPostulanteService,
        },
      ],
    }).compile();

    controller = module.get<PostulanteController>(PostulanteController);
    postulanteService = module.get<PostulanteService>(PostulanteService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a new postulante', async () => {
      const createPostulanteDto = {
        name: 'John',
        lastname: 'Doe',
        años_experiencia: 5,
        curriculum: 'cv.pdf',
        foto: 'photo.jpg',
        ubicacion: 'Bogota',
        id_perfil: 'user-1',
      };

      const expectedResult = {
        message: 'Postulante registrado con éxito',
        postulante: { id: 'postulante-1', ...createPostulanteDto },
      };

      mockPostulanteService.createPostulante.mockResolvedValue(expectedResult);

      const result = await controller.register(createPostulanteDto);

      expect(mockPostulanteService.createPostulante).toHaveBeenCalledWith(
        createPostulanteDto,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getPostulante', () => {
    it('should return postulante data by id', async () => {
      const id = 'postulante-1';
      const postulanteData = {
        name: 'John',
        lastname: 'Doe',
      };

      mockPostulanteService.getPostulanteById.mockResolvedValue(postulanteData);

      const result = await controller.getPostulante(id);

      expect(mockPostulanteService.getPostulanteById).toHaveBeenCalledWith(id);
      expect(result).toEqual(postulanteData);
    });
  });

  describe('findAll', () => {
    it('should return all postulantes', async () => {
      const postulantes = [
        {
          id: '1',
          name: 'John',
          lastname: 'Doe',
          user: { id: 'user-1' },
        },
      ];

      mockPostulanteService.findAll.mockResolvedValue(postulantes);

      const result = await controller.findAll();

      expect(mockPostulanteService.findAll).toHaveBeenCalled();
      expect(result).toEqual(postulantes);
    });
  });

  describe('getPostulantesForEmpresa', () => {
    it('should return postulantes for a specific vacante', async () => {
      const vacanteId = 'vacante-1';
      const postulantes = [
        {
          id: 'postulante-1',
          name: 'John',
          lastname: 'Doe',
          postulanteHabilidades: [],
          postulanteIdiomas: [],
        },
      ];

      mockPostulanteService.getPostulantes.mockResolvedValue(postulantes);

      const result = await controller.getPostulantesForEmpresa(vacanteId);

      expect(mockPostulanteService.getPostulantes).toHaveBeenCalledWith(
        vacanteId,
      );
      expect(result).toEqual(postulantes);
    });
  });

  describe('updatePostulante', () => {
    it('should update a postulante', async () => {
      const id = 'postulante-1';
      const createPostulanteDto = {
        name: 'John',
        lastname: 'Doe',
        años_experiencia: 5,
        curriculum: 'cv.pdf',
        foto: 'photo.jpg',
        ubicacion: 'Bogota',
        id_perfil: 'user-1',
      };

      const expectedResult = {
        id,
        name: 'John',
        lastname: 'Doe',
        años_experiencia: 5,
        curriculum: 'cv.pdf',
      };

      mockPostulanteService.updatePostulante.mockResolvedValue(expectedResult);

      const result = await controller.updatePostulante(id, createPostulanteDto);

      expect(mockPostulanteService.updatePostulante).toHaveBeenCalledWith(
        id,
        createPostulanteDto,
      );
      expect(result).toEqual(expectedResult);
    });
  });
});
