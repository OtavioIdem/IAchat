import { DataSource } from 'typeorm';

export const databaseChatBotProviders = [{
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
        const dataSource = new DataSource({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: 6050,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: (process.env.ENVIRONMENT === 'homolog')
                        ? process.env.DATABASE_NAME_HOMOLOG
                        : process.env.DATABASE_NAME,
            entities: [
                __dirname + '/../**/*.entity{.ts,.js}',
            ],
            synchronize: false,
        });

        return dataSource.initialize();
    }
}]
