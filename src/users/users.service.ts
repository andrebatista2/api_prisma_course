import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from './entities/user.entity';
import { NotFoundError } from '../common/errors/types/NotFoundError';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    return this.repository.create(createUserDto);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.repository.findAll();
    if (users.length === 0) {
      throw new NotFoundError(
        'Não foram localizados registros para o recurso solicitado',
      );
    }

    return users;
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.repository.findOne(id);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado na base de dados');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.repository.findOne(id);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado na base de dados');
    }

    return this.repository.update(id, updateUserDto);
  }

  async remove(id: string) {
    const user = await this.repository.findOne(id);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado na base de dados');
    }

    return this.repository.delete(id);
  }
}
