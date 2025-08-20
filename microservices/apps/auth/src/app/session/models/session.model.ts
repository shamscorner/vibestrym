import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SessionModel {
  @Field(() => ID)
  public id: string;

  @Field(() => String)
  public userId: string;

  @Field(() => String)
  public createdAt: string;
}
