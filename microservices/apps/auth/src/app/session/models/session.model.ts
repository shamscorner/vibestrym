import { Field, ID, ObjectType } from '@nestjs/graphql';

import { SessionMetadataModel } from './session-metadata.model';

@ObjectType()
export class SessionModel {
  @Field(() => ID)
  public id: string;

  @Field(() => String)
  public userId: string;

  @Field(() => String)
  public createdAt: string;

  @Field(() => SessionMetadataModel)
  public metadata: SessionMetadataModel;
}
