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
// Generador de datos
// --------------------------
function generarDatos(index: number) {
  return {
    email: `user${index}@example.com`,
    password: `pass${index}`,
    name: `Nombre${index}`,
    lastname: `Apellido${index}`,
    experiencia: Math.floor(Math.random() * 10),
    curriculum: `curriculum_${index}.pdf`,
    foto: `foto_${index}.jpg`,
    ubicacion: ['Medellín', 'Bogotá', 'Cali', 'Lima', 'Quito'][index % 5],
  };
}

// --------------------------
// Inserción en ambas bases
// --------------------------
async function insertarDatosDual() {
  let oracleConn: oracledb.Connection | undefined;

  try {
    // 1️⃣ Conexión a ambas bases de datos
    await pgClient.connect();
    console.log('✅ Conectado a PostgreSQL');

    oracleConn = await oracledb.getConnection(oracleConfig);
    console.log('✅ Conectado a Oracle');

    const total = 8000;
    const batchSize = 500;

    for (let i = 0; i < total; i += batchSize) {
      const batch = Array.from({ length: batchSize }, (_, j) =>
        generarDatos(i + j + 1),
      );

      // ===================== POSTGRES =====================
      const pgUserSql = `
        INSERT INTO users (email, password)
        VALUES ($1, $2)
        RETURNING id
      `;
      const pgPostulanteSql = `
        INSERT INTO postulantes (name, lastname, experiencia, curriculum, foto, ubicacion, id_perfil)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;

      const userIdsPg: number[] = [];
      for (const b of batch) {
        const res = await pgClient.query(pgUserSql, [b.email, b.password]);
        userIdsPg.push(res.rows[0].id);
      }

      for (let j = 0; j < batch.length; j++) {
        const b = batch[j];
        await pgClient.query(pgPostulanteSql, [
          b.name,
          b.lastname,
          b.experiencia,
          b.curriculum,
          b.foto,
          b.ubicacion,
          userIdsPg[j],
        ]);
      }

      // ===================== ORACLE =====================
      const oracleUserSql = `
        INSERT INTO "users" ("email", "password")
        VALUES (:email, :password)
    `;

      const oraclePostulanteSql = `
        INSERT INTO "postulantes" ("name", "lastname", "experiencia", "curriculum", "foto", "ubicacion", "id_perfil")
        VALUES (:name, :lastname, :experiencia, :curriculum, :foto, :ubicacion, :id_perfil)
    `;

      for (const b of batch) {
        // Insertar user
        const resultUser = await oracleConn.execute(
          oracleUserSql,
          { email: b.email, password: b.password },
          { autoCommit: false },
        );

        // Obtener el último ID insertado (suponiendo secuencia o trigger)
        const resultId = await oracleConn.execute(
          `SELECT "id" FROM "users" WHERE "email" = :email`,
          { email: b.email },
        );

        const userId = resultId.rows?.[0]?.[0];
        if (!userId) throw new Error('No se pudo obtener ID de usuario Oracle');

        // Insertar postulante asociado
        await oracleConn.execute(
          oraclePostulanteSql,
          {
            name: b.name,
            lastname: b.lastname,
            experiencia: b.experiencia,
            curriculum: b.curriculum,
            foto: b.foto,
            ubicacion: b.ubicacion,
            id_perfil: userId,
          },
          { autoCommit: false },
        );
      }

      await oracleConn.commit();
      console.log(`✅ Lote ${i + batchSize}/${total} insertado correctamente`);
    }

    console.log('🎉 Inserción completada con éxito en ambas bases de datos');
  } catch (err) {
    console.error('❌ Error en la inserción dual:', err);
  } finally {
    if (oracleConn) await oracleConn.close();
    await pgClient.end();
    console.log('🔒 Conexiones cerradas');
  }
}

insertarDatosDual();
