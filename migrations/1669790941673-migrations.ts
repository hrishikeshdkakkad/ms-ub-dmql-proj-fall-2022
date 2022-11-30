import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1669790941673 implements MigrationInterface {
    name = 'migrations1669790941673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment" ("id" SERIAL NOT NULL, "mode" integer NOT NULL, "amount" integer NOT NULL, "rideId" integer, CONSTRAINT "REL_af601ea84cf8bb9d45797c94bd" UNIQUE ("rideId"), CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rating" ("id" SERIAL NOT NULL, "rating" integer NOT NULL, "comment" integer NOT NULL, "rideId" integer, CONSTRAINT "REL_a457b132310823c44d7b6fbee2" UNIQUE ("rideId"), CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_af601ea84cf8bb9d45797c94bd3" FOREIGN KEY ("rideId") REFERENCES "ride"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_a457b132310823c44d7b6fbee22" FOREIGN KEY ("rideId") REFERENCES "ride"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_a457b132310823c44d7b6fbee22"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_af601ea84cf8bb9d45797c94bd3"`);
        await queryRunner.query(`DROP TABLE "rating"`);
        await queryRunner.query(`DROP TABLE "payment"`);
    }

}
