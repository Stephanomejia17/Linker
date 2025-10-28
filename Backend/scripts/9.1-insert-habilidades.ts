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
// Generar 1000 habilidades
// --------------------------
function generateHabilidades() {
  const habilidades: { nombre_habilidad: string }[] = [];
  for (let i = 1; i <= 1000; i++) {
    habilidades.push({ nombre_habilidad: `Habilidad_${i}` });
  }
  return habilidades;
}

// --------------------------
// Inserción en Supabase (PostgreSQL)
// --------------------------
async function insertBatchPostgres(habilidades: any[]) {
  const batchSize = 200; // Lotes de 200 para eficiencia y estabilidad
  for (let i = 0; i < habilidades.length; i += batchSize) {
    const batch = habilidades.slice(i, i + batchSize);
    const values = batch.map((h) => `('${h.nombre_habilidad}')`).join(',');

    const query = `
      INSERT INTO habilidades (nombre_habilidad)
      VALUES ${values};
    `;
    await pgClient.query(query);
    console.log(`✅ Insertado batch ${i / batchSize + 1} en Supabase`);
  }
}

// --------------------------
// Inserción en Oracle
// --------------------------
async function insertBatchOracle(
  conn: oracledb.Connection,
  habilidades: any[],
) {
  const batchSize = 200;
  for (let i = 0; i < habilidades.length; i += batchSize) {
    const batch = habilidades.slice(i, i + batchSize);
    const binds = batch.map((h) => [h.nombre_habilidad]);

    const sql = `
      INSERT INTO "XE_LINKER"."habilidades" ("nombre_habilidad")
      VALUES (:1)
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
    console.log('🌀 Generando habilidades...');
    const habilidades = generateHabilidades();
    console.log(`Generadas ${habilidades.length} habilidades.`);

    // Conectar a ambas BD
    console.log('🔗 Conectando a Supabase...');
    await pgClient.connect();

    console.log('🔗 Conectando a Oracle...');
    const oracleConn = await oracledb.getConnection(oracleConfig);

    // Insertar en ambas bases
    console.log('🚀 Insertando en Supabase...');
    await insertBatchPostgres(habilidades);

    console.log('🚀 Insertando en Oracle...');
    await insertBatchOracle(oracleConn, habilidades);

    console.log('🎉 Inserción completada en ambas bases de datos.');

    await oracleConn.close();
    await pgClient.end();
  } catch (err) {
    console.error('❌ Error en la inserción:', err);
  }
})();
