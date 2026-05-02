import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Rol } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(nombre: string, email: string, password: string, rol: Rol) {
        const hash = await bcrypt.hash(password, 10);
        return this.prisma.usuario.create({
            data: { nombre, email, password: hash, rol },
        });
        }

        async findByEmail(email: string) {
            return this.prisma.usuario.findUnique({ where: { email } });

        }
    }
