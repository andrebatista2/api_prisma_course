import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    // throw new UnauthorizedException('Não autorizado');
    return this.repository.create(createUserDto);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.repository.findAll();
    if (users.length === 0) {
      throw new NotFoundException(
        'Não foram localizados registros para o recurso solicitado',
      );
    }

    return users;
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.repository.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado na base de dados');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.repository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return this.repository.delete(id);
  }
}
