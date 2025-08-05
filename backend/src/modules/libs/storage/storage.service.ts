import {
	DeleteObjectCommand,
	type DeleteObjectCommandInput,
	PutObjectCommand,
	type PutObjectCommandInput,
	S3Client
} from '@aws-sdk/client-s3'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { AppConfig } from '@/src/core/config/app.config'

@Injectable()
export class StorageService {
	private readonly logger = new Logger(StorageService.name)

	private readonly client: S3Client
	private readonly bucket: string

	constructor(private readonly configService: ConfigService) {
		const s3Config = this.configService.getOrThrow<AppConfig['s3']>('s3')

		this.client = new S3Client({
			region: s3Config.region,
			credentials: {
				accessKeyId: s3Config.accessKeyId,
				secretAccessKey: s3Config.secretAccessKey
			}
		})

		this.bucket = s3Config.bucketName
	}

	async upload(buffer: Buffer, key: string, mimetype: string) {
		const command: PutObjectCommandInput = {
			Bucket: this.bucket,
			Key: String(key),
			Body: buffer,
			ContentType: mimetype
		}

		try {
			await this.client.send(new PutObjectCommand(command))
		} catch (error) {
			this.logger.error(`Failed to upload file: ${error}`)
			throw error
		}
	}

	async remove(key: string) {
		const command: DeleteObjectCommandInput = {
			Bucket: this.bucket,
			Key: String(key)
		}

		try {
			await this.client.send(new DeleteObjectCommand(command))
		} catch (error) {
			this.logger.error(`Failed to delete file: ${error}`)
			throw error
		}
	}
}
