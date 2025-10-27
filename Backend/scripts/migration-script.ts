import { Client as PgClient } from 'pg';
import oracledb from 'oracledb';

// --------------------------
// Configuración Supabase/Postgres
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
// Tablas a migrar
// --------------------------
const tables = [
  'users',
  'empresas',
  'postulantes',
  'estudios',
  'detalles_estudios',
  'certificados',
  'detalles_certificados',
  'habilidades',
  'postulante_habilidades',
  'idiomas',
  'postulante_idiomas',
  'vacantes',
  'vacante_idiomas',
  'vacante_habilidades',
  'matches',
];

async function migrateTables() {
  try {
    await pgClient.connect();
    const oracleConnection = await oracledb.getConnection(oracleConfig);

    for (const table of tables) {
      console.log(`Migrando tabla: ${table}`);

      // Traer registros de Postgres
      const res = await pgClient.query(`SELECT * FROM "${table}"`);
      const rows = res.rows;

      for (const row of rows) {
        const columns = Object.keys(row)
          .map((c) => `"${c}"`)
          .join(', ');
        const values = Object.values(row)
          .map((v) => {
            if (v === null) return 'NULL';
            if (typeof v === 'string') return `'${v.replace(/'/g, "''")}'`;
            if (v instanceof Date)
              return `TO_DATE('${v.toISOString().slice(0, 10)}','YYYY-MM-DD')`;
            return v;
          })
          .join(', ');

        const sql = `INSERT INTO "${table}" (${columns}) VALUES (${values})`;

        try {
          await oracleConnection.execute(sql);
        } catch (err: any) {
          // Ignorar errores por duplicados o tipos de datos por ahora
          console.error(`Error insertando en ${table}: ${err.message}`);
        }
      }

      await oracleConnection.commit();
      console.log(`Tabla ${table} migrada ✅`);
    }

    await oracleConnection.close();
    await pgClient.end();
    console.log('Migración completa ✅');
  } catch (err) {
    console.error('Error en la migración:', err);
  }
}

migrateTables();
