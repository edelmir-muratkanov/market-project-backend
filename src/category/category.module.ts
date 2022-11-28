import { Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryController } from './category.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryEntity, CategoryOptionEntity } from './category.entity'

@Module({
	controllers: [CategoryController],
	providers: [CategoryService],
	imports: [TypeOrmModule.forFeature([CategoryEntity, CategoryOptionEntity])]
})
export class CategoryModule {}
