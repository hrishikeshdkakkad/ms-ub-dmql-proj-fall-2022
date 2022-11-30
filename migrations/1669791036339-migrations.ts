import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1669791036339 implements MigrationInterface {
    name = 'migrations1669791036339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "mode"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "mode" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "mode"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "mode" integer NOT NULL`);
    }

}
