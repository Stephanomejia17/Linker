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
// Catálogo base de nombres
// --------------------------
const CERTIFICADOS_BASE = [
  'AWS Certified Developer',
  'AWS Certified Solutions Architect',
  'Cisco CCNA',
  'Cisco CCNP',
  'Microsoft Azure Fundamentals',
  'Google Cloud Associate Engineer',
  'Scrum Master',
  'Data Science Professional',
  'Machine Learning Engineer',
  'Frontend Developer',
  'Backend Developer',
  'DevOps Engineer',
  'React Professional',
  'Angular Specialist',
  'Python Developer',
  'Java Developer',
  'C++ Specialist',
  'SQL Database Expert',
  'Cybersecurity Analyst',
  'UI/UX Designer',
];

// --------------------------
// Entidades emisoras posibles
// --------------------------
const ENTIDADES = [
  'Amazon Web Services',
  'Cisco Systems',
  'Microsoft',
  'Google',
  'IBM',
  'Oracle Academy',
  'Coursera',
  'Udemy',
  'edX',
  'LinkedIn Learning',
  'HarvardX',
  'MITx',
  'Pluralsight',
  'CertiProf',
  'Red Hat',
];

type Certificado = {
  nombre_certificado: string;
  entidad_emisora: string;
};

// --------------------------
// Generador de certificados
// --------------------------
function generarCertificados(total: number) {
  const certificados: Certificado[] = [];

  for (let i = 0; i < total; i++) {
    const nombre =
      CERTIFICADOS_BASE[i % CERTIFICADOS_BASE.length] + ` #${i + 1}`;
    const entidad = ENTIDADES[Math.floor(Math.random() * ENTIDADES.length)];

    certificados.push({
      nombre_certificado: nombre,
      entidad_emisora: entidad,
    });
  }

  return certificados;
}

// --------------------------
// Inserción dual
// --------------------------
async function insertarCertificadosDual() {
  let oracleConn: oracledb.Connection | undefined;

  try {
    // 🔌 Conectar a ambas bases
    await pgClient.connect();
    console.log('✅ Conectado a PostgreSQL (Supabase)');

    oracleConn = await oracledb.getConnection(oracleConfig);
    console.log('✅ Conectado a Oracle');

    const certificados = generarCertificados(600);
    const batchSize = 100;

    // =====================================
    // PostgreSQL - Inserción por lotes
    // =====================================
    await pgClient.query('BEGIN');
    for (let i = 0; i < certificados.length; i += batchSize) {
      const batch = certificados.slice(i, i + batchSize);

      const values = batch
        .map((_, j) => `($${j * 2 + 1}, $${j * 2 + 2})`)
        .join(', ');

      const params = batch.flatMap((c) => [
        c.entidad_emisora,
        c.nombre_certificado,
      ]);

      await pgClient.query(
        `INSERT INTO certificados (entidad_emisora, nombre_certificado) VALUES ${values}`,
        params,
      );

      console.log(
        `✅ Lote ${i + batch.length}/${certificados.length} insertado en Supabase`,
      );
    }
    await pgClient.query('COMMIT');
    console.log(
      `🟢 ${certificados.length} certificados insertados en PostgreSQL`,
    );

    // =====================================
    // ORACLE - Inserción masiva
    // =====================================
    const oracleSql = `
      INSERT INTO "certificados" ("entidad_emisora", "nombre_certificado")
      VALUES (:entidad_emisora, :nombre_certificado)
    `;
    const binds = certificados.map((c) => ({
      entidad_emisora: c.entidad_emisora,
      nombre_certificado: c.nombre_certificado,
    }));

    await oracleConn.executeMany(oracleSql, binds, { autoCommit: false });
    await oracleConn.commit();
    console.log(`🟣 ${certificados.length} certificados insertados en Oracle`);

    console.log('🎯 Inserción completada en ambas bases de datos');
  } catch (err) {
    console.error('❌ Error durante la inserción de certificados:', err);
    try {
      await pgClient.query('ROLLBACK');
      if (oracleConn) await oracleConn.rollback();
    } catch {}
  } finally {
    if (oracleConn) await oracleConn.close();
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // evita error XX000
      await pgClient.end();
    } catch (pgErr) {
      console.warn('⚠️ Error al cerrar conexión PostgreSQL:', pgErr.message);
    }
    console.log('🔒 Conexiones cerradas correctamente');
  }
}

// Ejecutar script
insertarCertificadosDual();
