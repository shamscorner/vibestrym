import { DeviceInfo, LocationInfo, SessionMetadata } from '@microservices/core';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LocationModel implements LocationInfo {
  @Field(() => String)
  public country: string;

  @Field(() => String)
  public city: string;

  @Field(() => Number)
  public latitude: number;

  @Field(() => Number)
  public longitude: number;
}

@ObjectType()
export class DeviceModel implements DeviceInfo {
  @Field(() => String)
  public browser: string;

  @Field(() => String)
  public os: string;

  @Field(() => String)
  public type: string;
}

@ObjectType()
export class SessionMetadataModel implements SessionMetadata {
  @Field(() => LocationModel)
  public location: LocationModel;

  @Field(() => DeviceModel)
  public device: DeviceModel;

  @Field(() => String)
  public ip: string;
}
