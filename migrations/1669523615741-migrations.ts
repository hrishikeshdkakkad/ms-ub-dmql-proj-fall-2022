import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1669523615741 implements MigrationInterface {
    name = 'migrations1669523615741'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "password" character varying NOT NULL, "username" character varying(200) NOT NULL, "roles" text NOT NULL, "isAccountDisabled" boolean NOT NULL, "email" character varying(200) NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), CONSTRAINT "username" UNIQUE ("username"), CONSTRAINT "email" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "articles" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "post" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" integer, CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rideMeta" ("id" SERIAL NOT NULL, "fromLat" character varying(300) NOT NULL, "fromLng" character varying(300) NOT NULL, "toLat" character varying(300) NOT NULL, "toLng" character varying(300) NOT NULL, "distance" integer NOT NULL, CONSTRAINT "PK_26e97e7fce06a75a860798660aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carType" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "baseMultiplier" integer NOT NULL, CONSTRAINT "PK_c65c77a8b061755fa12a0422163" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "licencenumber" character varying(100) NOT NULL, "color" character varying(200) NOT NULL, "cartypeId" integer, CONSTRAINT "licencenumber" UNIQUE ("licencenumber"), CONSTRAINT "REL_46078c5de6405dfb57cda1a7ad" UNIQUE ("cartypeId"), CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "driver" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "address" character varying(300) NOT NULL, "phonenumber" character varying(100) NOT NULL, "carId" integer, CONSTRAINT "driverphonenumber" UNIQUE ("phonenumber"), CONSTRAINT "REL_7174f800666245cdf8454882d3" UNIQUE ("carId"), CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ride" ("id" SERIAL NOT NULL, "address" character varying(300) NOT NULL, "startTimestamp" TIMESTAMP NOT NULL DEFAULT now(), "endTimestamp" TIMESTAMP, "customerIdId" integer, "driverId" integer, "rideMetaId" integer, CONSTRAINT "REL_e68532977802a26034db1077d2" UNIQUE ("rideMetaId"), CONSTRAINT "PK_f6bc30c4dd875370bafcb54af1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "phonenumber" character varying(100) NOT NULL, "email" character varying(200) NOT NULL, CONSTRAINT "customerphonenumber" UNIQUE ("phonenumber"), CONSTRAINT "customeremail" UNIQUE ("email"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_46078c5de6405dfb57cda1a7ade" FOREIGN KEY ("cartypeId") REFERENCES "carType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "driver" ADD CONSTRAINT "FK_7174f800666245cdf8454882d3b" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_28039c7d65fb00c7966fcb5f214" FOREIGN KEY ("customerIdId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_a212335bd593ecd23b665309e9d" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_e68532977802a26034db1077d2f" FOREIGN KEY ("rideMetaId") REFERENCES "rideMeta"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_e68532977802a26034db1077d2f"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_a212335bd593ecd23b665309e9d"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_28039c7d65fb00c7966fcb5f214"`);
        await queryRunner.query(`ALTER TABLE "driver" DROP CONSTRAINT "FK_7174f800666245cdf8454882d3b"`);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_46078c5de6405dfb57cda1a7ade"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "ride"`);
        await queryRunner.query(`DROP TABLE "driver"`);
        await queryRunner.query(`DROP TABLE "car"`);
        await queryRunner.query(`DROP TABLE "carType"`);
        await queryRunner.query(`DROP TABLE "rideMeta"`);
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
