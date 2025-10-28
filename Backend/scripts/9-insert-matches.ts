import { Client as PgClient } from 'pg';
import oracledb from 'oracledb';

// --------------------------
// Configuración Supabase / Postgres
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
// Generar datos de matches
// --------------------------
function generateMatches() {
  const matches: {
    id_empresa: number;
    id_vacante: number;
    id_postulante: number;
    fecha: Date;
  }[] = [];
  const numPostulantes = 8000;
  const numEmpresas = 1000;
  const numVacantes = 600;

  for (let postulante = 1; postulante <= numPostulantes; postulante++) {
    const empresasElegidas = new Set<number>();
    while (empresasElegidas.size < 2) {
      empresasElegidas.add(Math.floor(Math.random() * numEmpresas) + 1);
    }

    for (const empresa of empresasElegidas) {
      const vacante = Math.floor(Math.random() * numVacantes) + 1;
      matches.push({
        id_empresa: empresa,
        id_vacante: vacante,
        id_postulante: postulante,
        fecha: new Date(),
      });
    }
  }

  return matches;
}

// --------------------------
// Inserción en Supabase (PostgreSQL)
// --------------------------
async function insertBatchPostgres(matches: any[]) {
  const batchSize = 1000;
  for (let i = 0; i < matches.length; i += batchSize) {
    const batch = matches.slice(i, i + batchSize);
    const values = batch
      .map(
        (m) =>
          `(${m.id_empresa}, ${m.id_vacante}, ${m.id_postulante}, '${m.fecha.toISOString()}')`,
      )
      .join(',');

    const query = `
      INSERT INTO matches (id_empresa, id_vacante, id_postulante, fecha)
      VALUES ${values};
    `;
    await pgClient.query(query);
    console.log(`✅ Insertado batch ${i / batchSize + 1} en Supabase`);
  }
}

// --------------------------
// Inserción en Oracle
// --------------------------
async function insertBatchOracle(conn: oracledb.Connection, matches: any[]) {
  const batchSize = 1000;
  for (let i = 0; i < matches.length; i += batchSize) {
    const batch = matches.slice(i, i + batchSize);

    const binds = batch.map((m) => [
      m.id_empresa,
      m.id_vacante,
      m.id_postulante,
      m.fecha,
    ]);

    const sql = `
      INSERT INTO "XE_LINKER"."matches" ("id_empresa", "id_vacante", "id_postulante", "fecha")
      VALUES (:1, :2, :3, :4)
    `;

    await conn.executeMany(sql, binds, { autoCommit: false });
    console.log(`✅ Insertado batch ${i / batchSize + 1} en Oracle`);
  }

  await conn.commit();
}

// --------------------------
// Ejecución principal
// --------------------------
(async () => {
  try {
    console.log('🌀 Generando datos...');
    const matches = generateMatches();
    console.log(`Generados ${matches.length} registros.`); // 16,000

    // Conectar a ambas BD
    console.log('🔗 Conectando a Supabase...');
    await pgClient.connect();

    console.log('🔗 Conectando a Oracle...');
    const oracleConn = await oracledb.getConnection(oracleConfig);

    // Insertar en ambas
    console.log('🚀 Insertando en Supabase...');
    await insertBatchPostgres(matches);

    console.log('🚀 Insertando en Oracle...');
    await insertBatchOracle(oracleConn, matches);

    console.log('🎉 Inserción completada en ambas bases de datos.');

    await oracleConn.close();
    await pgClient.end();
  } catch (err) {
    console.error('❌ Error en la inserción:', err);
  }
})();
