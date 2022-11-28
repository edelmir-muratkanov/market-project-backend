import { IsString } from 'class-validator'

export class ProductDto {
	@IsString()
	title: string

	@IsString()
	price: string

	@IsString()
	description: string

	@IsString()
	phone: string

	@IsString()
	address: string

	category: { id: number }
	images?: string[]

	isPublished?: boolean
}
