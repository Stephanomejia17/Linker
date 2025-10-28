// scripts/9.4-insert-vacante-habilidades.ts
import { Client as PgClient } from 'pg';
import oracledb from 'oracledb';

// --------------------------
// Configuración Supabase / PostgreSQL
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
// Generar datos de vacante_habilidades
// --------------------------
function generateVacanteHabilidades() {
  const registros: {
    vacanteIdVacante: number;
    habilidadesIdHabilidad: number;
  }[] = [];

  for (let vacanteId = 1; vacanteId <= 600; vacanteId++) {
    const habilidades = new Set<number>();

    // Cada vacante tiene 2 habilidades distintas
    while (habilidades.size < 2) {
      habilidades.add(Math.floor(Math.random() * 1000) + 1);
    }

    for (const habilidadId of habilidades) {
      registros.push({
        vacanteIdVacante: vacanteId,
        habilidadesIdHabilidad: habilidadId,
      });
    }
  }

  return registros;
}

// --------------------------
// Inserción en Supabase (PostgreSQL)
// --------------------------
async function insertBatchPostgres(registros: any[]) {
  const batchSize = 500;
  for (let i = 0; i < registros.length; i += batchSize) {
    const batch = registros.slice(i, i + batchSize);
    const values = batch
      .map((r) => `(${r.vacanteIdVacante}, ${r.habilidadesIdHabilidad})`)
      .join(',');

    const query = `
      INSERT INTO vacante_habilidades ("vacanteIdVacante", "habilidadesIdHabilidad")
      VALUES ${values};
    `;

    await pgClient.query(query);
    console.log(`✅ Insertado batch ${i / batchSize + 1} en Supabase`);
  }
}

// --------------------------
// Inserción en Oracle
// --------------------------
async function insertBatchOracle(conn: oracledb.Connection, registros: any[]) {
  const batchSize = 500;
  for (let i = 0; i < registros.length; i += batchSize) {
    const batch = registros.slice(i, i + batchSize);

    const binds = batch.map((r) => [
      r.vacanteIdVacante,
      r.habilidadesIdHabilidad,
    ]);

    const sql = `
      INSERT INTO "XE_LINKER"."vacante_habilidades"
      ("vacanteIdVacante", "habilidadesIdHabilidad")
      VALUES (:1, :2)
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
    console.log('🌀 Generando vacante_habilidades...');
    const registros = generateVacanteHabilidades();
    console.log(`Generados ${registros.length} registros.`); // 1200

    // Conectar a ambas bases
    console.log('🔗 Conectando a Supabase...');
    await pgClient.connect();

    console.log('🔗 Conectando a Oracle...');
    const oracleConn = await oracledb.getConnection(oracleConfig);

    // Insertar datos en ambas
    console.log('🚀 Insertando en Supabase...');
    await insertBatchPostgres(registros);

    console.log('🚀 Insertando en Oracle...');
    await insertBatchOracle(oracleConn, registros);

    console.log('🎉 Inserción completada en ambas bases de datos.');

    await oracleConn.close();
    await pgClient.end();
  } catch (err) {
    console.error('❌ Error en la inserción:', err);
  }
})();
