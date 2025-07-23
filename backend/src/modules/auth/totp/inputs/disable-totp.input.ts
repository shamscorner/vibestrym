import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString, Length } from 'class-validator'

@InputType()
export class DisableTotpInput {
	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	@Length(6, 6)
	public pin: string
}
