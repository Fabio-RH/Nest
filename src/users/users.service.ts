import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prisma.usuario.create({
        data: {
          nomeusuario: createUserDto.nomeusuario,
          emailusuario: createUserDto.emailusuario,
          usuariosenha: createUserDto.usuariosenha,
        },
        include: {
          contatos: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Email já existe');
      }
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.usuario.findMany({
      include: {
        contatos: true,
      },
    });
  }

  async findOne(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { idusuario: id },
      include: {
        contatos: true,
      },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return usuario;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.usuario.update({
        where: { idusuario: id },
        data: updateUserDto,
        include: {
          contatos: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
      }
      if (error.code === 'P2002') {
        throw new BadRequestException('Email já existe');
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.usuario.delete({
        where: { idusuario: id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
      }
      throw error;
    }
  }
}
