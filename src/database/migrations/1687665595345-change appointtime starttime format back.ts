import {MigrationInterface, QueryRunner} from "typeorm";

export class changeAppointtimeStarttimeFormatBack1687665595345 implements MigrationInterface {
    name = 'changeAppointtimeStarttimeFormatBack1687665595345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "startTime"`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "startTime" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "startTime"`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "startTime" character varying NOT NULL`);
    }

}
