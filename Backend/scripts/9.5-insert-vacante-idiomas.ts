import { Client as PgClient } from 'pg';
import oracledb from 'oracledb';

// --------------------------
// Configuración Supabase (PostgreSQL)
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
// Función principal
// --------------------------
async function insertVacanteIdiomas() {
  try {
    await pgClient.connect();
    const oracleConnection = await oracledb.getConnection(oracleConfig);

    const totalVacantes = 600;
    const totalIdiomas = 15;
    const batchSize = 100;

    const allRows: { id_vacante: number; id_idioma: number }[] = [];

    // Generar 2 idiomas por cada vacante
    for (let v = 1; v <= totalVacantes; v++) {
      const idioma1 = Math.floor(Math.random() * totalIdiomas) + 1;
      let idioma2 = Math.floor(Math.random() * totalIdiomas) + 1;
      while (idioma2 === idioma1) {
        idioma2 = Math.floor(Math.random() * totalIdiomas) + 1;
      }
      allRows.push({ id_vacante: v, id_idioma: idioma1 });
      allRows.push({ id_vacante: v, id_idioma: idioma2 });
    }

    console.log(
      `Generadas ${allRows.length} filas para insertar (2 idiomas por vacante).`,
    );

    // --------------------------
    // Inserción en lotes en Supabase (PostgreSQL)
    // --------------------------
    console.log('Insertando en Supabase...');
    for (let i = 0; i < allRows.length; i += batchSize) {
      const batch = allRows.slice(i, i + batchSize);
      const values = batch
        .map((r, idx) => `($${idx * 2 + 1}, $${idx * 2 + 2})`)
        .join(', ');
      const params = batch.flatMap((r) => [r.id_vacante, r.id_idioma]);
      const query = `INSERT INTO vacante_idiomas (id_vacante, id_idioma) VALUES ${values};`;
      await pgClient.query(query, params);
      console.log(
        `→ Batch ${i / batchSize + 1} insertado en Supabase (${batch.length} filas)`,
      );
    }

    // --------------------------
    // Inserción en lotes en Oracle
    // --------------------------
    console.log('Insertando en Oracle...');
    for (let i = 0; i < allRows.length; i += batchSize) {
      const batch = allRows.slice(i, i + batchSize);
      const binds = batch.map((r) => ({
        id_vacante: r.id_vacante,
        id_idioma: r.id_idioma,
      }));

      const sql = `
        INSERT INTO "XE_LINKER"."vacante_idiomas" ("id_vacante", "id_idioma")
        VALUES (:id_vacante, :id_idioma)
      `;

      await oracleConnection.executeMany(sql, binds, { autoCommit: true });
      console.log(
        `→ Batch ${i / batchSize + 1} insertado en Oracle (${batch.length} filas)`,
      );
    }

    console.log('✅ Inserciones completadas en ambas bases de datos.');

    // Cerrar conexiones
    await pgClient.end();
    await oracleConnection.close();
  } catch (err) {
    console.error('❌ Error durante la inserción:', err);
  }
}

insertVacanteIdiomas();
