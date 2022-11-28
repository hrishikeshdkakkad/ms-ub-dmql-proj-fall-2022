import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1669649557803 implements MigrationInterface {
    name = 'migrations1669649557803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "address"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" ADD "address" character varying(300) NOT NULL`);
    }

}
