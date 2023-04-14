import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './repository/posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly repository: PostsRepository) {}

  async create(createPostDto: CreatePostDto) {
    return this.repository.create(createPostDto);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findOne(id: string) {
    return this.repository.findOne(id);
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return this.repository.update(id, updatePostDto);
  }

  async remove(id: string) {
    return this.repository.delete(id);
  }
}
