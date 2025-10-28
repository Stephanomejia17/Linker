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
// Tipado local
// --------------------------
type PostulanteIdioma = {
  id_postulante: number;
  id_idioma: number;
  certificado: string;
};

// --------------------------
// Generador de registros
// --------------------------
function generarPostulanteIdiomas(): PostulanteIdioma[] {
  const registros: PostulanteIdioma[] = [];
  const totalPostulantes = 8000;
  const totalIdiomas = 15;

  let idiomaIndex = 1;

  for (let postulanteId = 1; postulanteId <= totalPostulantes; postulanteId++) {
    for (let i = 0; i < 2; i++) {
      const certificado = `Certificado Bilingüe #${postulanteId}-${i + 1}`;
      registros.push({
        id_postulante: postulanteId,
        id_idioma: idiomaIndex,
        certificado,
      });

      idiomaIndex++;
      if (idiomaIndex > totalIdiomas) idiomaIndex = 1;
    }
  }

  return registros;
}

// --------------------------
// Inserción dual (Supabase + Oracle)
// --------------------------
async function insertarPostulanteIdiomasDual() {
  let oracleConn: oracledb.Connection | undefined;

  try {
    await pgClient.connect();
    console.log('✅ Conectado a PostgreSQL (Supabase)');

    oracleConn = await oracledb.getConnection(oracleConfig);
    console.log('✅ Conectado a Oracle');

    const registros = generarPostulanteIdiomas();
    console.log(`🔢 Generados ${registros.length} registros`);

    const batchSize = 500;

    // ===============================
    // PostgreSQL (Supabase)
    // ===============================
    await pgClient.query('BEGIN');
    for (let i = 0; i < registros.length; i += batchSize) {
      const batch = registros.slice(i, i + batchSize);

      const values = batch
        .map((_, j) => `($${j * 3 + 1}, $${j * 3 + 2}, $${j * 3 + 3})`)
        .join(', ');

      const params = batch.flatMap((r) => [
        r.certificado,
        r.id_postulante,
        r.id_idioma,
      ]);

      await pgClient.query(
        `INSERT INTO postulante_idiomas (certificado, id_postulante, id_idioma) VALUES ${values}`,
        params,
      );

      console.log(
        `📦 Supabase: Lote ${i + batch.length}/${registros.length} insertado`,
      );
    }
    await pgClient.query('COMMIT');
    console.log(`🟢 ${registros.length} registros insertados en Supabase`);

    // ===============================
    // Oracle
    // ===============================
    const oracleSql = `
      INSERT INTO "postulante_idiomas" ("certificado", "id_postulante", "id_idioma")
      VALUES (:certificado, :id_postulante, :id_idioma)
    `;

    const binds = registros.map((r) => ({
      certificado: r.certificado,
      id_postulante: r.id_postulante,
      id_idioma: r.id_idioma,
    }));

    await oracleConn.executeMany(oracleSql, binds, { autoCommit: false });
    await oracleConn.commit();
    console.log(`🟣 ${registros.length} registros insertados en Oracle`);

    console.log('🎯 Inserción completada en ambas bases de datos');
  } catch (err) {
    console.error('❌ Error durante la inserción:', err);
    try {
      await pgClient.query('ROLLBACK');
      if (oracleConn) await oracleConn.rollback();
    } catch {}
  } finally {
    if (oracleConn) await oracleConn.close();
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await pgClient.end();
    } catch (pgErr) {
      console.warn('⚠️ Error al cerrar conexión PostgreSQL:', pgErr.message);
    }
    console.log('🔒 Conexiones cerradas correctamente');
  }
}

// Ejecutar script
insertarPostulanteIdiomasDual();
