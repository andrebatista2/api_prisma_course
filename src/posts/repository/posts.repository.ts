import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostEntity } from '../entities/post.entity';
import { UpdatePostDto } from '../dto/update-post.dto';
import { NotFoundError } from '../../common/errors/types/NotFoundError';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(create: CreatePostDto): Promise<PostEntity> {
    const { authorEmail } = create;
    delete create.authorEmail;

    const user = await this.prisma.user.findUnique({
      where: {
        email: authorEmail,
      },
    });

    if (!user) {
      throw new NotFoundError('Author not found');
    }

    const data: Prisma.PostCreateInput = {
      ...create,
      author: {
        connect: {
          email: authorEmail,
        },
      },
    };

    return this.prisma.post.create({
      data,
    });
  }

  async findAll(): Promise<PostEntity[]> {
    return this.prisma.post.findMany({
      include: {
        author: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<Partial<PostEntity>> {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        published: true,
        title: true,
        content: true,
        author: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });
  }

  async update(id: string, update: UpdatePostDto): Promise<PostEntity> {
    const { authorEmail } = update;
    if (!authorEmail) {
      return this.prisma.post.update({
        where: {
          id,
        },
        data: update,
      });
    }

    delete update.authorEmail;
    const user = await this.prisma.user.findUnique({
      where: {
        email: authorEmail,
      },
    });

    if (!user) {
      throw new NotFoundError('Author not found');
    }

    const data: Prisma.PostUpdateInput = {
      ...update,
      author: {
        connect: {
          email: authorEmail,
        },
      },
    };

    return this.prisma.post.update({
      where: {
        id,
      },
      data,
      include: {
        author: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });
  }

  async delete(id: string): Promise<PostEntity> {
    return this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
