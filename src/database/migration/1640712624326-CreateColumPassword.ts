import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateColumPassword1640712624326 implements MigrationInterface {
    name = 'CreateColumPassword1640712624326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    }

}
