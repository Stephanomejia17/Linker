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
// Parámetros de generación
// --------------------------
const TOTAL_POSTULANTES = 8000;
const TOTAL_ESTUDIOS = 600;
const ESTUDIOS_POR_POSTULANTE = 3;
const BATCH_SIZE = 1000;

// --------------------------
// Generar registros
// --------------------------
function generarDetalles(): {
  id_postulante: number;
  id_estudio: number;
  certificado: string;
}[] {
  const detalles: {
    id_postulante: number;
    id_estudio: number;
    certificado: string;
  }[] = [];

  for (
    let postulanteId = 1;
    postulanteId <= TOTAL_POSTULANTES;
    postulanteId++
  ) {
    const estudiosUsados = new Set<number>();
    while (estudiosUsados.size < ESTUDIOS_POR_POSTULANTE) {
      const idEstudio = Math.floor(Math.random() * TOTAL_ESTUDIOS) + 1;
      estudiosUsados.add(idEstudio);
    }

    for (const id_estudio of estudiosUsados) {
      detalles.push({
        id_postulante: postulanteId,
        id_estudio,
        certificado: `Certificado_${id_estudio}_${postulanteId}.pdf`,
      });
    }
  }

  return detalles;
}

// --------------------------
// Inserción dual
// --------------------------
async function insertarDetallesDual() {
  let oracleConn: oracledb.Connection | undefined;

  try {
    await pgClient.connect();
    console.log('✅ Conectado a PostgreSQL (Supabase)');

    oracleConn = await oracledb.getConnection(oracleConfig);
    console.log('✅ Conectado a Oracle');

    const detalles = generarDetalles();
    console.log(
      `📦 Generados ${detalles.length} registros (3 por cada postulante)`,
    );

    const oracleSql = `
      INSERT INTO "detalles_estudios" ("certificado", "id_postulante", "id_estudio")
      VALUES (:certificado, :id_postulante, :id_estudio)
    `;

    const pgSql = `
      INSERT INTO detalles_estudios (certificado, id_postulante, id_estudio)
      VALUES ($1, $2, $3)
    `;

    for (let i = 0; i < detalles.length; i += BATCH_SIZE) {
      const batch = detalles.slice(i, i + BATCH_SIZE);

      // PostgreSQL (transacción)
      await pgClient.query('BEGIN');
      for (const d of batch) {
        await pgClient.query(pgSql, [
          d.certificado,
          d.id_postulante,
          d.id_estudio,
        ]);
      }
      await pgClient.query('COMMIT');

      // Oracle (executeMany)
      const binds = batch.map((d) => ({
        certificado: d.certificado,
        id_postulante: d.id_postulante,
        id_estudio: d.id_estudio,
      }));

      await oracleConn.executeMany(oracleSql, binds, { autoCommit: false });
      await oracleConn.commit();

      console.log(
        `✅ Lote ${i + batch.length}/${detalles.length} insertado correctamente`,
      );
    }

    console.log(
      `🎓 Inserción completada: ${detalles.length} registros creados en ambas bases`,
    );
  } catch (err) {
    console.error('❌ Error durante la inserción de detalles_estudios:', err);
  } finally {
    if (oracleConn) await oracleConn.close();

    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Evita error XX000
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
insertarDetallesDual();
