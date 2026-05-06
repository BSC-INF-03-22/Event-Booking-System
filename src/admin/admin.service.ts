import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
  ) {}

  // CREATE
  async create(dto: CreateAdminDto) {
  try {
    const admin = this.adminRepo.create(dto);
    const saved = await this.adminRepo.save(admin);

    const { password, ...result } = saved;
    return result;
  } catch (error) {
    console.error('ADMIN CREATE ERROR:', error);
    throw error;
  }
}
  // READ ALL
  async findAll() {
    const admins = await this.adminRepo.find();

    return admins.map(({ password, ...admin }) => admin);
  }

  // READ ONE
  async findOne(id: number) {
    const admin = await this.adminRepo.findOneBy({ id });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    const { password, ...result } = admin;
    return result;
  }

  // UPDATE
 async update(id: number, dto: UpdateAdminDto) {
  const admin = await this.adminRepo.findOneBy({ id });

  if (!admin) {
    throw new NotFoundException('Admin not found');
  }

  await this.adminRepo.update(id, dto);

  const updated = await this.adminRepo.findOneBy({ id });

  if (!updated) {
    throw new NotFoundException('Admin not found after update');
  }

  const { password, ...result } = updated;
  return result;
}
  // DELETE
  async remove(id: number) {
    const admin = await this.adminRepo.findOneBy({ id });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    await this.adminRepo.delete(id);

    return { message: 'Admin deleted successfully' };
  }
}