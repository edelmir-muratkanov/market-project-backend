import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ProductService } from './product.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../user/user.decorator'
import { ProductDto } from './product.dto'

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Get('private/:id')
	@Auth()
	async getPrivate(@Param('id') id: string) {
		return await this.productService.getById(Number(id))
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		return await this.productService.getById(Number(id), true)
	}

	@Get()
	async getAll(@Query('search') searchTerm?: string) {
		return await this.productService.getAll(searchTerm)
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@Auth()
	async create(@CurrentUser('id') id: number, @Body() dto: ProductDto) {
		return await this.productService.create(id, dto)
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@Auth()
	async update(@Param('id') id: string, @Body() dto: ProductDto) {
		return await this.productService.update(Number(id), dto)
	}

	@UsePipes(new ValidationPipe())
	@Delete(':id')
	@Auth()
	async delete(@Param('id') id: string) {
		return await this.productService.delete(Number(id))
	}
}
