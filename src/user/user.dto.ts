import { IsEmail, IsString } from 'class-validator'

export class UserDto {
	@IsEmail()
	email: string

	@IsString()
	name: string

	password?: string

	@IsString()
	avatarPath: string

	// products:
}
