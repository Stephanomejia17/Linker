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
// Generadores de datos
// --------------------------
function generarPostulante(index: number) {
  return {
    tipo: 'postulante',
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

function generarEmpresa(index: number) {
  return {
    tipo: 'empresa',
    email: `empresa${index}@example.com`,
    password: `pass${index}`,
    name_empresa: `Empresa${index}`,
    descripcion: `Descripción de la empresa ${index}`,
    foto: `empresa_${index}.jpg`,
    NIT: `NIT-${100000 + index}`,
  };
}

// --------------------------
// Función principal
// --------------------------
async function insertarDatos() {
  let oracleConn: oracledb.Connection | undefined;

  try {
    // 🔌 Conexiones
    await pgClient.connect();
    console.log('✅ Conectado a PostgreSQL');

    oracleConn = await oracledb.getConnection(oracleConfig);
    console.log('✅ Conectado a Oracle');

    // Total de registros
    const totalPostulantes = 8000;
    const totalEmpresas = 1000;
    const batchSize = 500;

    // ==============================================
    // 🔹 INSERCIÓN DE POSTULANTES
    // ==============================================
    console.log(`🚀 Insertando ${totalPostulantes} postulantes...`);
    for (let i = 0; i < totalPostulantes; i += batchSize) {
      const batch = Array.from({ length: batchSize }, (_, j) =>
        generarPostulante(i + j + 1),
      );

      // Postgres
      const pgUserSql = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id`;
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

      // Oracle
      const oracleUserSql = `INSERT INTO "users" ("email", "password") VALUES (:email, :password)`;
      const oraclePostulanteSql = `
        INSERT INTO "postulantes" ("name", "lastname", "experiencia", "curriculum", "foto", "ubicacion", "id_perfil")
        VALUES (:name, :lastname, :experiencia, :curriculum, :foto, :ubicacion, :id_perfil)
      `;

      for (const b of batch) {
        await oracleConn.execute(
          oracleUserSql,
          { email: b.email, password: b.password },
          { autoCommit: false },
        );

        const resultId = await oracleConn.execute(
          `SELECT "id" FROM "users" WHERE "email" = :email`,
          { email: b.email },
        );
        const userId = resultId.rows?.[0]?.[0];
        if (!userId) throw new Error('No se pudo obtener ID de usuario Oracle');

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
      console.log(
        `✅ Lote postulantes ${i + batchSize}/${totalPostulantes} insertado`,
      );
    }

    // ==============================================
    // 🔹 INSERCIÓN DE EMPRESAS
    // ==============================================
    console.log(`🏢 Insertando ${totalEmpresas} empresas...`);
    for (let i = 0; i < totalEmpresas; i += batchSize) {
      const batch = Array.from({ length: batchSize }, (_, j) =>
        generarEmpresa(i + j + 1),
      );

      // Postgres
      const pgUserSql = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id`;
      const pgEmpresaSql = `
        INSERT INTO empresas (name_empresa, descripcion, foto, "NIT", id_perfil)
        VALUES ($1, $2, $3, $4, $5)
      `;

      const userIdsPg: number[] = [];
      for (const b of batch) {
        const res = await pgClient.query(pgUserSql, [b.email, b.password]);
        userIdsPg.push(res.rows[0].id);
      }

      for (let j = 0; j < batch.length; j++) {
        const b = batch[j];
        await pgClient.query(pgEmpresaSql, [
          b.name_empresa,
          b.descripcion,
          b.foto,
          b.NIT,
          userIdsPg[j],
        ]);
      }

      // Oracle
      const oracleUserSql = `INSERT INTO "users" ("email", "password") VALUES (:email, :password)`;
      const oracleEmpresaSql = `
        INSERT INTO "empresas" ("name_empresa", "descripcion", "foto", "NIT", "id_perfil")
        VALUES (:name_empresa, :descripcion, :foto, :NIT, :id_perfil)
      `;

      for (const b of batch) {
        await oracleConn.execute(
          oracleUserSql,
          { email: b.email, password: b.password },
          { autoCommit: false },
        );

        const resultId = await oracleConn.execute(
          `SELECT "id" FROM "users" WHERE "email" = :email`,
          { email: b.email },
        );
        const userId = resultId.rows?.[0]?.[0];
        if (!userId) throw new Error('No se pudo obtener ID de usuario Oracle');

        await oracleConn.execute(
          oracleEmpresaSql,
          {
            name_empresa: b.name_empresa,
            descripcion: b.descripcion,
            foto: b.foto,
            NIT: b.NIT,
            id_perfil: userId,
          },
          { autoCommit: false },
        );
      }

      await oracleConn.commit();
      console.log(
        `✅ Lote empresas ${i + batchSize}/${totalEmpresas} insertado`,
      );
    }

    console.log(
      '🎉 Inserción completa: 8000 postulantes + 1000 empresas = 9000 usuarios',
    );
  } catch (err) {
    console.error('❌ Error en la inserción dual:', err);
  } finally {
    if (oracleConn) await oracleConn.close();
    await pgClient.end();
    console.log('🔒 Conexiones cerradas');
  }
}

insertarDatos();
