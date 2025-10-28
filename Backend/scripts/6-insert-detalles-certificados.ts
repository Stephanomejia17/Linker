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
// Generador de fechas aleatorias
// --------------------------
function generarFechas() {
  const inicio = new Date(2018, 0, 1);
  const fin = new Date(2025, 0, 1);
  const fechaEmision = new Date(
    inicio.getTime() + Math.random() * (fin.getTime() - inicio.getTime()),
  );
  const fechaCaducidad = new Date(
    fechaEmision.getFullYear() + 1 + Math.floor(Math.random() * 3),
    fechaEmision.getMonth(),
    fechaEmision.getDate(),
  );
  return { fecha_emision: fechaEmision, fecha_caducidad: fechaCaducidad };
}

// --------------------------
// Generador de registros
// --------------------------
type DetalleCertificado = {
  id_empresa: number;
  id_certificado: number;
  fecha_emision: Date;
  fecha_caducidad: Date;
};

function generarDetallesCertificados(): DetalleCertificado[] {
  const registros: DetalleCertificado[] = [];
  const totalEmpresas = 1000;
  const totalCertificados = 600;

  let certificadoIndex = 1;

  for (let empresaId = 1; empresaId <= totalEmpresas; empresaId++) {
    for (let i = 0; i < 3; i++) {
      const { fecha_emision, fecha_caducidad } = generarFechas();

      registros.push({
        id_empresa: empresaId,
        id_certificado: certificadoIndex,
        fecha_emision,
        fecha_caducidad,
      });

      certificadoIndex++;
      if (certificadoIndex > totalCertificados) certificadoIndex = 1;
    }
  }

  return registros;
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

    const registros = generarDetallesCertificados();
    console.log(`🔢 Generados ${registros.length} registros`);

    const batchSize = 100;

    // ===============================
    // PostgreSQL (Supabase)
    // ===============================
    await pgClient.query('BEGIN');
    for (let i = 0; i < registros.length; i += batchSize) {
      const batch = registros.slice(i, i + batchSize);

      const values = batch
        .map(
          (_, j) =>
            `($${j * 4 + 1}, $${j * 4 + 2}, $${j * 4 + 3}, $${j * 4 + 4})`,
        )
        .join(', ');

      const params = batch.flatMap((r) => [
        r.fecha_emision,
        r.fecha_caducidad,
        r.id_empresa,
        r.id_certificado,
      ]);

      await pgClient.query(
        `INSERT INTO detalles_certificados (fecha_emision, fecha_caducidad, id_empresa, id_certificado) VALUES ${values}`,
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
      INSERT INTO "detalles_certificados" ("fecha_emision", "fecha_caducidad", "id_empresa", "id_certificado")
      VALUES (:fecha_emision, :fecha_caducidad, :id_empresa, :id_certificado)
    `;

    const binds = registros.map((r) => ({
      fecha_emision: r.fecha_emision,
      fecha_caducidad: r.fecha_caducidad,
      id_empresa: r.id_empresa,
      id_certificado: r.id_certificado,
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
insertarDetallesDual();
