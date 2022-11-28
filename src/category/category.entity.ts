import {
	Column,
	Entity,
	JoinTable,
	ManyToOne,
	OneToMany,
	Tree,
	TreeChildren,
	TreeParent
} from 'typeorm'
import { Base } from '../utils/base'
import { ProductEntity } from '../product/product.entity'

@Entity('category')
@Tree('closure-table', {
	ancestorColumnName: (col) => 'parent_' + col.propertyName,
	descendantColumnName: (col) => 'child_' + col.propertyName
})
export class CategoryEntity extends Base {
	@Column({ unique: true })
	name: string

	@OneToMany(() => ProductEntity, (product) => product.category)
	products: ProductEntity[]

	@TreeParent()
	parent?: CategoryEntity

	@TreeChildren()
	children?: CategoryEntity[]

	@OneToMany(() => CategoryOptionEntity, (opt) => opt.category)
	@JoinTable()
	options?: CategoryOptionEntity[]
}

@Entity('category_option')
export class CategoryOptionEntity extends Base {
	@Column({ unique: true })
	name: string

	@Column({ type: 'simple-array' })
	choices: string[]

	@ManyToOne(() => CategoryEntity, (category) => category.options)
	@JoinTable()
	category: CategoryEntity
}
