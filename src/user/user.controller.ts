import {
	Body,
	Controller,
	Get,
	Param,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from './user.decorator'
import { UserDto } from './user.dto'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('me')
	@Auth()
	async getProfile(@CurrentUser('id') id: number) {
		return await this.userService.getById(id)
	}

	@Get(':id')
	async getUser(@Param('id') id: string) {
		return await this.userService.getById(Number(id))
	}

	@UsePipes(new ValidationPipe())
	@Put('me')
	@Auth()
	async update(@CurrentUser('id') id: number, @Body() dto: UserDto) {
		return await this.userService.update(id, dto)
	}
}
