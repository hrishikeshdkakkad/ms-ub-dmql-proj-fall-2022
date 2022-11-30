import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1669791207841 implements MigrationInterface {
    name = 'migrations1669791207841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "rating" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "comment"`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "comment" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "comment"`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "comment" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "rating" character varying NOT NULL`);
    }

}
