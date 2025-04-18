import { UserTypeormEntity } from '@modules/user';
import { MigrationInterface, QueryRunner } from 'typeorm';

//prettier-ignore
export class CreateUser1733021046881 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const userRepository = queryRunner.connection.getRepository(UserTypeormEntity);
        await userRepository.create({
            username: 'admin',
            password: 'admin',
        }).save()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const userRepository = queryRunner.connection.getRepository(UserTypeormEntity);
        await userRepository.delete({username: 'admin'})
    }

}
