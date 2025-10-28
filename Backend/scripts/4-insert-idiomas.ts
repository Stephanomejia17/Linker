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
// Lista de idiomas reales
// --------------------------
const IDIOMAS = [
  'Español',
  'Inglés',
  'Francés',
  'Alemán',
  'Italiano',
  'Portugués',
  'Chino mandarín',
  'Japonés',
  'Coreano',
  'Ruso',
  'Árabe',
  'Hindi',
  'Neerlandés',
  'Sueco',
  'Turco',
];

// --------------------------
// Inserción dual
// --------------------------
async function insertarIdiomasDual() {
  let oracleConn: oracledb.Connection | undefined;

  try {
    // 🔌 Conectar a ambas bases
    await pgClient.connect();
    console.log('✅ Conectado a PostgreSQL (Supabase)');

    oracleConn = await oracledb.getConnection(oracleConfig);
    console.log('✅ Conectado a Oracle');

    // ==============================
    // POSTGRESQL - Inserción segura
    // ==============================
    await pgClient.query('BEGIN');
    const pgSql = `INSERT INTO idiomas (nombre) VALUES ($1)`;
    for (const idioma of IDIOMAS) {
      await pgClient.query(pgSql, [idioma]);
    }
    await pgClient.query('COMMIT');
    console.log(`🌍 ${IDIOMAS.length} idiomas insertados en PostgreSQL`);

    // ==============================
    // ORACLE - Inserción por lotes
    // ==============================
    const oracleSql = `
      INSERT INTO "idiomas" ("nombre")
      VALUES (:nombre)
    `;

    const binds = IDIOMAS.map((nombre) => ({ nombre }));

    await oracleConn.executeMany(oracleSql, binds, { autoCommit: false });
    await oracleConn.commit();
    console.log(`🌏 ${IDIOMAS.length} idiomas insertados en Oracle`);

    console.log('🎯 Inserción completada en ambas bases de datos');
  } catch (err) {
    console.error('❌ Error durante la inserción de idiomas:', err);
  } finally {
    if (oracleConn) await oracleConn.close();
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // evitar error XX000
      await pgClient.end();
    } catch (pgErr) {
      console.warn(
        '⚠️ Error al cerrar conexión PostgreSQL (ignorable):',
        pgErr.message,
      );
    }
    console.log('🔒 Conexiones cerradas correctamente');
  }
}

// Ejecutar script
insertarIdiomasDual();
