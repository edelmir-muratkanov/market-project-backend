import {
	Controller,
	Post,
	UploadedFiles,
	UseInterceptors
} from '@nestjs/common'
import { MediaService } from './media.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { FileFieldsInterceptor } from '@nestjs/platform-express'

@Controller('media')
export class MediaController {
	constructor(private readonly mediaService: MediaService) {}

	@Post()
	@Auth()
	@UseInterceptors(
		FileFieldsInterceptor([
			{ name: 'profile', maxCount: 1 },
			{ name: 'product', maxCount: 10 }
		])
	)
	async upload(
		@UploadedFiles()
		files: {
			profile?: Express.Multer.File[]
			product?: Express.Multer.File[]
		}
	) {
		return this.mediaService.upload(files.profile, files.product)
	}
}
