import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CategoryEntity, CategoryOptionEntity } from './category.entity'
import { DataSource, Repository } from 'typeorm'
import { CategoryDto, CategoryOptionDto } from './category.dto'

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(CategoryEntity)
		private readonly categoryRepository: Repository<CategoryEntity>,
		@InjectRepository(CategoryOptionEntity)
		private readonly categoryOptionRepository: Repository<CategoryOptionEntity>,
		private readonly dataSource: DataSource
	) {}

	async createOrGetOption(dto: CategoryOptionDto) {
		const oldOption = await this.categoryOptionRepository.findOne({
			where: { name: dto.name }
		})

		if (oldOption) return oldOption

		const newOption = await this.categoryOptionRepository.create(dto)
		return await this.categoryOptionRepository.save(newOption)
	}

	async create(dto: CategoryDto) {
		const oldCategory = await this.categoryRepository.findOne({
			where: { name: dto.name }
		})
		if (oldCategory) throw new BadRequestException()

		const options: CategoryOptionDto[] = []

		dto.options?.map(async optionDto =>
			options.push(await this.createOrGetOption(optionDto))
		)

		const newCategory = await this.categoryRepository.create({
			...dto,
			options
		})

		if (dto.parent) {
			newCategory.parent = await this.getById(dto.parent.id)
		}

		return await this.categoryRepository.save(newCategory)
	}

	async getRoot() {
		return await this.dataSource.manager
			.getTreeRepository(CategoryEntity)
			.findTrees({
				relations: ['children']
			})
	}

	async getById(id?: number) {
		const category = await this.categoryRepository.findOne({
			where: {
				id
			},
			relations: {
				products: true,
				children: true,
				parent: true
			}
		})

		if (!category) throw new NotFoundException()
		return category
	}

	async update(id: number, dto: CategoryDto) {
		const category = await this.getById(id)
		return await this.categoryRepository.save({
			...category,
			...dto
		})
	}
}
