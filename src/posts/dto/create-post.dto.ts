import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreatePostDto {
  @ApiProperty({ description: 'Email de usuário' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Nome completo'})
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ description: 'Define se é Admin ou não', default: false, })
  @IsEmail()
  authorEmail: string;
}
