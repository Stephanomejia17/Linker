import { Client as PgClient } from 'pg';
import oracledb from 'oracledb';

// --------------------------
// Configuración PostgreSQL (Supabase)
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
// Enumeración de niveles
// --------------------------
const NIVELES = [
  'Primaria',
  'Secundaria',
  'Técnico',
  'Universitario',
  'Postgrado',
  'Maestría',
  'Doctorado',
];

// --------------------------
// Generador de estudios
// --------------------------
function generarEstudio(index: number) {
  const nivel = NIVELES[index % NIVELES.length];
  return {
    titulo: `Programa Académico ${index}`,
    nivel,
  };
}

// --------------------------
// Inserción en ambas bases
// --------------------------
async function insertarEstudiosDual() {
  let oracleConn: oracledb.Connection | undefined;

  try {
    // 🔌 Conexiones
    await pgClient.connect();
    console.log('✅ Conectado a PostgreSQL');

    oracleConn = await oracledb.getConnection(oracleConfig);
    console.log('✅ Conectado a Oracle');

    const total = 500; // 👈 ajustado para los 500 estudios
    const batchSize = 50;

    for (let i = 0; i < total; i += batchSize) {
      const batch = Array.from({ length: batchSize }, (_, j) =>
        generarEstudio(i + j + 1),
      );

      // =======================
      // INSERTAR EN POSTGRESQL
      // =======================
      const pgValues = batch
        .map((_, idx) => `($${idx * 2 + 1}, $${idx * 2 + 2})`)
        .join(', ');
      const pgParams = batch.flatMap((e) => [e.titulo, e.nivel]);
      await pgClient.query(
        `INSERT INTO estudios (titulo, nivel) VALUES ${pgValues}`,
        pgParams,
      );

      // =====================
      // INSERTAR EN ORACLE
      // =====================
      const oracleSql = `
        INSERT INTO "estudios" ("titulo", "nivel")
        VALUES (:titulo, :nivel)
      `;

      for (const e of batch) {
        await oracleConn.execute(
          oracleSql,
          { titulo: e.titulo, nivel: e.nivel },
          { autoCommit: false },
        );
      }

      await oracleConn.commit();
      console.log(`✅ Lote ${i + batchSize}/${total} insertado correctamente`);
    }

    console.log(`🎓 Inserción completada: ${total} estudios creados`);
  } catch (err) {
    console.error('❌ Error durante la inserción de estudios:', err);
  } finally {
    try {
      if (oracleConn) {
        await oracleConn.close();
        console.log('🔒 Conexión Oracle cerrada');
      }
      if (pgClient) {
        // ✅ Cierre limpio de PostgreSQL
        await pgClient.end();
        console.log('🔒 Conexión PostgreSQL cerrada');
      }
    } catch (closeErr) {
      console.error('⚠️ Error al cerrar conexiones:', closeErr);
    }

    // ✅ Espera un breve momento antes de finalizar
    await new Promise((resolve) => setTimeout(resolve, 500));
    process.exit(0);
  }
}

// Ejecutar script
insertarEstudiosDual();
