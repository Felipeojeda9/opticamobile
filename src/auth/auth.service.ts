import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService }  from '../users/users.service';
import { Rol } from '@prisma/client';
import * as bycrypt from 'bcrypt';

@Injectable()
export class AuthService { 
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async register(nombre: string, email: string, password: string, rol: Rol = Rol.PACIENTE) {
        const existe = await this.usersService.findByEmail(email);
        if (existe) throw new ConflictException('El email ya esta registrado');

        const usuario = await this.usersService.create(nombre, email, password, rol);
        return this.signToken(usuario.id, usuario.email, usuario.rol);
    }

    async login(email: string, password: string) {
        const usuario = await this.usersService.findByEmail(email);
        if (!usuario) throw new UnauthorizedException('Credenciales invalidas');

        const valido = await bycrypt.compare(password, usuario.password);
        if (!valido) throw new UnauthorizedException('Credenciales invalidas');
            
            return this.signToken(usuario.id, usuario.email, usuario.rol);
        }
        
        private signToken(id: number, email: string, rol: Rol) { 
            const payload = { sub: id, email, rol };
            return { acces_token: this.jwtService.sign(payload) };

        }
    }



