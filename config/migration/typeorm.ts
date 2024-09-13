import { config } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { join } from "path";

// Load environment variables from .env file
config();

// Define TypeORM data source options
export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres', // Database type
    host: process.env.HOST, // Database host from environment variables
    port: Number(process.env.PORT), // Database port from environment variables (converted to a number)
    username: process.env.USERNAME, // Database username from environment variables
    password: process.env.PASSWORD, // Database password from environment variables
    database: process.env.DATABASE, // Database name from environment variables
    entities: [join(__dirname, '/../**/*.entity{.ts,.js}')], // Adjust the path to your entity files
    migrations: [join(__dirname, '/../migrations/*.js')], // Adjust the path to your migration files
    synchronize: true // Set to false for production to avoid automatic schema updates
};

// Create and initialize TypeORM DataSource
const dataSource = new DataSource(dataSourceOptions);
dataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!'); // Log success message
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err); // Log error message if initialization fails
    });

export default dataSource; // Export the data source
