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
// Generar 20,000 interacciones aleatorias
// --------------------------
function generateInteracciones() {
  const interacciones: {
    fecha_registro: Date;
    accionEmpresa: string;
    accionPostulante: string;
    vacante_id: number;
    postulante_id: number;
  }[] = [];

  const acciones = ['like', 'dislike', 'no_interaccion'];

  for (let i = 0; i < 20000; i++) {
    interacciones.push({
      fecha_registro: new Date(),
      accionEmpresa: acciones[Math.floor(Math.random() * acciones.length)],
      accionPostulante: acciones[Math.floor(Math.random() * acciones.length)],
      vacante_id: Math.floor(Math.random() * 600) + 1,
      postulante_id: Math.floor(Math.random() * 8000) + 1,
    });
  }

  return interacciones;
}

// --------------------------
// Inserción en Supabase (PostgreSQL)
// --------------------------
async function insertBatchPostgres(interacciones: any[]) {
  const batchSize = 1000;
  for (let i = 0; i < interacciones.length; i += batchSize) {
    const batch = interacciones.slice(i, i + batchSize);
    const values = batch
      .map(
        (i) =>
          `('${i.fecha_registro.toISOString()}', '${i.accionEmpresa}', '${i.accionPostulante}', ${i.vacante_id}, ${i.postulante_id})`,
      )
      .join(',');

    const query = `
      INSERT INTO interacciones ("fecha_registro", "accionEmpresa", "accionPostulante", "vacante_id", "postulante_id")
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
  interacciones: any[],
) {
  const batchSize = 1000;
  for (let i = 0; i < interacciones.length; i += batchSize) {
    const batch = interacciones.slice(i, i + batchSize);

    const binds = batch.map((i) => [
      i.fecha_registro,
      i.accionEmpresa,
      i.accionPostulante,
      i.vacante_id,
      i.postulante_id,
    ]);

    const sql = `
      INSERT INTO "XE_LINKER"."interacciones"
      ("fecha_registro", "accionEmpresa", "accionPostulante", "vacante_id", "postulante_id")
      VALUES (:1, :2, :3, :4, :5)
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
    console.log('🌀 Generando interacciones...');
    const interacciones = generateInteracciones();
    console.log(`Generadas ${interacciones.length} interacciones.`);

    // Conectar a ambas bases de datos
    console.log('🔗 Conectando a Supabase...');
    await pgClient.connect();

    console.log('🔗 Conectando a Oracle...');
    const oracleConn = await oracledb.getConnection(oracleConfig);

    // Insertar en ambas bases
    console.log('🚀 Insertando en Supabase...');
    await insertBatchPostgres(interacciones);

    console.log('🚀 Insertando en Oracle...');
    await insertBatchOracle(oracleConn, interacciones);

    console.log('🎉 Inserción completada en ambas bases de datos.');

    await oracleConn.close();
    await pgClient.end();
  } catch (err) {
    console.error('❌ Error en la inserción:', err);
  }
})();
