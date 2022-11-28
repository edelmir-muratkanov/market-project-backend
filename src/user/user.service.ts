import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { Repository } from 'typeorm'
import { UserDto } from './user.dto'
import { genSalt, hash } from 'bcryptjs'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {}

	async getById(id: number) {
		const user = await this.userRepository.findOne({
			where: {
				id
			},
			relations: {
				products: true
			},
			order: {
				createdAt: 'DESC'
			}
		})

		if (!user) throw new NotFoundException()
		return user
	}

	async update(id: number, dto: UserDto) {
		const user = await this.getById(id)
		const user2 = await this.userRepository.findOneBy({ email: dto.email })

		if (user2 && id !== user2.id) throw new BadRequestException()

		if (dto.password) {
			const salt = await genSalt(10)
			user.password = await hash(dto.password, salt)
		}

		user.email = dto.email
		user.name = dto.name
		user.avatarPath = dto.avatarPath

		return await this.userRepository.save(user)
	}
}
