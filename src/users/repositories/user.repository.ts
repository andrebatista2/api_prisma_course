import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { NotFoundError } from '../../common/errors/types/NotFoundError';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<UserEntity> {
    return this.prisma.user.create({
      data,
      include: {
        posts: {
          select: {
            title: true,
            created_at: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.prisma.user.findMany({
      include: {
        posts: {
          select: {
            title: true,
            created_at: true,
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        posts: {
          select: {
            title: true,
            created_at: true,
          },
        },
      },
    });
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data,
      include: {
        posts: {
          select: {
            title: true,
            created_at: true,
          },
        },
      },
    });
  }

  async delete(id: string) {
    await this.prisma.user.delete({
      where: {
        id,
      },
      include: {
        posts: {
          select: {
            title: true,
            created_at: true,
          },
        },
      },
    });
  }
}
