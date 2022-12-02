import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { ProductModule } from './product/product.module'
import { CategoryModule } from './category/category.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { getTypeOrmConfig } from './config/db.config'
import { AuthModule } from './auth/auth.module'
import { MediaModule } from './media/media.module'
import { getBaseConfig } from './config/base.config'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getTypeOrmConfig
		}),
		UserModule,
		ProductModule,
		CategoryModule,
		AuthModule,
		MediaModule
	]
})
export class AppModule {}
