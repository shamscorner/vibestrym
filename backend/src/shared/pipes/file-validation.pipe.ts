import {
	type ArgumentMetadata,
	BadRequestException,
	Injectable,
	type PipeTransform
} from '@nestjs/common'
import { ReadStream } from 'fs'

import { validateFileFormat, validateFileSize } from '../utils/file.util'

type Value = {
	filename: string
	createReadStream: () => ReadStream
}

@Injectable()
export class FileValidationPipe implements PipeTransform {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async transform(value: any, metadata: ArgumentMetadata) {
		const fileValue = value as Value

		if (!fileValue.filename) {
			throw new BadRequestException('File not uploaded')
		}

		const { filename, createReadStream } = fileValue

		const fileStream = createReadStream()

		const allowedFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif']
		const isFileFormatValid = validateFileFormat(filename, allowedFormats)

		if (!isFileFormatValid) {
			throw new BadRequestException('Unsupported file format')
		}

		const isFileSizeValid = await validateFileSize(
			fileStream,
			10 * 1024 * 1024
		)

		if (!isFileSizeValid) {
			throw new BadRequestException('File size exceeds 10 MB')
		}

		return fileValue
	}
}
