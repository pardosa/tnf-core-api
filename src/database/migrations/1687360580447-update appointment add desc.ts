import {MigrationInterface, QueryRunner} from "typeorm";

export class updateAppointmentAddDesc1687360580447 implements MigrationInterface {
    name = 'updateAppointmentAddDesc1687360580447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "startTime" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "startTime" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "description"`);
    }

}
