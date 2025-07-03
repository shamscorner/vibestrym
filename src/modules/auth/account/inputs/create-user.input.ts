import { Field, InputType } from '@nestjs/graphql'
import {
	IsEmail,
	IsNotEmpty,
	IsString,
	Matches,
	MinLength
} from 'class-validator'

// Username validation rules:

// Valid examples:
// user123
// john-doe
// cool-user-name-42
// Invalid examples:

// Invalid examples:
// -user (starts with hyphen)
// user- (ends with hyphen)
// user--name (consecutive hyphens)
// user@name (contains special characters)
// user name (contains spaces)

@InputType()
export class CreateUserInput {
	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	@Matches(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/)
	public username: string

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	public email: string

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	public password: string
}
