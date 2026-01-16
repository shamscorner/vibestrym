/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any };
};

export type AuthModel = {
  __typename?: "AuthModel";
  message?: Maybe<Scalars["String"]["output"]>;
  user?: Maybe<UserModel>;
};

export type CategoryModel = {
  __typename?: "CategoryModel";
  createdAt: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  slug: Scalars["String"]["output"];
  streams: Array<StreamModel>;
  thumbnailUrl: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type ChangeChatSettingsInput = {
  isChatEnabled: Scalars["Boolean"]["input"];
  isChatFollowersOnly: Scalars["Boolean"]["input"];
  isChatPremiumFollowersOnly: Scalars["Boolean"]["input"];
};

export type ChangeEmailInput = {
  email: Scalars["String"]["input"];
};

export type ChangeNotificationsSettingsInput = {
  siteNotifications: Scalars["Boolean"]["input"];
  telegramNotifications: Scalars["Boolean"]["input"];
};

export type ChangeNotificationsSettingsResponse = {
  __typename?: "ChangeNotificationsSettingsResponse";
  notificationSettings: NotificationSettingsModel;
  telegramAuthToken?: Maybe<Scalars["String"]["output"]>;
};

export type ChangePasswordInput = {
  newPassword: Scalars["String"]["input"];
  oldPassword: Scalars["String"]["input"];
};

export type ChangeProfileInfoInput = {
  bio: Scalars["String"]["input"];
  displayName: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type ChangeStreamInfoInput = {
  categoryId: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type ChatMessageModel = {
  __typename?: "ChatMessageModel";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  stream: StreamModel;
  streamId: Scalars["String"]["output"];
  text: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  user: UserModel;
  userId: Scalars["String"]["output"];
};

export type CreatePlanInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  price: Scalars["Float"]["input"];
  title: Scalars["String"]["input"];
};

export type CreateUserInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type DeactivateAccountInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  pin?: InputMaybe<Scalars["String"]["input"]>;
};

export type DeviceModel = {
  __typename?: "DeviceModel";
  browser: Scalars["String"]["output"];
  os: Scalars["String"]["output"];
  type: Scalars["String"]["output"];
};

export type DisableTotpInput = {
  pin: Scalars["String"]["input"];
};

export type EnableTotpInput = {
  pin: Scalars["String"]["input"];
  secret: Scalars["String"]["input"];
};

export type FiltersInput = {
  searchTerm?: InputMaybe<Scalars["String"]["input"]>;
  skip?: InputMaybe<Scalars["Float"]["input"]>;
  take?: InputMaybe<Scalars["Float"]["input"]>;
};

export type FollowModel = {
  __typename?: "FollowModel";
  createdAt: Scalars["DateTime"]["output"];
  follower: UserModel;
  followerId: Scalars["String"]["output"];
  following: UserModel;
  followingId: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type GenerateStreamTokenInput = {
  channelId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type GenerateStreamTokenModel = {
  __typename?: "GenerateStreamTokenModel";
  token: Scalars["String"]["output"];
};

export enum IngressInput {
  RtmpInput = "RTMP_INPUT",
  UrlInput = "URL_INPUT",
  WhipInput = "WHIP_INPUT",
}

export type IngressInputType = {
  type: IngressInput;
};

export type LocationModel = {
  __typename?: "LocationModel";
  city: Scalars["String"]["output"];
  country: Scalars["String"]["output"];
  latitude: Scalars["Float"]["output"];
  longitude: Scalars["Float"]["output"];
};

export type LoginInput = {
  login: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  pin?: InputMaybe<Scalars["String"]["input"]>;
};

export type MakePaymentModel = {
  __typename?: "MakePaymentModel";
  url: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  changeChatSettings: Scalars["Boolean"]["output"];
  changeEmail: Scalars["Boolean"]["output"];
  changeNotificationsSettings: ChangeNotificationsSettingsResponse;
  changePassword: Scalars["Boolean"]["output"];
  changeProfileAvatar: Scalars["Boolean"]["output"];
  changeProfileInfo: Scalars["Boolean"]["output"];
  changeStreamInfo: Scalars["Boolean"]["output"];
  changeStreamThumbnail: Scalars["Boolean"]["output"];
  clearSessionCookie: Scalars["Boolean"]["output"];
  createIngress: Scalars["Boolean"]["output"];
  createSocialLink: Scalars["Boolean"]["output"];
  createSponsorshipPlan: Scalars["Boolean"]["output"];
  createUser: Scalars["Boolean"]["output"];
  deactivateAccount: AuthModel;
  disableTotp: Scalars["Boolean"]["output"];
  enableTotp: Scalars["Boolean"]["output"];
  followChannel: Scalars["Boolean"]["output"];
  generateStreamToken: GenerateStreamTokenModel;
  loginUser: AuthModel;
  logoutUser: Scalars["Boolean"]["output"];
  makePayment: MakePaymentModel;
  newPassword: Scalars["Boolean"]["output"];
  removeProfileAvatar: Scalars["Boolean"]["output"];
  removeSession: Scalars["Boolean"]["output"];
  removeSocialLink: Scalars["Boolean"]["output"];
  removeSponsorshipPlan: Scalars["Boolean"]["output"];
  removeStreamThumbnail: Scalars["Boolean"]["output"];
  reorderSocialLinks: Scalars["Boolean"]["output"];
  resetIngresses: Scalars["Boolean"]["output"];
  resetIngressesByRoomname: Scalars["Boolean"]["output"];
  resetPassword: Scalars["Boolean"]["output"];
  sendChatMessage: ChatMessageModel;
  unfollowChannel: Scalars["Boolean"]["output"];
  updateSocialLink: Scalars["Boolean"]["output"];
  verifyAccount: AuthModel;
};

export type MutationChangeChatSettingsArgs = {
  data: ChangeChatSettingsInput;
};

export type MutationChangeEmailArgs = {
  data: ChangeEmailInput;
};

export type MutationChangeNotificationsSettingsArgs = {
  data: ChangeNotificationsSettingsInput;
};

export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};

export type MutationChangeProfileAvatarArgs = {
  avatar: Scalars["Upload"]["input"];
};

export type MutationChangeProfileInfoArgs = {
  data: ChangeProfileInfoInput;
};

export type MutationChangeStreamInfoArgs = {
  data: ChangeStreamInfoInput;
};

export type MutationChangeStreamThumbnailArgs = {
  thumbnail: Scalars["Upload"]["input"];
};

export type MutationCreateIngressArgs = {
  ingressType: IngressInputType;
};

export type MutationCreateSocialLinkArgs = {
  data: SocialLinkInput;
};

export type MutationCreateSponsorshipPlanArgs = {
  data: CreatePlanInput;
};

export type MutationCreateUserArgs = {
  data: CreateUserInput;
};

export type MutationDeactivateAccountArgs = {
  data: DeactivateAccountInput;
};

export type MutationDisableTotpArgs = {
  data: DisableTotpInput;
};

export type MutationEnableTotpArgs = {
  data: EnableTotpInput;
};

export type MutationFollowChannelArgs = {
  channelId: Scalars["String"]["input"];
};

export type MutationGenerateStreamTokenArgs = {
  data: GenerateStreamTokenInput;
};

export type MutationLoginUserArgs = {
  data: LoginInput;
};

export type MutationMakePaymentArgs = {
  planId: Scalars["String"]["input"];
};

export type MutationNewPasswordArgs = {
  data: NewPasswordInput;
};

export type MutationRemoveSessionArgs = {
  id: Scalars["String"]["input"];
};

export type MutationRemoveSocialLinkArgs = {
  id: Scalars["String"]["input"];
};

export type MutationRemoveSponsorshipPlanArgs = {
  planId: Scalars["String"]["input"];
};

export type MutationReorderSocialLinksArgs = {
  list: Array<SocialLinkOrderInput>;
};

export type MutationResetIngressesByRoomnameArgs = {
  roomName: Scalars["String"]["input"];
};

export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};

export type MutationSendChatMessageArgs = {
  data: SendMessageInput;
};

export type MutationUnfollowChannelArgs = {
  channelId: Scalars["String"]["input"];
};

export type MutationUpdateSocialLinkArgs = {
  data: SocialLinkInput;
  id: Scalars["String"]["input"];
};

export type MutationVerifyAccountArgs = {
  data: VerificationInput;
};

export type NewPasswordInput = {
  password: Scalars["String"]["input"];
  passwordRepeat: Scalars["String"]["input"];
  token: Scalars["String"]["input"];
};

export type NotificationModel = {
  __typename?: "NotificationModel";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  isRead: Scalars["Boolean"]["output"];
  message: Scalars["String"]["output"];
  type: NotificationType;
  updatedAt: Scalars["DateTime"]["output"];
  user: UserModel;
  userId: Scalars["String"]["output"];
};

export type NotificationSettingsModel = {
  __typename?: "NotificationSettingsModel";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  siteNotifications: Scalars["Boolean"]["output"];
  telegramNotifications: Scalars["Boolean"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  user: UserModel;
  userId: Scalars["String"]["output"];
};

export enum NotificationType {
  EnableTwoFactor = "ENABLE_TWO_FACTOR",
  NewFollower = "NEW_FOLLOWER",
  NewSponsorship = "NEW_SPONSORSHIP",
  StreamStart = "STREAM_START",
  VerifiedChannel = "VERIFIED_CHANNEL",
}

export type PlanModel = {
  __typename?: "PlanModel";
  channel: UserModel;
  channelId: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  price: Scalars["Float"]["output"];
  stripePlanId: Scalars["String"]["output"];
  stripeProductId: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type Query = {
  __typename?: "Query";
  findAllCategories: Array<CategoryModel>;
  findAllStreams: Array<StreamModel>;
  findCategoryBySlug: CategoryModel;
  findChannelByUsername: UserModel;
  findChatMessagesByStream: Array<ChatMessageModel>;
  findCurrentSession: SessionModel;
  findFollowersCountByChannel: Scalars["Float"]["output"];
  findMyFollowers: Array<FollowModel>;
  findMyFollowings: Array<FollowModel>;
  findMySponsors: Array<SubscriptionModel>;
  findMySponsorshipPlans: Array<PlanModel>;
  findMyTransactions: Array<TransactionModel>;
  findNotificationsByUser: Array<NotificationModel>;
  findProfile: UserModel;
  findRandomCategories: Array<CategoryModel>;
  findRandomStreams: Array<StreamModel>;
  findRecommendedChannels: Array<UserModel>;
  findSessionsByUser: Array<SessionModel>;
  findSocialLinks: Array<SocialLinkModel>;
  findSponsorsByChannel: Array<SubscriptionModel>;
  findUnreadNotificationsCount: Scalars["Float"]["output"];
  generateTotpSecret: TotpModel;
};

export type QueryFindAllStreamsArgs = {
  filters?: InputMaybe<FiltersInput>;
};

export type QueryFindCategoryBySlugArgs = {
  slug: Scalars["String"]["input"];
};

export type QueryFindChannelByUsernameArgs = {
  username: Scalars["String"]["input"];
};

export type QueryFindChatMessagesByStreamArgs = {
  streamId: Scalars["String"]["input"];
};

export type QueryFindFollowersCountByChannelArgs = {
  channelId: Scalars["String"]["input"];
};

export type QueryFindSponsorsByChannelArgs = {
  channelId: Scalars["String"]["input"];
};

export type ResetPasswordInput = {
  email: Scalars["String"]["input"];
};

export type SendMessageInput = {
  streamId: Scalars["String"]["input"];
  text: Scalars["String"]["input"];
};

export type SessionMetadataModel = {
  __typename?: "SessionMetadataModel";
  device: DeviceModel;
  ip: Scalars["String"]["output"];
  location: LocationModel;
};

export type SessionModel = {
  __typename?: "SessionModel";
  createdAt: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  metadata: SessionMetadataModel;
  userId: Scalars["String"]["output"];
};

export type SocialLinkInput = {
  title: Scalars["String"]["input"];
  url: Scalars["String"]["input"];
};

export type SocialLinkModel = {
  __typename?: "SocialLinkModel";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  position: Scalars["Float"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  url: Scalars["String"]["output"];
  userId: Scalars["String"]["output"];
};

export type SocialLinkOrderInput = {
  id: Scalars["String"]["input"];
  position: Scalars["Float"]["input"];
};

export type StreamModel = {
  __typename?: "StreamModel";
  category?: Maybe<CategoryModel>;
  categoryId?: Maybe<Scalars["String"]["output"]>;
  chatMessages: Array<ChatMessageModel>;
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  ingressId?: Maybe<Scalars["String"]["output"]>;
  isChatEnabled: Scalars["Boolean"]["output"];
  isChatFollowersOnly: Scalars["Boolean"]["output"];
  isChatPremiumFollowersOnly: Scalars["Boolean"]["output"];
  isLive: Scalars["Boolean"]["output"];
  serverUrl?: Maybe<Scalars["String"]["output"]>;
  streamKey?: Maybe<Scalars["String"]["output"]>;
  thumbnailUrl?: Maybe<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  user: UserModel;
  userId: Scalars["String"]["output"];
};

export type Subscription = {
  __typename?: "Subscription";
  chatMessageAdded: ChatMessageModel;
};

export type SubscriptionChatMessageAddedArgs = {
  streamId: Scalars["String"]["input"];
};

export type SubscriptionModel = {
  __typename?: "SubscriptionModel";
  channel: UserModel;
  channelId: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  expiresAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  plan: PlanModel;
  planId: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  user: UserModel;
  userId: Scalars["String"]["output"];
};

export type TotpModel = {
  __typename?: "TotpModel";
  qrcodeUrl: Scalars["String"]["output"];
  secret: Scalars["String"]["output"];
};

export type TransactionModel = {
  __typename?: "TransactionModel";
  amount: Scalars["Float"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  currency: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  status: TransactionStatus;
  stripeSubscriptionId: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  user: UserModel;
  userId: Scalars["String"]["output"];
};

export enum TransactionStatus {
  Expired = "EXPIRED",
  Failed = "FAILED",
  Pending = "PENDING",
  Success = "SUCCESS",
}

export type UserModel = {
  __typename?: "UserModel";
  avatar?: Maybe<Scalars["String"]["output"]>;
  bio?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  deactivatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  displayName: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  followers: Array<FollowModel>;
  followings: Array<FollowModel>;
  id: Scalars["ID"]["output"];
  isDeactivated: Scalars["Boolean"]["output"];
  isEmailVerified: Scalars["Boolean"]["output"];
  isTotpEnabled: Scalars["Boolean"]["output"];
  isVerified: Scalars["Boolean"]["output"];
  notificationSettings: NotificationSettingsModel;
  notifications: Array<NotificationModel>;
  password: Scalars["String"]["output"];
  socialLinks: Array<SocialLinkModel>;
  sponsorshipPlans: Array<PlanModel>;
  stream: StreamModel;
  telegramId?: Maybe<Scalars["String"]["output"]>;
  totpSecret?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["DateTime"]["output"];
  username: Scalars["String"]["output"];
};

export type VerificationInput = {
  token: Scalars["String"]["input"];
};

export type FindUnreadNotificationsCountQueryVariables = Exact<{
  [key: string]: never;
}>;

export type FindUnreadNotificationsCountQuery = {
  __typename?: "Query";
  findUnreadNotificationsCount: number;
};

export type FindNotificationsByUserQueryVariables = Exact<{
  [key: string]: never;
}>;

export type FindNotificationsByUserQuery = {
  __typename?: "Query";
  findNotificationsByUser: Array<{
    __typename?: "NotificationModel";
    id: string;
    message: string;
    type: NotificationType;
  }>;
};

export type FindRecommendedChannelsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type FindRecommendedChannelsQuery = {
  __typename?: "Query";
  findRecommendedChannels: Array<{
    __typename?: "UserModel";
    username: string;
    avatar?: string | null;
    isVerified: boolean;
    stream: { __typename?: "StreamModel"; isLive: boolean };
  }>;
};

export type ChangeChatSettingsMutationVariables = Exact<{
  data: ChangeChatSettingsInput;
}>;

export type ChangeChatSettingsMutation = {
  __typename?: "Mutation";
  changeChatSettings: boolean;
};

export type FindMyFollowersQueryVariables = Exact<{ [key: string]: never }>;

export type FindMyFollowersQuery = {
  __typename?: "Query";
  findMyFollowers: Array<{
    __typename?: "FollowModel";
    createdAt: any;
    follower: {
      __typename?: "UserModel";
      username: string;
      avatar?: string | null;
      isVerified: boolean;
    };
  }>;
};

export type FindMySponsorshipPlansQueryVariables = Exact<{
  [key: string]: never;
}>;

export type FindMySponsorshipPlansQuery = {
  __typename?: "Query";
  findMySponsorshipPlans: Array<{
    __typename?: "PlanModel";
    id: string;
    createdAt: any;
    title: string;
    price: number;
  }>;
};

export type CreateSponsorshipPlanMutationVariables = Exact<{
  data: CreatePlanInput;
}>;

export type CreateSponsorshipPlanMutation = {
  __typename?: "Mutation";
  createSponsorshipPlan: boolean;
};

export type RemoveSponsorshipPlanMutationVariables = Exact<{
  planId: Scalars["String"]["input"];
}>;

export type RemoveSponsorshipPlanMutation = {
  __typename?: "Mutation";
  removeSponsorshipPlan: boolean;
};

export type ChangeEmailMutationVariables = Exact<{
  data: ChangeEmailInput;
}>;

export type ChangeEmailMutation = {
  __typename?: "Mutation";
  changeEmail: boolean;
};

export type ChangePasswordMutationVariables = Exact<{
  data: ChangePasswordInput;
}>;

export type ChangePasswordMutation = {
  __typename?: "Mutation";
  changePassword: boolean;
};

export type DisableTotpMutationVariables = Exact<{
  data: DisableTotpInput;
}>;

export type DisableTotpMutation = {
  __typename?: "Mutation";
  disableTotp: boolean;
};

export type GenerateTotpSecretQueryVariables = Exact<{ [key: string]: never }>;

export type GenerateTotpSecretQuery = {
  __typename?: "Query";
  generateTotpSecret: {
    __typename?: "TotpModel";
    qrcodeUrl: string;
    secret: string;
  };
};

export type EnableTotpMutationVariables = Exact<{
  data: EnableTotpInput;
}>;

export type EnableTotpMutation = {
  __typename?: "Mutation";
  enableTotp: boolean;
};

export type ChangeNotificationsSettingsMutationVariables = Exact<{
  data: ChangeNotificationsSettingsInput;
}>;

export type ChangeNotificationsSettingsMutation = {
  __typename?: "Mutation";
  changeNotificationsSettings: {
    __typename?: "ChangeNotificationsSettingsResponse";
    telegramAuthToken?: string | null;
    notificationSettings: {
      __typename?: "NotificationSettingsModel";
      siteNotifications: boolean;
      telegramNotifications: boolean;
    };
  };
};

export type RemoveProfileAvatarMutationVariables = Exact<{
  [key: string]: never;
}>;

export type RemoveProfileAvatarMutation = {
  __typename?: "Mutation";
  removeProfileAvatar: boolean;
};

export type ChangeProfileAvatarMutationVariables = Exact<{
  avatar: Scalars["Upload"]["input"];
}>;

export type ChangeProfileAvatarMutation = {
  __typename?: "Mutation";
  changeProfileAvatar: boolean;
};

export type ChangeProfileInfoMutationVariables = Exact<{
  data: ChangeProfileInfoInput;
}>;

export type ChangeProfileInfoMutation = {
  __typename?: "Mutation";
  changeProfileInfo: boolean;
};

export type UpdateSocialLinkMutationVariables = Exact<{
  id: Scalars["String"]["input"];
  data: SocialLinkInput;
}>;

export type UpdateSocialLinkMutation = {
  __typename?: "Mutation";
  updateSocialLink: boolean;
};

export type RemoveSocialLinkMutationVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type RemoveSocialLinkMutation = {
  __typename?: "Mutation";
  removeSocialLink: boolean;
};

export type FindSocialLinksQueryVariables = Exact<{ [key: string]: never }>;

export type FindSocialLinksQuery = {
  __typename?: "Query";
  findSocialLinks: Array<{
    __typename?: "SocialLinkModel";
    id: string;
    title: string;
    url: string;
    position: number;
  }>;
};

export type CreateSocialLinkMutationVariables = Exact<{
  data: SocialLinkInput;
}>;

export type CreateSocialLinkMutation = {
  __typename?: "Mutation";
  createSocialLink: boolean;
};

export type ReorderSocialLinksMutationVariables = Exact<{
  list: Array<SocialLinkOrderInput> | SocialLinkOrderInput;
}>;

export type ReorderSocialLinksMutation = {
  __typename?: "Mutation";
  reorderSocialLinks: boolean;
};

export type RemoveSessionMutationVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type RemoveSessionMutation = {
  __typename?: "Mutation";
  removeSession: boolean;
};

export type FindSessionsByUserQueryVariables = Exact<{ [key: string]: never }>;

export type FindSessionsByUserQuery = {
  __typename?: "Query";
  findSessionsByUser: Array<{
    __typename?: "SessionModel";
    id: string;
    createdAt: string;
    metadata: {
      __typename?: "SessionMetadataModel";
      ip: string;
      location: {
        __typename?: "LocationModel";
        country: string;
        city: string;
        latitude: number;
        longitude: number;
      };
      device: { __typename?: "DeviceModel"; browser: string; os: string };
    };
  }>;
};

export type FindCurrentSessionQueryVariables = Exact<{ [key: string]: never }>;

export type FindCurrentSessionQuery = {
  __typename?: "Query";
  findCurrentSession: {
    __typename?: "SessionModel";
    id: string;
    createdAt: string;
    metadata: {
      __typename?: "SessionMetadataModel";
      ip: string;
      location: {
        __typename?: "LocationModel";
        country: string;
        city: string;
        latitude: number;
        longitude: number;
      };
      device: { __typename?: "DeviceModel"; browser: string; os: string };
    };
  };
};

export type FindMySponsorsQueryVariables = Exact<{ [key: string]: never }>;

export type FindMySponsorsQuery = {
  __typename?: "Query";
  findMySponsors: Array<{
    __typename?: "SubscriptionModel";
    expiresAt: any;
    user: {
      __typename?: "UserModel";
      username: string;
      avatar?: string | null;
      isVerified: boolean;
    };
    plan: { __typename?: "PlanModel"; title: string };
  }>;
};

export type CreateIngressMutationVariables = Exact<{
  ingressType: IngressInputType;
}>;

export type CreateIngressMutation = {
  __typename?: "Mutation";
  createIngress: boolean;
};

export type ResetIngressesMutationVariables = Exact<{ [key: string]: never }>;

export type ResetIngressesMutation = {
  __typename?: "Mutation";
  resetIngresses: boolean;
};

export type FindMyTransactionsQueryVariables = Exact<{ [key: string]: never }>;

export type FindMyTransactionsQuery = {
  __typename?: "Query";
  findMyTransactions: Array<{
    __typename?: "TransactionModel";
    createdAt: any;
    status: TransactionStatus;
    amount: number;
  }>;
};

export type UnfollowChannelMutationVariables = Exact<{
  channelId: Scalars["String"]["input"];
}>;

export type UnfollowChannelMutation = {
  __typename?: "Mutation";
  unfollowChannel: boolean;
};

export type FollowChannelMutationVariables = Exact<{
  channelId: Scalars["String"]["input"];
}>;

export type FollowChannelMutation = {
  __typename?: "Mutation";
  followChannel: boolean;
};

export type FindMyFollowingsQueryVariables = Exact<{ [key: string]: never }>;

export type FindMyFollowingsQuery = {
  __typename?: "Query";
  findMyFollowings: Array<{
    __typename?: "FollowModel";
    createdAt: any;
    followingId: string;
  }>;
};

export type MakePaymentMutationVariables = Exact<{
  planId: Scalars["String"]["input"];
}>;

export type MakePaymentMutation = {
  __typename?: "Mutation";
  makePayment: { __typename?: "MakePaymentModel"; url: string };
};

export type FindSponsorsByChannelQueryVariables = Exact<{
  channelId: Scalars["String"]["input"];
}>;

export type FindSponsorsByChannelQuery = {
  __typename?: "Query";
  findSponsorsByChannel: Array<{
    __typename?: "SubscriptionModel";
    user: {
      __typename?: "UserModel";
      id: string;
      username: string;
      avatar?: string | null;
    };
  }>;
};

export type FindChatMessagesByStreamQueryVariables = Exact<{
  streamId: Scalars["String"]["input"];
}>;

export type FindChatMessagesByStreamQuery = {
  __typename?: "Query";
  findChatMessagesByStream: Array<{
    __typename?: "ChatMessageModel";
    createdAt: any;
    text: string;
    user: { __typename?: "UserModel"; id: string; username: string };
  }>;
};

export type ChatMessageAddedSubscriptionVariables = Exact<{
  streamId: Scalars["String"]["input"];
}>;

export type ChatMessageAddedSubscription = {
  __typename?: "Subscription";
  chatMessageAdded: {
    __typename?: "ChatMessageModel";
    createdAt: any;
    text: string;
    user: { __typename?: "UserModel"; id: string; username: string };
  };
};

export type SendChatMessageMutationVariables = Exact<{
  data: SendMessageInput;
}>;

export type SendChatMessageMutation = {
  __typename?: "Mutation";
  sendChatMessage: { __typename?: "ChatMessageModel"; streamId: string };
};

export type FindAllCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type FindAllCategoriesQuery = {
  __typename?: "Query";
  findAllCategories: Array<{
    __typename?: "CategoryModel";
    id: string;
    updatedAt: any;
    title: string;
    slug: string;
    thumbnailUrl: string;
  }>;
};

export type ChangeStreamInfoMutationVariables = Exact<{
  data: ChangeStreamInfoInput;
}>;

export type ChangeStreamInfoMutation = {
  __typename?: "Mutation";
  changeStreamInfo: boolean;
};

export type RemoveStreamThumbnailMutationVariables = Exact<{
  [key: string]: never;
}>;

export type RemoveStreamThumbnailMutation = {
  __typename?: "Mutation";
  removeStreamThumbnail: boolean;
};

export type ChangeStreamThumbnailMutationVariables = Exact<{
  thumbnail: Scalars["Upload"]["input"];
}>;

export type ChangeStreamThumbnailMutation = {
  __typename?: "Mutation";
  changeStreamThumbnail: boolean;
};

export type FindAllStreamsQueryVariables = Exact<{
  filters: FiltersInput;
}>;

export type FindAllStreamsQuery = {
  __typename?: "Query";
  findAllStreams: Array<{
    __typename?: "StreamModel";
    title: string;
    thumbnailUrl?: string | null;
    isLive: boolean;
    user: {
      __typename?: "UserModel";
      username: string;
      avatar?: string | null;
      isVerified: boolean;
    };
    category?: {
      __typename?: "CategoryModel";
      title: string;
      slug: string;
    } | null;
  }>;
};

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;

export type CreateUserMutation = {
  __typename?: "Mutation";
  createUser: boolean;
};

export type DeactivateAccountMutationVariables = Exact<{
  data: DeactivateAccountInput;
}>;

export type DeactivateAccountMutation = {
  __typename?: "Mutation";
  deactivateAccount: {
    __typename?: "AuthModel";
    message?: string | null;
    user?: { __typename?: "UserModel"; isDeactivated: boolean } | null;
  };
};

export type LoginUserMutationVariables = Exact<{
  data: LoginInput;
}>;

export type LoginUserMutation = {
  __typename?: "Mutation";
  loginUser: {
    __typename?: "AuthModel";
    message?: string | null;
    user?: { __typename?: "UserModel"; username: string } | null;
  };
};

export type NewPasswordMutationVariables = Exact<{
  data: NewPasswordInput;
}>;

export type NewPasswordMutation = {
  __typename?: "Mutation";
  newPassword: boolean;
};

export type ResetPasswordMutationVariables = Exact<{
  data: ResetPasswordInput;
}>;

export type ResetPasswordMutation = {
  __typename?: "Mutation";
  resetPassword: boolean;
};

export type VerifyAccountMutationVariables = Exact<{
  data: VerificationInput;
}>;

export type VerifyAccountMutation = {
  __typename?: "Mutation";
  verifyAccount: {
    __typename?: "AuthModel";
    message?: string | null;
    user?: {
      __typename?: "UserModel";
      email: string;
      isEmailVerified: boolean;
    } | null;
  };
};

export type LogoutUserMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutUserMutation = {
  __typename?: "Mutation";
  logoutUser: boolean;
};

export type ClearSessionCookieMutationVariables = Exact<{
  [key: string]: never;
}>;

export type ClearSessionCookieMutation = {
  __typename?: "Mutation";
  clearSessionCookie: boolean;
};

export const FindUnreadNotificationsCountDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FindUnreadNotificationsCount" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "findUnreadNotificationsCount" },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindUnreadNotificationsCountQuery,
  FindUnreadNotificationsCountQueryVariables
>;
export const FindNotificationsByUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FindNotificationsByUser" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "findNotificationsByUser" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "message" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindNotificationsByUserQuery,
  FindNotificationsByUserQueryVariables
>;
export const FindRecommendedChannelsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FindRecommendedChannels" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "findRecommendedChannels" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "avatar" } },
                { kind: "Field", name: { kind: "Name", value: "isVerified" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "stream" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isLive" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindRecommendedChannelsQuery,
  FindRecommendedChannelsQueryVariables
>;
export const ChangeChatSettingsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ChangeChatSettings" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ChangeChatSettingsInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "changeChatSettings" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ChangeChatSettingsMutation,
  ChangeChatSettingsMutationVariables
>;
export const FindMyFollowersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FindMyFollowers" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "findMyFollowers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "follower" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "avatar" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isVerified" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindMyFollowersQuery,
  FindMyFollowersQueryVariables
>;
export const FindMySponsorshipPlansDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FindMySponsorshipPlans" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "findMySponsorshipPlans" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "price" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindMySponsorshipPlansQuery,
  FindMySponsorshipPlansQueryVariables
>;
export const CreateSponsorshipPlanDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateSponsorshipPlan" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreatePlanInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createSponsorshipPlan" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateSponsorshipPlanMutation,
  CreateSponsorshipPlanMutationVariables
>;
export const RemoveSponsorshipPlanDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RemoveSponsorshipPlan" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "planId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "removeSponsorshipPlan" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "planId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "planId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RemoveSponsorshipPlanMutation,
  RemoveSponsorshipPlanMutationVariables
>;
export const ChangeEmailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ChangeEmail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ChangeEmailInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "changeEmail" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ChangeEmailMutation, ChangeEmailMutationVariables>;
export const ChangePasswordDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ChangePassword" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ChangePasswordInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "changePassword" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;
export const DisableTotpDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DisableTotp" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DisableTotpInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "disableTotp" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DisableTotpMutation, DisableTotpMutationVariables>;
export const GenerateTotpSecretDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GenerateTotpSecret" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "generateTotpSecret" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "qrcodeUrl" } },
                { kind: "Field", name: { kind: "Name", value: "secret" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GenerateTotpSecretQuery,
  GenerateTotpSecretQueryVariables
>;
export const EnableTotpDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "EnableTotp" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "EnableTotpInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "enableTotp" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EnableTotpMutation, EnableTotpMutationVariables>;
export const ChangeNotificationsSettingsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ChangeNotificationsSettings" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ChangeNotificationsSettingsInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "changeNotificationsSettings" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "notificationSettings" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "siteNotifications" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "telegramNotifications" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "telegramAuthToken" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ChangeNotificationsSettingsMutation,
  ChangeNotificationsSettingsMutationVariables
>;
export const RemoveProfileAvatarDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RemoveProfileAvatar" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "removeProfileAvatar" },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RemoveProfileAvatarMutation,
  RemoveProfileAvatarMutationVariables
>;
export const ChangeProfileAvatarDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ChangeProfileAvatar" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "avatar" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Upload" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "changeProfileAvatar" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "avatar" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "avatar" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ChangeProfileAvatarMutation,
  ChangeProfileAvatarMutationVariables
>;
export const ChangeProfileInfoDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ChangeProfileInfo" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ChangeProfileInfoInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "changeProfileInfo" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ChangeProfileInfoMutation,
  ChangeProfileInfoMutationVariables
>;
export const UpdateSocialLinkDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateSocialLink" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SocialLinkInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateSocialLink" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateSocialLinkMutation,
  UpdateSocialLinkMutationVariables
>;
export const RemoveSocialLinkDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RemoveSocialLink" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "removeSocialLink" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RemoveSocialLinkMutation,
  RemoveSocialLinkMutationVariables
>;
export const FindSocialLinksDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FindSocialLinks" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "findSocialLinks" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindSocialLinksQuery,
  FindSocialLinksQueryVariables
>;
export const CreateSocialLinkDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateSocialLink" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SocialLinkInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createSocialLink" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateSocialLinkMutation,
  CreateSocialLinkMutationVariables
>;
export const ReorderSocialLinksDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ReorderSocialLinks" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "list" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "SocialLinkOrderInput" },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "reorderSocialLinks" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "list" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "list" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ReorderSocialLinksMutation,
  ReorderSocialLinksMutationVariables
>;
export const RemoveSessionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RemoveSession" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "removeSession" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RemoveSessionMutation,
  RemoveSessionMutationVariables
>;
export const FindSessionsByUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FindSessionsByUser" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "findSessionsByUser" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "metadata" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "location" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "country" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "city" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "latitude" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "longitude" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "device" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "browser" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "os" },
                            },
                          ],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "ip" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindSessionsByUserQuery,
  FindSessionsByUserQueryVariables
>;
export const FindCurrentSessionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FindCurrentSession" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "findCurrentSession" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "metadata" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "location" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "country" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "city" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "latitude" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "longitude" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "device" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "browser" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "os" },
                            },
                          ],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "ip" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindCurrentSessionQuery,
  FindCurrentSessionQueryVariables
>;
export const FindMySponsorsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FindMySponsors" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "findMySponsors" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "expiresAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "avatar" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isVerified" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "plan" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FindMySponsorsQuery, FindMySponsorsQueryVariables>;
export const CreateIngressDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateIngress" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "ingressType" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "IngressInputType" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createIngress" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "ingressType" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ingressType" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateIngressMutation,
  CreateIngressMutationVariables
>;
export const ResetIngressesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ResetIngresses" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "resetIngresses" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ResetIngressesMutation,
  ResetIngressesMutationVariables
>;
export const FindMyTransactionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FindMyTransactions" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "findMyTransactions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "amount" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindMyTransactionsQuery,
  FindMyTransactionsQueryVariables
>;
export const UnfollowChannelDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UnfollowChannel" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "channelId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "unfollowChannel" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "channelId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "channelId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UnfollowChannelMutation,
  UnfollowChannelMutationVariables
>;
export const FollowChannelDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "FollowChannel" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "channelId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "followChannel" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "channelId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "channelId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FollowChannelMutation,
  FollowChannelMutationVariables
>;
export const FindMyFollowingsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FindMyFollowings" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "findMyFollowings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "followingId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindMyFollowingsQuery,
  FindMyFollowingsQueryVariables
>;
export const MakePaymentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "MakePayment" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "planId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "makePayment" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "planId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "planId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MakePaymentMutation, MakePaymentMutationVariables>;
export const FindSponsorsByChannelDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FindSponsorsByChannel" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "channelId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "findSponsorsByChannel" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "channelId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "channelId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "avatar" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindSponsorsByChannelQuery,
  FindSponsorsByChannelQueryVariables
>;
export const FindChatMessagesByStreamDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FindChatMessagesByStream" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "streamId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "findChatMessagesByStream" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "streamId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "streamId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "text" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindChatMessagesByStreamQuery,
  FindChatMessagesByStreamQueryVariables
>;
export const ChatMessageAddedDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "subscription",
      name: { kind: "Name", value: "ChatMessageAdded" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "streamId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "chatMessageAdded" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "streamId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "streamId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "text" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ChatMessageAddedSubscription,
  ChatMessageAddedSubscriptionVariables
>;
export const SendChatMessageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SendChatMessage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SendMessageInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "sendChatMessage" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "streamId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SendChatMessageMutation,
  SendChatMessageMutationVariables
>;
export const FindAllCategoriesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FindAllCategories" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "findAllCategories" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "slug" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "thumbnailUrl" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindAllCategoriesQuery,
  FindAllCategoriesQueryVariables
>;
export const ChangeStreamInfoDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ChangeStreamInfo" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ChangeStreamInfoInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "changeStreamInfo" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ChangeStreamInfoMutation,
  ChangeStreamInfoMutationVariables
>;
export const RemoveStreamThumbnailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RemoveStreamThumbnail" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "removeStreamThumbnail" },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RemoveStreamThumbnailMutation,
  RemoveStreamThumbnailMutationVariables
>;
export const ChangeStreamThumbnailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ChangeStreamThumbnail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "thumbnail" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Upload" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "changeStreamThumbnail" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "thumbnail" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "thumbnail" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ChangeStreamThumbnailMutation,
  ChangeStreamThumbnailMutationVariables
>;
export const FindAllStreamsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FindAllStreams" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filters" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "FiltersInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "findAllStreams" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "filters" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "title" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "thumbnailUrl" },
                },
                { kind: "Field", name: { kind: "Name", value: "isLive" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "avatar" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isVerified" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "category" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "slug" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FindAllStreamsQuery, FindAllStreamsQueryVariables>;
export const CreateUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateUserInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const DeactivateAccountDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeactivateAccount" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DeactivateAccountInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deactivateAccount" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isDeactivated" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "message" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeactivateAccountMutation,
  DeactivateAccountMutationVariables
>;
export const LoginUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "LoginUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "LoginInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "loginUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "message" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const NewPasswordDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "NewPassword" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "NewPasswordInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "newPassword" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<NewPasswordMutation, NewPasswordMutationVariables>;
export const ResetPasswordDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ResetPassword" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ResetPasswordInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "resetPassword" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>;
export const VerifyAccountDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "VerifyAccount" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "VerificationInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "verifyAccount" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "message" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isEmailVerified" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  VerifyAccountMutation,
  VerifyAccountMutationVariables
>;
export const LogoutUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "LogoutUser" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "logoutUser" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LogoutUserMutation, LogoutUserMutationVariables>;
export const ClearSessionCookieDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ClearSessionCookie" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "clearSessionCookie" },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ClearSessionCookieMutation,
  ClearSessionCookieMutationVariables
>;
