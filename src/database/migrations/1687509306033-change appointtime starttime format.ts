import {MigrationInterface, QueryRunner} from "typeorm";

export class changeAppointtimeStarttimeFormat1687509306033 implements MigrationInterface {
    name = 'changeAppointtimeStarttimeFormat1687509306033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "startTime"`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "startTime" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "startTime"`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "startTime" TIMESTAMP NOT NULL`);
    }

}
