// scripts/9.3-insert-postulante-habilidades.ts
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
// Generar 16,000 registros
// --------------------------
function generatePostulanteHabilidades() {
  const registros: {
    certificado: string;
    id_postulante: number;
    id_habilidad: number;
  }[] = [];

  for (let postulanteId = 1; postulanteId <= 8000; postulanteId++) {
    const habilidades = new Set<number>();

    // Asegurar que cada postulante tenga 2 habilidades distintas
    while (habilidades.size < 2) {
      habilidades.add(Math.floor(Math.random() * 1000) + 1);
    }

    for (const habilidadId of habilidades) {
      registros.push({
        certificado: `Certificado_${postulanteId}_${habilidadId}`,
        id_postulante: postulanteId,
        id_habilidad: habilidadId,
      });
    }
  }

  return registros;
}

// --------------------------
// Inserción en Supabase (PostgreSQL)
// --------------------------
async function insertBatchPostgres(registros: any[]) {
  const batchSize = 1000;
  for (let i = 0; i < registros.length; i += batchSize) {
    const batch = registros.slice(i, i + batchSize);
    const values = batch
      .map((r) => `('${r.certificado}', ${r.id_postulante}, ${r.id_habilidad})`)
      .join(',');

    const query = `
      INSERT INTO postulante_habilidades (certificado, id_postulante, id_habilidad)
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
  const batchSize = 1000;
  for (let i = 0; i < registros.length; i += batchSize) {
    const batch = registros.slice(i, i + batchSize);

    const binds = batch.map((r) => [
      r.certificado,
      r.id_postulante,
      r.id_habilidad,
    ]);

    const sql = `
      INSERT INTO "XE_LINKER"."postulante_habilidades"
      ("certificado", "id_postulante", "id_habilidad")
      VALUES (:1, :2, :3)
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
    console.log('🌀 Generando postulante_habilidades...');
    const registros = generatePostulanteHabilidades();
    console.log(`Generados ${registros.length} registros.`); // 16000

    // Conectar a ambas bases
    console.log('🔗 Conectando a Supabase...');
    await pgClient.connect();

    console.log('🔗 Conectando a Oracle...');
    const oracleConn = await oracledb.getConnection(oracleConfig);

    // Insertar datos
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
