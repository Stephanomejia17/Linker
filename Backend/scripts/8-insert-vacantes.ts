import oracledb from 'oracledb';
import { Client as PgClient } from 'pg';

// --------------------------
// CONFIGURACIÓN DE BASES DE DATOS
// --------------------------

const pgClient = new PgClient({
  host: 'aws-1-us-east-1.pooler.supabase.com',
  port: 5432,
  user: 'postgres.cekfujigmovegdxpxjgx',
  password: '24ovJn5yVSdkl2sr',
  database: 'postgres',
});

// --------------------------
// Configuración Oracle
// --------------------------
const oracleConfig = {
  user: 'XE_LINKER',
  password: 'admin',
  connectString: 'localhost/FREEPDB1',
};

// --------------------------
// DATOS BASE
// --------------------------
enum TipoTrabajo {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  CONTRATO = 'Contrato',
  PRACTICAS = 'Prácticas',
}

enum TipoModalidad {
  PRESENCIAL = 'Presencial',
  REMOTO = 'Remoto',
  HIBRIDO = 'Híbrido',
}

const TITULOS = [
  'Desarrollador Full Stack',
  'Analista de Datos',
  'Diseñador UI/UX',
  'Ingeniero DevOps',
  'Científico de Datos',
  'Administrador de Sistemas',
  'QA Tester',
  'Product Manager',
  'Backend Developer',
  'Frontend Developer',
  'Especialista en Ciberseguridad',
  'Arquitecto de Software',
  'Scrum Master',
  'Consultor Cloud',
  'Soporte Técnico',
];

const UBICACIONES = [
  'Medellín',
  'Bogotá',
  'Lima',
  'Ciudad de México',
  'Buenos Aires',
  'Santiago',
  'Madrid',
  'Barcelona',
  'Miami',
  'Toronto',
  'San Francisco',
];

function randomEnumValue<T extends Record<string, string>>(
  anEnum: T,
): T[keyof T] {
  const values = Object.values(anEnum) as Array<T[keyof T]>;
  return values[Math.floor(Math.random() * values.length)];
}

function generarSalario(tipo: TipoTrabajo): number {
  switch (tipo) {
    case TipoTrabajo.FULL_TIME:
      return Math.floor(Math.random() * (9000 - 4000) + 4000);
    case TipoTrabajo.PART_TIME:
      return Math.floor(Math.random() * (4000 - 1500) + 1500);
    case TipoTrabajo.CONTRATO:
      return Math.floor(Math.random() * (10000 - 5000) + 5000);
    case TipoTrabajo.PRACTICAS:
      return Math.floor(Math.random() * (1500 - 500) + 500);
    default:
      return 0;
  }
}

// --------------------------
// INSERCIÓN MASIVA
// --------------------------
async function main() {
  const BATCH_SIZE = 100;
  const TOTAL_VACANTES = 600;

  try {
    await pgClient.connect();
    const oracleConn = await oracledb.getConnection(oracleConfig);
    console.log('✅ Conectado a Supabase y Oracle');

    const vacantesBatchOracle: any[] = [];
    const vacantesBatchPostgres: string[] = [];

    for (let i = 0; i < TOTAL_VACANTES; i++) {
      const tipoTrabajo = randomEnumValue(TipoTrabajo);
      const modalidad = randomEnumValue(TipoModalidad);
      const titulo = TITULOS[Math.floor(Math.random() * TITULOS.length)];
      const ubicacion =
        UBICACIONES[Math.floor(Math.random() * UBICACIONES.length)];
      const salario = generarSalario(tipoTrabajo);
      const empresaId = Math.floor(Math.random() * 1000) + 1;

      vacantesBatchOracle.push([
        titulo,
        tipoTrabajo,
        modalidad,
        salario,
        ubicacion,
        empresaId,
      ]);

      vacantesBatchPostgres.push(
        `('${titulo.replace(/'/g, "''")}', '${tipoTrabajo}', '${modalidad}', ${salario}, '${ubicacion.replace(/'/g, "''")}', ${empresaId})`,
      );

      // Cada BATCH_SIZE registros -> insertar en bloque
      if ((i + 1) % BATCH_SIZE === 0 || i === TOTAL_VACANTES - 1) {
        // PostgreSQL batch insert
        const insertQuery = `
          INSERT INTO vacantes (titulo, tipo_trabajo, modalidad, salario, ubicacion, "empresaId")
          VALUES ${vacantesBatchPostgres.join(',')}
        `;
        await pgClient.query(insertQuery);
        vacantesBatchPostgres.length = 0;

        // Oracle batch insert
        await oracleConn.executeMany(
          `INSERT INTO "XE_LINKER"."vacantes" 
           ("titulo", "tipo_trabajo", "modalidad", "salario", "ubicacion", "empresaId")
           VALUES (:1, :2, :3, :4, :5, :6)`,
          vacantesBatchOracle,
          { autoCommit: false },
        );
        await oracleConn.commit();
        vacantesBatchOracle.length = 0;

        console.log(`💾 Insertadas ${i + 1} vacantes`);
      }
    }

    console.log('🎉 Inserción completa de vacantes en ambas bases.');
    await pgClient.end();
    await oracleConn.close();
  } catch (error) {
    console.error('❌ Error durante la inserción:', error);
  }
}

main();
