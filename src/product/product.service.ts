import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductEntity } from './product.entity'
import { FindOptionsWhereProperty, ILike, Repository } from 'typeorm'
import { ProductDto } from './product.dto'

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(ProductEntity)
		private readonly productRepository: Repository<ProductEntity>
	) {}

	async create(id: number, dto: ProductDto) {
		const newProduct = this.productRepository.create({
			user: { id: id },
			...dto
		})
		const product = await this.productRepository.save(newProduct)
		return product
	}

	async getAll(searchTerm?: string) {
		let options: FindOptionsWhereProperty<ProductEntity> = {}

		if (searchTerm)
			options = {
				title: ILike(`%${searchTerm}%`)
			}

		return await this.productRepository.find({
			where: {
				...options,
				isPublished: true
			},
			order: {
				createdAt: 'DESC'
			},
			relations: {
				user: true,
				category: true
			}
		})
	}

	async getById(id: number, isPublished = false) {
		const product = await this.productRepository.findOne({
			where: isPublished
				? {
						id,
						isPublished: true
				  }
				: { id },
			relations: {
				user: true,
				category: true
			}
		})

		if (!product) throw new NotFoundException()
		return product
	}

	async update(id: number, dto: ProductDto) {
		const product = await this.getById(id)
		return await this.productRepository.save({
			...product,
			...dto
		})
	}

	async delete(id: number) {
		return this.productRepository.delete({ id })
	}
}
