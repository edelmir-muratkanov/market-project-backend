import { Column, Entity, JoinTable, OneToMany } from 'typeorm'
import { ProductEntity } from '../product/product.entity'
import { Base } from '../utils/base'

@Entity('user')
export class UserEntity extends Base {
	@Column({ default: '' })
	name: string

	@Column({ unique: true })
	email: string

	@Column({ select: false })
	password: string

	@Column({ default: '', name: 'avatar_path' })
	avatarPath: string

	@Column({ default: false, name: 'is_verified' })
	isVerified: boolean

	@OneToMany(() => ProductEntity, product => product.user)
	@JoinTable()
	products: ProductEntity[]
}
