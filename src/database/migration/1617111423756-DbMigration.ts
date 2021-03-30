import {MigrationInterface, QueryRunner} from "typeorm";

export class DbMigration1617111423756 implements MigrationInterface {
    name = 'DbMigration1617111423756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "transactions"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "transactions"."updated_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "balances"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "balances"."updated_at" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "balances"."updated_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "balances"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "transactions"."updated_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "transactions"."createdAt" IS NULL`);
    }

}
