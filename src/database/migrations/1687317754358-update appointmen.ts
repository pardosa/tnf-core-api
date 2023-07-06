import {MigrationInterface, QueryRunner} from "typeorm";

export class updateAppointmen1687317754358 implements MigrationInterface {
    name = 'updateAppointmen1687317754358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" ADD "patientname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" DROP CONSTRAINT "FK_05b50765bd00c64bfe8052d2b6e"`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "doctorId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_514bcc3fb1b8140f85bf1cde6e2"`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "doctorId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ADD CONSTRAINT "FK_05b50765bd00c64bfe8052d2b6e" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_514bcc3fb1b8140f85bf1cde6e2" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_514bcc3fb1b8140f85bf1cde6e2"`);
        await queryRunner.query(`ALTER TABLE "availability" DROP CONSTRAINT "FK_05b50765bd00c64bfe8052d2b6e"`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "doctorId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_514bcc3fb1b8140f85bf1cde6e2" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "doctorId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ADD CONSTRAINT "FK_05b50765bd00c64bfe8052d2b6e" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "patientname"`);
    }

}
