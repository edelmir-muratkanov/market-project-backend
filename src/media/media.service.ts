import { Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import { extname } from 'path'
import { IMediaResponse } from './media.interface'

@Injectable()
export class MediaService {
	async editFileName(filename: string) {
		const name = filename.split('.')[0]
		const extName = extname(filename)

		const randomName = Array(8)
			.fill(null)
			.map(() => Math.round(Math.random() * 10).toString(10))
			.join('')

		return `${name}_${randomName}${extName}`
	}

	async saveFile(
		mediaFile: Express.Multer.File,
		folder = 'default'
	): Promise<IMediaResponse> {
		const uploadFolder = `${path}/uploads/${folder}`
		await ensureDir(uploadFolder)

		const newName = await this.editFileName(mediaFile.originalname)
		await writeFile(`${uploadFolder}/${newName}`, mediaFile.buffer)

		return {
			url: `/uploads/${folder}/${newName}`,
			name: newName
		}
	}

	async upload(
		profiles?: Express.Multer.File[],
		products?: Express.Multer.File[]
	) {
		const res: IMediaResponse[] = []

		for (const profile of profiles) {
			await res.push(await this.saveFile(profile, profile.fieldname))
		}

		for (const product of products) {
			await res.push(await this.saveFile(product, product.fieldname))
		}

		return res
	}
}
