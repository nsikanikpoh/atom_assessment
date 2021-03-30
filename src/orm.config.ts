import { TypeOrmModuleOptions} from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.TYPEORM_USERNAME || 'postgres',
    password: process.env.TYPEORM_PASSWORD || 'screen',
    database: process.env.TYPEORM_DATABASE || 'atom_assessment_dev',
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/**/*.migration{.ts,.js}'],
    synchronize: false,

}