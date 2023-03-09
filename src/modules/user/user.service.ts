import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    try {
      // const user = new User();
      const userRepo = await getRepository(User);
      const result = await userRepo.save({
        name: createUserDto.name,
      });
      return result;
    } catch (error) {
      throw new InternalServerErrorException('error in user create service.');
    }
  }

  async findAll() {
    try {
      const userRepo = await getRepository(User);
      const result = await userRepo.find();
      return result;
    } catch (error) {
      throw new InternalServerErrorException('error in users service.');
    }
  }

  async findOne(id: number) {
    try {
      const userRepo = await getRepository(User);
      const result = await userRepo.findOne({
        where: {
          id,
        },
      });
      return result;
    } catch (error) {
      throw new InternalServerErrorException('error in users service.');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const userRepo = await getRepository(User);
      const result = await userRepo.update(
        { id },
        { name: updateUserDto.name },
      );
      return result;
    } catch (error) {
      throw new InternalServerErrorException('error in users service.');
    }
  }

  async remove(id: number) {
    try {
      const userRepo = await getRepository(User);
      const result = await userRepo.delete({ id });
      return result;
    } catch (error) {
      throw new InternalServerErrorException('error in users service.');
    }
  }
}
