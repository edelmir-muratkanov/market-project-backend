import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryDto } from './category.dto'

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@UsePipes(new ValidationPipe())
	@Post()
	async create(@Body() dto: CategoryDto) {
		return await this.categoryService.create(dto)
	}

	@Get()
	async getAll() {
		return await this.categoryService.getRoot()
	}

	@Get('/:id')
	async get(@Param('id') id: number) {
		return await this.categoryService.getById(id)
	}

	@Put()
	async update() {}
}
