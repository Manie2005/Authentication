import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

// Load environment variables from .env file
config();

// Validate environment variables
const requiredEnvVars = ['HOST', 'PORT', 'USERNAME', 'PASSWORD', 'DATABASE'];
requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        throw new Error(`Missing environment variable: ${envVar}`);
    }
});

// Define TypeORM data source options
const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.HOST,
    port: Number(process.env.PORT),
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, '/../migrations/*.js')],
    synchronize: false, // Set to true for development, false for production
};

// Create and initialize TypeORM DataSource
const dataSource = new DataSource(dataSourceOptions);

dataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
        process.exit(1); // Exit the process if initialization fails
    });

export default dataSource;
