import { IsArray, IsString } from 'class-validator'

export class CategoryOptionDto {
	@IsString()
	name: string

	@IsArray()
	choices: string[]
}

export class CategoryDto {
	@IsString()
	name: string

	parent?: { id: number }

	options?: CategoryOptionDto[]
}
