import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create(createContactDto: CreateContactDto) {
    try {
      return await this.prisma.contato.create({
        data: {
          nomecontato: createContactDto.nomecontato,
          telefonecontato: createContactDto.telefonecontato,
          emailcontato: createContactDto.emailcontato,
          enderecocontato: createContactDto.enderecocontato,
          usuario_idusuario: createContactDto.usuario_idusuario,
        },
        include: {
          usuario: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new BadRequestException('Usuário não encontrado');
      }
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.contato.findMany({
      include: {
        usuario: true,
      },
    });
  }

  async findOne(id: number) {
    const contato = await this.prisma.contato.findUnique({
      where: { idcontato: id },
      include: {
        usuario: true,
      },
    });

    if (!contato) {
      throw new NotFoundException(`Contato com ID ${id} não encontrado`);
    }

    return contato;
  }

  async findByUsuario(usuarioId: number) {
    return await this.prisma.contato.findMany({
      where: { usuario_idusuario: usuarioId },
      include: {
        usuario: true,
      },
    });
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    try {
      return await this.prisma.contato.update({
        where: { idcontato: id },
        data: updateContactDto,
        include: {
          usuario: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Contato com ID ${id} não encontrado`);
      }
      if (error.code === 'P2003') {
        throw new BadRequestException('Usuário não encontrado');
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.contato.delete({
        where: { idcontato: id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Contato com ID ${id} não encontrado`);
      }
      throw error;
    }
  }
}
