import GqlUpload from 'graphql-upload/Upload.mjs'
import * as sharp from 'sharp'

import { StorageService } from '@/src/modules/libs/storage/storage.service'

export async function uploadImage(
	storageService: StorageService,
	file: GqlUpload['file'],
	fileMeta: {
		path: string
		name: string
		size: {
			width: number
			height: number
		}
	},
	previousImage?: string | null
) {
	if (!file) {
		throw new Error('No file provided')
	}

	if (previousImage) {
		await storageService.remove(previousImage)
	}

	const chunks: Buffer[] = []

	for await (const chunk of file.createReadStream()) {
		chunks.push(chunk as Buffer)
	}

	const buffer = Buffer.concat(chunks)

	const fileName = `${fileMeta.path}/${fileMeta.name}.webp`

	if (file.filename && file.filename.endsWith('.gif')) {
		const processedBuffer = await sharp(buffer, { animated: true })
			.resize(fileMeta.size.width, fileMeta.size.height)
			.webp()
			.toBuffer()

		await storageService.upload(processedBuffer, fileName, 'image/webp')
	} else {
		const processedBuffer = await sharp(buffer)
			.resize(fileMeta.size.width, fileMeta.size.height)
			.webp()
			.toBuffer()

		await storageService.upload(processedBuffer, fileName, 'image/webp')
	}

	return fileName
}
