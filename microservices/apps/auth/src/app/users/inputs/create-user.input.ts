import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma-client/auth';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength
} from 'class-validator';

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
export class CreateUserInput implements Partial<Prisma.UserCreateInput> {
  @Field(() => String)
  @IsString()
  @Matches(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/)
  @IsNotEmpty()
  public username: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @Field(() => String)
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  public password: string;
}
