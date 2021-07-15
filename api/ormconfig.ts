const environment = {
  database: process.env.DEV_DB_NAME || process.env.PROD_DB_DATABASE,
  host: process.env.DEV_DB_HOST || process.env.PROD_DB_HOST,
  password: process.env.DEV_DB_PASS || process.env.PROD_DB_PASS,
  port: process.env.DEV_DB_PORT || process.env.PROD_DB_PORT,
  user: process.env.DEV_DB_USER || process.env.PROD_DB_USER
};

export default {
  'database': environment.database,
  'host': environment.host,
  'password': environment.password, 
  'port': environment.port,
  'username': environment.user,
  'type': 'postgres',
  'cli': {
    'entitiesDir': 'src/entity',
    'migrationsDir': 'src/migration',
    'subscribersDir': 'src/subscriber'
  },
  'entities': [
    'src/entity/**/*.ts'
  ],
  'logging': false,
  'migrations': [
    'src/migration/**/*.ts'
  ],
  'subscribers': [
    'src/subscriber/**/*.ts'
  ],
  'synchronize': true
};
