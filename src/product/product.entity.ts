import { Column, Entity, JoinTable, ManyToOne } from 'typeorm'
import { UserEntity } from '../user/user.entity'
import { Base } from '../utils/base'
import { CategoryEntity } from '../category/category.entity'

@Entity('product')
export class ProductEntity extends Base {
	@Column()
	title: string

	@Column({ default: 'Договорная' })
	price: string

	@Column({ default: '', type: 'text' })
	description: string

	@Column()
	phone: string

	@Column({ type: 'simple-array' })
	images: string[]

	@Column()
	address: string

	@Column({ default: false, name: 'is_published' })
	isPublished: boolean

	@ManyToOne(() => UserEntity, user => user.products)
	@JoinTable()
	user: UserEntity

	@ManyToOne(() => CategoryEntity, category => category.products)
	@JoinTable()
	category: CategoryEntity
}
