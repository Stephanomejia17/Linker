import { Injectable } from '@nestjs/common';
import { CreateVacanteDto } from './dto/create-vacante.dto';
import { UpdateVacanteDto } from './dto/update-vacante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vacante } from './entities/vacante.entity';
import { In, Not, Repository } from 'typeorm';
import { InteraccionesService } from 'src/interacciones/interacciones.service';
import oracledb from 'oracledb';

@Injectable()
export class VacantesService {
  private idiomasSeleccionados: number[] = [];
  constructor(
    @InjectRepository(Vacante, 'postgresConnection')
    private vacanteRepository: Repository<Vacante>,
    @InjectRepository(Vacante, 'oracleConnection')
    private vacanteOracleRepository: Repository<Vacante>,
    private interaccionService: InteraccionesService,
  ) {}

  /*async create(createVacanteDto: CreateVacanteDto) {
    const vacanteEntity = this.vacanteRepository.create({
      ...createVacanteDto,
      empresa: { id: createVacanteDto.empresa.id },
    });

    const vacanteOracleEntity = this.vacanteOracleRepository.create({
      ...createVacanteDto,
      empresa: { id: createVacanteDto.empresa.id },
    });

    await this.vacanteRepository.insert(vacanteEntity);
    await this.vacanteOracleRepository.insert(vacanteOracleEntity);
    return vacanteEntity;
  }*/

  async create(createVacanteDto: CreateVacanteDto) {
    const { vacantesIdiomas, vacanteHabilidades, empresa, ...vacanteData } =
      createVacanteDto;
    console.log(
      'habilidades',
      vacanteHabilidades,
      'idiomas',
      vacantesIdiomas,
      'data',
      vacanteData,
    );

    const nuevaVacante = this.vacanteOracleRepository.create({
      ...vacanteData,
      empresa,
    });

    if (vacantesIdiomas && vacantesIdiomas.length > 0) {
      nuevaVacante.vacantesIdiomas = vacantesIdiomas.map(
        (id_idioma) =>
          ({
            idioma: { id_idioma },
          }) as any,
      );
    }

    if (vacanteHabilidades && vacanteHabilidades.length > 0) {
      nuevaVacante.vacanteHabilidades = vacanteHabilidades.map(
        (id_habilidad) =>
          ({
            habilidades: { id_habilidad },
          }) as any,
      );
    }

    return await this.vacanteOracleRepository.save(nuevaVacante);
  }

  findAll() {
    return this.vacanteOracleRepository.find({
      relations: ['empresa'],
    });
  }

  findAllOracle() {
    return this.vacanteOracleRepository.find({
      relations: ['empresa'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} vacante`;
  }

  update(id: number, updateVacanteDto: UpdateVacanteDto) {
    return `This action updates a #${id} vacante`;
  }

  remove(id: number) {
    return `This action removes a #${id} vacante`;
  }

  findAllVacantesofEmpresa(empresaid: number) {
    return this.vacanteOracleRepository.find({
      where: {
        empresa: { id: empresaid },
      },
      relations: ['empresa'],
    });
  }

  async getVacantes(postulanteId: number) {
    const vacantesExcluidas =
      await this.interaccionService.isFilteredVacantes(postulanteId);
    console.log('desde vacante', vacantesExcluidas);
    const vacantes = this.vacanteOracleRepository.find({
      select: {
        empresa: {
          name_empresa: true,
          id: true,
        },
      },
      where: {
        id_vacante: Not(In(vacantesExcluidas)),
      },
      relations: ['empresa', 'vacanteHabilidades', 'vacantesIdiomas'],
      take: 5,
    });
    return vacantes;
  }

  async filtrarVacantes(
    postulanteId: number,
    idiomas: number[],
  ): Promise<Vacante[]> {
    let connection;
    try {
      connection = await oracledb.getConnection({
        user: 'XE_LINKER_2',
        password: 'admin',
        connectString:
          '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=FREEPDB1)))',
      });

      const result = await connection.execute(
        `
    DECLARE
      v_idiomas SYS.ODCINUMBERLIST := SYS.ODCINUMBERLIST();
    BEGIN
      -- Llenar la lista de idiomas solo si hay
      IF :num_idiomas > 0 THEN
        FOR i IN 1..:num_idiomas LOOP
          v_idiomas.EXTEND;
          v_idiomas(i) := :idiomas(i);
        END LOOP;
      END IF;

      OPEN :cursor FOR
        SELECT * FROM TABLE(XE_LINKER_2.PKG_FILTROS.FILTRAR_VACANTES(:postulante_id, v_idiomas));
    END;
    `,
        {
          postulante_id: postulanteId,
          num_idiomas: idiomas.length,
          idiomas: {
            dir: oracledb.BIND_IN,
            type: oracledb.NUMBER,
            val: idiomas,
          },
          cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
        },
        { outFormat: oracledb.OUT_FORMAT_OBJECT },
      );

      const resultSet = result.outBinds.cursor;
      let rows = await resultSet.getRows();
      await resultSet.close();

      // Asegurarse de que rows sea un array
      if (!Array.isArray(rows)) {
        rows = [];
      }

      const vacantes: Vacante[] = rows.map((r: any) => ({
        id_vacante: r.ID_VACANTE,
        titulo: r.TITULO,
        tipo_trabajo: r.TIPO_TRABAJO,
        modalidad: r.MODALIDAD,
        salario: r.SALARIO,
        ubicacion: r.UBICACION,
        empresa: {
          id: r.ID_EMPRESA || 0,
          name_empresa: r.NAME_EMPRESA || '',
        },
        vacantesIdiomas: [], // opcional
        vacanteHabilidades: [], // opcional
      }));

      console.log('VACANTES BACKEND: ', vacantes);
      return vacantes;
    } finally {
      if (connection) await connection.close();
    }
  }
}
