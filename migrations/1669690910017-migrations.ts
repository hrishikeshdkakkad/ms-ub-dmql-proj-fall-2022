import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1669690910017 implements MigrationInterface {
    name = 'migrations1669690910017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cartype" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "baseMultiplier" integer NOT NULL, CONSTRAINT "PK_f3af0173ea88b6346ae3cb1afaa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "licencenumber" character varying(100) NOT NULL, "color" character varying(200) NOT NULL, "cartypeId" integer, CONSTRAINT "licencenumber" UNIQUE ("licencenumber"), CONSTRAINT "REL_46078c5de6405dfb57cda1a7ad" UNIQUE ("cartypeId"), CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "phonenumber" character varying(100) NOT NULL, "email" character varying(200) NOT NULL, CONSTRAINT "customerphonenumber" UNIQUE ("phonenumber"), CONSTRAINT "customeremail" UNIQUE ("email"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fdb2f3ad8115da4c7718109a6e" ON "customer" ("email") `);
        await queryRunner.query(`CREATE TABLE "driver" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "address" character varying(300) NOT NULL, "phonenumber" character varying(100) NOT NULL, "carId" integer, CONSTRAINT "driverphonenumber" UNIQUE ("phonenumber"), CONSTRAINT "REL_7174f800666245cdf8454882d3" UNIQUE ("carId"), CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ridemeta" ("id" SERIAL NOT NULL, "fromLat" character varying(300) NOT NULL, "fromLng" character varying(300) NOT NULL, "toLat" character varying(300) NOT NULL, "toLng" character varying(300) NOT NULL, "distance" integer NOT NULL, CONSTRAINT "PK_134743c57d9aafefa865f58b07f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ride" ("id" SERIAL NOT NULL, "startTimestamp" TIMESTAMP NOT NULL DEFAULT now(), "endTimestamp" TIMESTAMP, "customerIdId" integer, "driverId" integer, "rideMetaId" integer, CONSTRAINT "REL_e68532977802a26034db1077d2" UNIQUE ("rideMetaId"), CONSTRAINT "PK_f6bc30c4dd875370bafcb54af1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_46078c5de6405dfb57cda1a7ade" FOREIGN KEY ("cartypeId") REFERENCES "cartype"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "driver" ADD CONSTRAINT "FK_7174f800666245cdf8454882d3b" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_28039c7d65fb00c7966fcb5f214" FOREIGN KEY ("customerIdId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_a212335bd593ecd23b665309e9d" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_e68532977802a26034db1077d2f" FOREIGN KEY ("rideMetaId") REFERENCES "ridemeta"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_e68532977802a26034db1077d2f"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_a212335bd593ecd23b665309e9d"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_28039c7d65fb00c7966fcb5f214"`);
        await queryRunner.query(`ALTER TABLE "driver" DROP CONSTRAINT "FK_7174f800666245cdf8454882d3b"`);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_46078c5de6405dfb57cda1a7ade"`);
        await queryRunner.query(`DROP TABLE "ride"`);
        await queryRunner.query(`DROP TABLE "ridemeta"`);
        await queryRunner.query(`DROP TABLE "driver"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fdb2f3ad8115da4c7718109a6e"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "car"`);
        await queryRunner.query(`DROP TABLE "cartype"`);
    }

}
