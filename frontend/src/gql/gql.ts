/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\nquery FindChannelByUsername($username: String!) {\n  findChannelByUsername(username: $username) {\n    id\n    username\n    displayName\n    avatar\n    bio\n    isVerified\n    socialLinks {\n      title\n      url\n    }\n    stream {\n      id\n      title\n      thumbnailUrl\n      isLive\n      isChatEnabled\n      isChatFollowersOnly\n      isChatPremiumFollowersOnly\n      category {\n        id\n        title\n      }\n    }\n    sponsorshipPlans {\n      id\n      title\n      description\n      price\n    }\n    followings {\n      id\n    }\n  }\n}\n": typeof types.FindChannelByUsernameDocument,
    "\nquery FindRandomStreams {\n  findRandomStreams {\n    title\n    thumbnailUrl\n    isLive\n    user {\n      username\n      avatar\n      isVerified\n    }\n    category {\n      title\n      slug\n    }\n  }\n}\n": typeof types.FindRandomStreamsDocument,
    "\nquery FindRandomCategories {\n  findRandomCategories {\n    title\n    slug\n    thumbnailUrl\n  }\n}\n": typeof types.FindRandomCategoriesDocument,
    "\nquery FindCategoryBySlug($slug: String!) {\n  findCategoryBySlug(slug: $slug) {\n    title\n    thumbnailUrl\n    description\n    streams {\n      title\n      thumbnailUrl\n      isLive\n      user {\n        username\n        avatar\n        isVerified\n      }\n      category {\n        title\n        slug\n      }\n    }\n  }\n}\n": typeof types.FindCategoryBySlugDocument,
    "\n  query FindUnreadNotificationsCount {\n    findUnreadNotificationsCount\n  }\n": typeof types.FindUnreadNotificationsCountDocument,
    "\n  query FindNotificationsByUser {\n    findNotificationsByUser {\n      id\n      message\n      type\n    }\n  }\n": typeof types.FindNotificationsByUserDocument,
    "\nquery FindUnreadNotificationsCount {\n  findUnreadNotificationsCount\n}\n": typeof types.FindUnreadNotificationsCountDocument,
    "\nquery FindRecommendedChannels {\n  findRecommendedChannels {\n    username\n    avatar\n    isVerified\n    stream {\n      isLive\n    }\n  }\n}\n": typeof types.FindRecommendedChannelsDocument,
    "\nmutation ChangeChatSettings($data: ChangeChatSettingsInput!) {\n  changeChatSettings(data: $data)\n}\n": typeof types.ChangeChatSettingsDocument,
    "\nquery FindMyFollowers {\n  findMyFollowers {\n    createdAt\n    follower {\n      username\n      avatar\n      isVerified\n    }\n  }\n}\n": typeof types.FindMyFollowersDocument,
    "\nquery FindMySponsorshipPlans {\n  findMySponsorshipPlans {\n    id\n    createdAt\n    title\n    price\n  }\n}\n": typeof types.FindMySponsorshipPlansDocument,
    "\nmutation CreateSponsorshipPlan($data: CreatePlanInput!) {\n  createSponsorshipPlan(data: $data)\n}\n": typeof types.CreateSponsorshipPlanDocument,
    "\nmutation RemoveSponsorshipPlan($planId: String!) {\n  removeSponsorshipPlan(planId: $planId)\n}\n": typeof types.RemoveSponsorshipPlanDocument,
    "\nmutation ChangeEmail($data: ChangeEmailInput!) {\n  changeEmail(data: $data)\n}\n": typeof types.ChangeEmailDocument,
    "\nmutation ChangePassword($data: ChangePasswordInput!) {\n  changePassword(data: $data)\n}\n": typeof types.ChangePasswordDocument,
    "\nmutation DisableTotp($data: DisableTotpInput!) {\n  disableTotp(data: $data)\n}\n": typeof types.DisableTotpDocument,
    "\nquery GenerateTotpSecret {\n  generateTotpSecret {\n    qrcodeUrl\n    secret\n  }\n}\n": typeof types.GenerateTotpSecretDocument,
    "\nmutation EnableTotp($data: EnableTotpInput!) {\n  enableTotp(data: $data)\n}\n": typeof types.EnableTotpDocument,
    "\nmutation ChangeNotificationsSettings($data: ChangeNotificationsSettingsInput!) {\n  changeNotificationsSettings(data: $data) {\n    notificationSettings {\n      siteNotifications\n      telegramNotifications\n    }\n    telegramAuthToken\n  }\n}\n": typeof types.ChangeNotificationsSettingsDocument,
    "\nmutation RemoveProfileAvatar {\n  removeProfileAvatar\n}\n": typeof types.RemoveProfileAvatarDocument,
    "\nmutation ChangeProfileAvatar($avatar: Upload!) {\n  changeProfileAvatar(avatar: $avatar)\n}\n": typeof types.ChangeProfileAvatarDocument,
    "\nmutation ChangeProfileInfo($data: ChangeProfileInfoInput!) {\n  changeProfileInfo(data: $data)\n}\n": typeof types.ChangeProfileInfoDocument,
    "\nmutation UpdateSocialLink($id: String!, $data: SocialLinkInput!) {\n  updateSocialLink(id: $id, data: $data)\n}\n": typeof types.UpdateSocialLinkDocument,
    "\nmutation RemoveSocialLink($id: String!) {\n  removeSocialLink(id: $id)\n}\n": typeof types.RemoveSocialLinkDocument,
    "\nquery FindSocialLinks {\n  findSocialLinks {\n    id\n    title\n    url\n    position\n  }\n}\n": typeof types.FindSocialLinksDocument,
    "\nmutation CreateSocialLink($data: SocialLinkInput!) {\n  createSocialLink(data: $data)\n}\n": typeof types.CreateSocialLinkDocument,
    "\nmutation ReorderSocialLinks($list: [SocialLinkOrderInput!]!) {\n  reorderSocialLinks(list: $list)\n}\n": typeof types.ReorderSocialLinksDocument,
    "\nmutation RemoveSession($id: String!) {\n  removeSession(id: $id)\n}\n": typeof types.RemoveSessionDocument,
    "\nquery FindSessionsByUser {\n  findSessionsByUser {\n    id\n    createdAt\n    metadata {\n      location {\n        country\n        city\n        latitude\n        longitude\n      }\n      device {\n        browser\n        os\n      }\n      ip\n    }\n  }\n}\n": typeof types.FindSessionsByUserDocument,
    "\nquery FindCurrentSession {\n  findCurrentSession {\n    id\n    createdAt\n    metadata {\n      location {\n        country\n        city\n        latitude\n        longitude\n      }\n      device {\n        browser\n        os\n      }\n      ip\n    }\n  }\n}\n": typeof types.FindCurrentSessionDocument,
    "\nquery FindMySponsors {\n  findMySponsors {\n    expiresAt\n    user {\n      username\n      avatar\n      isVerified\n    }\n    plan {\n      title\n    }\n  }\n}\n": typeof types.FindMySponsorsDocument,
    "\nmutation CreateIngress($ingressType: IngressInputType!) {\n  createIngress(ingressType: $ingressType)\n}\n": typeof types.CreateIngressDocument,
    "\nmutation ResetIngresses {\n  resetIngresses\n}\n": typeof types.ResetIngressesDocument,
    "\nquery FindMyTransactions {\n  findMyTransactions {\n    createdAt\n    status\n    amount\n  }\n}\n": typeof types.FindMyTransactionsDocument,
    "\nmutation UnfollowChannel($channelId: String!) {\n  unfollowChannel(channelId: $channelId)\n}\n": typeof types.UnfollowChannelDocument,
    "\nmutation FollowChannel($channelId: String!) {\n  followChannel(channelId: $channelId)\n}\n": typeof types.FollowChannelDocument,
    "\nquery FindMyFollowings {\n  findMyFollowings {\n    createdAt\n    followingId\n  }\n}\n": typeof types.FindMyFollowingsDocument,
    "\nmutation MakePayment($planId: String!) {\n  makePayment(planId: $planId) {\n    url\n  }\n}\n": typeof types.MakePaymentDocument,
    "\nquery FindSponsorsByChannel($channelId: String!) {\n  findSponsorsByChannel(channelId: $channelId) {\n    user {\n      id\n      username\n      avatar\n    }\n  }\n}\n": typeof types.FindSponsorsByChannelDocument,
    "\nquery FindChatMessagesByStream($streamId: String!) {\n  findChatMessagesByStream(streamId: $streamId) {\n    createdAt\n    text\n    user {\n      id\n      username\n    }\n  }\n}\n": typeof types.FindChatMessagesByStreamDocument,
    "\nsubscription ChatMessageAdded($streamId: String!) {\n  chatMessageAdded(streamId: $streamId) {\n    createdAt\n    text\n    user {\n      id\n      username\n    }\n  }\n}\n": typeof types.ChatMessageAddedDocument,
    "\nmutation SendChatMessage($data: SendMessageInput!) {\n  sendChatMessage(data: $data) {\n    streamId\n  }\n}\n": typeof types.SendChatMessageDocument,
    "\nquery FindAllCategories {\n  findAllCategories {\n    id\n    updatedAt\n    title\n    slug\n    thumbnailUrl\n  }\n}\n": typeof types.FindAllCategoriesDocument,
    "\nmutation ChangeStreamInfo($data: ChangeStreamInfoInput!) {\n  changeStreamInfo(data: $data)\n}\n": typeof types.ChangeStreamInfoDocument,
    "\nmutation RemoveStreamThumbnail {\n  removeStreamThumbnail\n}\n": typeof types.RemoveStreamThumbnailDocument,
    "\nmutation ChangeStreamThumbnail($thumbnail: Upload!) {\n  changeStreamThumbnail(thumbnail: $thumbnail)\n}\n": typeof types.ChangeStreamThumbnailDocument,
    "\nquery FindAllStreams($filters: FiltersInput!) {\n  findAllStreams(filters: $filters) {\n    title\n    thumbnailUrl\n    isLive\n    user {\n      username\n      avatar\n      isVerified\n    }\n    category {\n      title\n      slug\n    }\n  }\n}\n": typeof types.FindAllStreamsDocument,
    "\nmutation GenerateStreamToken($data: GenerateStreamTokenInput!) {\n  generateStreamToken(data: $data) {\n    token\n  }\n}\n": typeof types.GenerateStreamTokenDocument,
    "\nmutation CreateUser($data: CreateUserInput!) {\n  createUser(data: $data)\n}\n": typeof types.CreateUserDocument,
    "\nmutation DeactivateAccount($data: DeactivateAccountInput!) {\n  deactivateAccount(data: $data) {\n    user {\n      isDeactivated\n    }\n    message\n  }\n}\n": typeof types.DeactivateAccountDocument,
    "\nmutation LoginUser($data: LoginInput!) {\n  loginUser(data: $data) {\n    user {\n      username\n    }\n    message\n  }\n}\n": typeof types.LoginUserDocument,
    "\nmutation NewPassword($data: NewPasswordInput!) {\n  newPassword(data: $data)\n}\n": typeof types.NewPasswordDocument,
    "\nmutation ResetPassword($data: ResetPasswordInput!) {\n  resetPassword(data: $data)\n}\n": typeof types.ResetPasswordDocument,
    "\nmutation VerifyAccount($data: VerificationInput!) {\n  verifyAccount(data: $data) {\n    message\n    user {\n      email\n      isEmailVerified\n    }\n  }\n}\n": typeof types.VerifyAccountDocument,
    "\nquery FindProfile {\n  findProfile {\n    id\n    username\n    displayName\n    email\n    avatar\n    bio\n    isVerified\n    isTotpEnabled\n    notificationSettings {\n      siteNotifications\n      telegramNotifications\n    }\n    stream {\n      serverUrl\n      streamKey\n      isChatEnabled\n      isChatFollowersOnly\n      isChatPremiumFollowersOnly\n    }\n  }\n}\n": typeof types.FindProfileDocument,
    "\nmutation ClearSessionCookie {\n  clearSessionCookie\n}\n": typeof types.ClearSessionCookieDocument,
    "\nmutation LogoutUser {\n  logoutUser\n}\n": typeof types.LogoutUserDocument,
};
const documents: Documents = {
    "\nquery FindChannelByUsername($username: String!) {\n  findChannelByUsername(username: $username) {\n    id\n    username\n    displayName\n    avatar\n    bio\n    isVerified\n    socialLinks {\n      title\n      url\n    }\n    stream {\n      id\n      title\n      thumbnailUrl\n      isLive\n      isChatEnabled\n      isChatFollowersOnly\n      isChatPremiumFollowersOnly\n      category {\n        id\n        title\n      }\n    }\n    sponsorshipPlans {\n      id\n      title\n      description\n      price\n    }\n    followings {\n      id\n    }\n  }\n}\n": types.FindChannelByUsernameDocument,
    "\nquery FindRandomStreams {\n  findRandomStreams {\n    title\n    thumbnailUrl\n    isLive\n    user {\n      username\n      avatar\n      isVerified\n    }\n    category {\n      title\n      slug\n    }\n  }\n}\n": types.FindRandomStreamsDocument,
    "\nquery FindRandomCategories {\n  findRandomCategories {\n    title\n    slug\n    thumbnailUrl\n  }\n}\n": types.FindRandomCategoriesDocument,
    "\nquery FindCategoryBySlug($slug: String!) {\n  findCategoryBySlug(slug: $slug) {\n    title\n    thumbnailUrl\n    description\n    streams {\n      title\n      thumbnailUrl\n      isLive\n      user {\n        username\n        avatar\n        isVerified\n      }\n      category {\n        title\n        slug\n      }\n    }\n  }\n}\n": types.FindCategoryBySlugDocument,
    "\n  query FindUnreadNotificationsCount {\n    findUnreadNotificationsCount\n  }\n": types.FindUnreadNotificationsCountDocument,
    "\n  query FindNotificationsByUser {\n    findNotificationsByUser {\n      id\n      message\n      type\n    }\n  }\n": types.FindNotificationsByUserDocument,
    "\nquery FindUnreadNotificationsCount {\n  findUnreadNotificationsCount\n}\n": types.FindUnreadNotificationsCountDocument,
    "\nquery FindRecommendedChannels {\n  findRecommendedChannels {\n    username\n    avatar\n    isVerified\n    stream {\n      isLive\n    }\n  }\n}\n": types.FindRecommendedChannelsDocument,
    "\nmutation ChangeChatSettings($data: ChangeChatSettingsInput!) {\n  changeChatSettings(data: $data)\n}\n": types.ChangeChatSettingsDocument,
    "\nquery FindMyFollowers {\n  findMyFollowers {\n    createdAt\n    follower {\n      username\n      avatar\n      isVerified\n    }\n  }\n}\n": types.FindMyFollowersDocument,
    "\nquery FindMySponsorshipPlans {\n  findMySponsorshipPlans {\n    id\n    createdAt\n    title\n    price\n  }\n}\n": types.FindMySponsorshipPlansDocument,
    "\nmutation CreateSponsorshipPlan($data: CreatePlanInput!) {\n  createSponsorshipPlan(data: $data)\n}\n": types.CreateSponsorshipPlanDocument,
    "\nmutation RemoveSponsorshipPlan($planId: String!) {\n  removeSponsorshipPlan(planId: $planId)\n}\n": types.RemoveSponsorshipPlanDocument,
    "\nmutation ChangeEmail($data: ChangeEmailInput!) {\n  changeEmail(data: $data)\n}\n": types.ChangeEmailDocument,
    "\nmutation ChangePassword($data: ChangePasswordInput!) {\n  changePassword(data: $data)\n}\n": types.ChangePasswordDocument,
    "\nmutation DisableTotp($data: DisableTotpInput!) {\n  disableTotp(data: $data)\n}\n": types.DisableTotpDocument,
    "\nquery GenerateTotpSecret {\n  generateTotpSecret {\n    qrcodeUrl\n    secret\n  }\n}\n": types.GenerateTotpSecretDocument,
    "\nmutation EnableTotp($data: EnableTotpInput!) {\n  enableTotp(data: $data)\n}\n": types.EnableTotpDocument,
    "\nmutation ChangeNotificationsSettings($data: ChangeNotificationsSettingsInput!) {\n  changeNotificationsSettings(data: $data) {\n    notificationSettings {\n      siteNotifications\n      telegramNotifications\n    }\n    telegramAuthToken\n  }\n}\n": types.ChangeNotificationsSettingsDocument,
    "\nmutation RemoveProfileAvatar {\n  removeProfileAvatar\n}\n": types.RemoveProfileAvatarDocument,
    "\nmutation ChangeProfileAvatar($avatar: Upload!) {\n  changeProfileAvatar(avatar: $avatar)\n}\n": types.ChangeProfileAvatarDocument,
    "\nmutation ChangeProfileInfo($data: ChangeProfileInfoInput!) {\n  changeProfileInfo(data: $data)\n}\n": types.ChangeProfileInfoDocument,
    "\nmutation UpdateSocialLink($id: String!, $data: SocialLinkInput!) {\n  updateSocialLink(id: $id, data: $data)\n}\n": types.UpdateSocialLinkDocument,
    "\nmutation RemoveSocialLink($id: String!) {\n  removeSocialLink(id: $id)\n}\n": types.RemoveSocialLinkDocument,
    "\nquery FindSocialLinks {\n  findSocialLinks {\n    id\n    title\n    url\n    position\n  }\n}\n": types.FindSocialLinksDocument,
    "\nmutation CreateSocialLink($data: SocialLinkInput!) {\n  createSocialLink(data: $data)\n}\n": types.CreateSocialLinkDocument,
    "\nmutation ReorderSocialLinks($list: [SocialLinkOrderInput!]!) {\n  reorderSocialLinks(list: $list)\n}\n": types.ReorderSocialLinksDocument,
    "\nmutation RemoveSession($id: String!) {\n  removeSession(id: $id)\n}\n": types.RemoveSessionDocument,
    "\nquery FindSessionsByUser {\n  findSessionsByUser {\n    id\n    createdAt\n    metadata {\n      location {\n        country\n        city\n        latitude\n        longitude\n      }\n      device {\n        browser\n        os\n      }\n      ip\n    }\n  }\n}\n": types.FindSessionsByUserDocument,
    "\nquery FindCurrentSession {\n  findCurrentSession {\n    id\n    createdAt\n    metadata {\n      location {\n        country\n        city\n        latitude\n        longitude\n      }\n      device {\n        browser\n        os\n      }\n      ip\n    }\n  }\n}\n": types.FindCurrentSessionDocument,
    "\nquery FindMySponsors {\n  findMySponsors {\n    expiresAt\n    user {\n      username\n      avatar\n      isVerified\n    }\n    plan {\n      title\n    }\n  }\n}\n": types.FindMySponsorsDocument,
    "\nmutation CreateIngress($ingressType: IngressInputType!) {\n  createIngress(ingressType: $ingressType)\n}\n": types.CreateIngressDocument,
    "\nmutation ResetIngresses {\n  resetIngresses\n}\n": types.ResetIngressesDocument,
    "\nquery FindMyTransactions {\n  findMyTransactions {\n    createdAt\n    status\n    amount\n  }\n}\n": types.FindMyTransactionsDocument,
    "\nmutation UnfollowChannel($channelId: String!) {\n  unfollowChannel(channelId: $channelId)\n}\n": types.UnfollowChannelDocument,
    "\nmutation FollowChannel($channelId: String!) {\n  followChannel(channelId: $channelId)\n}\n": types.FollowChannelDocument,
    "\nquery FindMyFollowings {\n  findMyFollowings {\n    createdAt\n    followingId\n  }\n}\n": types.FindMyFollowingsDocument,
    "\nmutation MakePayment($planId: String!) {\n  makePayment(planId: $planId) {\n    url\n  }\n}\n": types.MakePaymentDocument,
    "\nquery FindSponsorsByChannel($channelId: String!) {\n  findSponsorsByChannel(channelId: $channelId) {\n    user {\n      id\n      username\n      avatar\n    }\n  }\n}\n": types.FindSponsorsByChannelDocument,
    "\nquery FindChatMessagesByStream($streamId: String!) {\n  findChatMessagesByStream(streamId: $streamId) {\n    createdAt\n    text\n    user {\n      id\n      username\n    }\n  }\n}\n": types.FindChatMessagesByStreamDocument,
    "\nsubscription ChatMessageAdded($streamId: String!) {\n  chatMessageAdded(streamId: $streamId) {\n    createdAt\n    text\n    user {\n      id\n      username\n    }\n  }\n}\n": types.ChatMessageAddedDocument,
    "\nmutation SendChatMessage($data: SendMessageInput!) {\n  sendChatMessage(data: $data) {\n    streamId\n  }\n}\n": types.SendChatMessageDocument,
    "\nquery FindAllCategories {\n  findAllCategories {\n    id\n    updatedAt\n    title\n    slug\n    thumbnailUrl\n  }\n}\n": types.FindAllCategoriesDocument,
    "\nmutation ChangeStreamInfo($data: ChangeStreamInfoInput!) {\n  changeStreamInfo(data: $data)\n}\n": types.ChangeStreamInfoDocument,
    "\nmutation RemoveStreamThumbnail {\n  removeStreamThumbnail\n}\n": types.RemoveStreamThumbnailDocument,
    "\nmutation ChangeStreamThumbnail($thumbnail: Upload!) {\n  changeStreamThumbnail(thumbnail: $thumbnail)\n}\n": types.ChangeStreamThumbnailDocument,
    "\nquery FindAllStreams($filters: FiltersInput!) {\n  findAllStreams(filters: $filters) {\n    title\n    thumbnailUrl\n    isLive\n    user {\n      username\n      avatar\n      isVerified\n    }\n    category {\n      title\n      slug\n    }\n  }\n}\n": types.FindAllStreamsDocument,
    "\nmutation GenerateStreamToken($data: GenerateStreamTokenInput!) {\n  generateStreamToken(data: $data) {\n    token\n  }\n}\n": types.GenerateStreamTokenDocument,
    "\nmutation CreateUser($data: CreateUserInput!) {\n  createUser(data: $data)\n}\n": types.CreateUserDocument,
    "\nmutation DeactivateAccount($data: DeactivateAccountInput!) {\n  deactivateAccount(data: $data) {\n    user {\n      isDeactivated\n    }\n    message\n  }\n}\n": types.DeactivateAccountDocument,
    "\nmutation LoginUser($data: LoginInput!) {\n  loginUser(data: $data) {\n    user {\n      username\n    }\n    message\n  }\n}\n": types.LoginUserDocument,
    "\nmutation NewPassword($data: NewPasswordInput!) {\n  newPassword(data: $data)\n}\n": types.NewPasswordDocument,
    "\nmutation ResetPassword($data: ResetPasswordInput!) {\n  resetPassword(data: $data)\n}\n": types.ResetPasswordDocument,
    "\nmutation VerifyAccount($data: VerificationInput!) {\n  verifyAccount(data: $data) {\n    message\n    user {\n      email\n      isEmailVerified\n    }\n  }\n}\n": types.VerifyAccountDocument,
    "\nquery FindProfile {\n  findProfile {\n    id\n    username\n    displayName\n    email\n    avatar\n    bio\n    isVerified\n    isTotpEnabled\n    notificationSettings {\n      siteNotifications\n      telegramNotifications\n    }\n    stream {\n      serverUrl\n      streamKey\n      isChatEnabled\n      isChatFollowersOnly\n      isChatPremiumFollowersOnly\n    }\n  }\n}\n": types.FindProfileDocument,
    "\nmutation ClearSessionCookie {\n  clearSessionCookie\n}\n": types.ClearSessionCookieDocument,
    "\nmutation LogoutUser {\n  logoutUser\n}\n": types.LogoutUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery FindChannelByUsername($username: String!) {\n  findChannelByUsername(username: $username) {\n    id\n    username\n    displayName\n    avatar\n    bio\n    isVerified\n    socialLinks {\n      title\n      url\n    }\n    stream {\n      id\n      title\n      thumbnailUrl\n      isLive\n      isChatEnabled\n      isChatFollowersOnly\n      isChatPremiumFollowersOnly\n      category {\n        id\n        title\n      }\n    }\n    sponsorshipPlans {\n      id\n      title\n      description\n      price\n    }\n    followings {\n      id\n    }\n  }\n}\n"): (typeof documents)["\nquery FindChannelByUsername($username: String!) {\n  findChannelByUsername(username: $username) {\n    id\n    username\n    displayName\n    avatar\n    bio\n    isVerified\n    socialLinks {\n      title\n      url\n    }\n    stream {\n      id\n      title\n      thumbnailUrl\n      isLive\n      isChatEnabled\n      isChatFollowersOnly\n      isChatPremiumFollowersOnly\n      category {\n        id\n        title\n      }\n    }\n    sponsorshipPlans {\n      id\n      title\n      description\n      price\n    }\n    followings {\n      id\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery FindRandomStreams {\n  findRandomStreams {\n    title\n    thumbnailUrl\n    isLive\n    user {\n      username\n      avatar\n      isVerified\n    }\n    category {\n      title\n      slug\n    }\n  }\n}\n"): (typeof documents)["\nquery FindRandomStreams {\n  findRandomStreams {\n    title\n    thumbnailUrl\n    isLive\n    user {\n      username\n      avatar\n      isVerified\n    }\n    category {\n      title\n      slug\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery FindRandomCategories {\n  findRandomCategories {\n    title\n    slug\n    thumbnailUrl\n  }\n}\n"): (typeof documents)["\nquery FindRandomCategories {\n  findRandomCategories {\n    title\n    slug\n    thumbnailUrl\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery FindCategoryBySlug($slug: String!) {\n  findCategoryBySlug(slug: $slug) {\n    title\n    thumbnailUrl\n    description\n    streams {\n      title\n      thumbnailUrl\n      isLive\n      user {\n        username\n        avatar\n        isVerified\n      }\n      category {\n        title\n        slug\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery FindCategoryBySlug($slug: String!) {\n  findCategoryBySlug(slug: $slug) {\n    title\n    thumbnailUrl\n    description\n    streams {\n      title\n      thumbnailUrl\n      isLive\n      user {\n        username\n        avatar\n        isVerified\n      }\n      category {\n        title\n        slug\n      }\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindUnreadNotificationsCount {\n    findUnreadNotificationsCount\n  }\n"): (typeof documents)["\n  query FindUnreadNotificationsCount {\n    findUnreadNotificationsCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindNotificationsByUser {\n    findNotificationsByUser {\n      id\n      message\n      type\n    }\n  }\n"): (typeof documents)["\n  query FindNotificationsByUser {\n    findNotificationsByUser {\n      id\n      message\n      type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery FindUnreadNotificationsCount {\n  findUnreadNotificationsCount\n}\n"): (typeof documents)["\nquery FindUnreadNotificationsCount {\n  findUnreadNotificationsCount\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery FindRecommendedChannels {\n  findRecommendedChannels {\n    username\n    avatar\n    isVerified\n    stream {\n      isLive\n    }\n  }\n}\n"): (typeof documents)["\nquery FindRecommendedChannels {\n  findRecommendedChannels {\n    username\n    avatar\n    isVerified\n    stream {\n      isLive\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation ChangeChatSettings($data: ChangeChatSettingsInput!) {\n  changeChatSettings(data: $data)\n}\n"): (typeof documents)["\nmutation ChangeChatSettings($data: ChangeChatSettingsInput!) {\n  changeChatSettings(data: $data)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery FindMyFollowers {\n  findMyFollowers {\n    createdAt\n    follower {\n      username\n      avatar\n      isVerified\n    }\n  }\n}\n"): (typeof documents)["\nquery FindMyFollowers {\n  findMyFollowers {\n    createdAt\n    follower {\n      username\n      avatar\n      isVerified\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery FindMySponsorshipPlans {\n  findMySponsorshipPlans {\n    id\n    createdAt\n    title\n    price\n  }\n}\n"): (typeof documents)["\nquery FindMySponsorshipPlans {\n  findMySponsorshipPlans {\n    id\n    createdAt\n    title\n    price\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation CreateSponsorshipPlan($data: CreatePlanInput!) {\n  createSponsorshipPlan(data: $data)\n}\n"): (typeof documents)["\nmutation CreateSponsorshipPlan($data: CreatePlanInput!) {\n  createSponsorshipPlan(data: $data)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation RemoveSponsorshipPlan($planId: String!) {\n  removeSponsorshipPlan(planId: $planId)\n}\n"): (typeof documents)["\nmutation RemoveSponsorshipPlan($planId: String!) {\n  removeSponsorshipPlan(planId: $planId)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation ChangeEmail($data: ChangeEmailInput!) {\n  changeEmail(data: $data)\n}\n"): (typeof documents)["\nmutation ChangeEmail($data: ChangeEmailInput!) {\n  changeEmail(data: $data)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation ChangePassword($data: ChangePasswordInput!) {\n  changePassword(data: $data)\n}\n"): (typeof documents)["\nmutation ChangePassword($data: ChangePasswordInput!) {\n  changePassword(data: $data)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation DisableTotp($data: DisableTotpInput!) {\n  disableTotp(data: $data)\n}\n"): (typeof documents)["\nmutation DisableTotp($data: DisableTotpInput!) {\n  disableTotp(data: $data)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GenerateTotpSecret {\n  generateTotpSecret {\n    qrcodeUrl\n    secret\n  }\n}\n"): (typeof documents)["\nquery GenerateTotpSecret {\n  generateTotpSecret {\n    qrcodeUrl\n    secret\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation EnableTotp($data: EnableTotpInput!) {\n  enableTotp(data: $data)\n}\n"): (typeof documents)["\nmutation EnableTotp($data: EnableTotpInput!) {\n  enableTotp(data: $data)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation ChangeNotificationsSettings($data: ChangeNotificationsSettingsInput!) {\n  changeNotificationsSettings(data: $data) {\n    notificationSettings {\n      siteNotifications\n      telegramNotifications\n    }\n    telegramAuthToken\n  }\n}\n"): (typeof documents)["\nmutation ChangeNotificationsSettings($data: ChangeNotificationsSettingsInput!) {\n  changeNotificationsSettings(data: $data) {\n    notificationSettings {\n      siteNotifications\n      telegramNotifications\n    }\n    telegramAuthToken\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation RemoveProfileAvatar {\n  removeProfileAvatar\n}\n"): (typeof documents)["\nmutation RemoveProfileAvatar {\n  removeProfileAvatar\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation ChangeProfileAvatar($avatar: Upload!) {\n  changeProfileAvatar(avatar: $avatar)\n}\n"): (typeof documents)["\nmutation ChangeProfileAvatar($avatar: Upload!) {\n  changeProfileAvatar(avatar: $avatar)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation ChangeProfileInfo($data: ChangeProfileInfoInput!) {\n  changeProfileInfo(data: $data)\n}\n"): (typeof documents)["\nmutation ChangeProfileInfo($data: ChangeProfileInfoInput!) {\n  changeProfileInfo(data: $data)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation UpdateSocialLink($id: String!, $data: SocialLinkInput!) {\n  updateSocialLink(id: $id, data: $data)\n}\n"): (typeof documents)["\nmutation UpdateSocialLink($id: String!, $data: SocialLinkInput!) {\n  updateSocialLink(id: $id, data: $data)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation RemoveSocialLink($id: String!) {\n  removeSocialLink(id: $id)\n}\n"): (typeof documents)["\nmutation RemoveSocialLink($id: String!) {\n  removeSocialLink(id: $id)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery FindSocialLinks {\n  findSocialLinks {\n    id\n    title\n    url\n    position\n  }\n}\n"): (typeof documents)["\nquery FindSocialLinks {\n  findSocialLinks {\n    id\n    title\n    url\n    position\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation CreateSocialLink($data: SocialLinkInput!) {\n  createSocialLink(data: $data)\n}\n"): (typeof documents)["\nmutation CreateSocialLink($data: SocialLinkInput!) {\n  createSocialLink(data: $data)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation ReorderSocialLinks($list: [SocialLinkOrderInput!]!) {\n  reorderSocialLinks(list: $list)\n}\n"): (typeof documents)["\nmutation ReorderSocialLinks($list: [SocialLinkOrderInput!]!) {\n  reorderSocialLinks(list: $list)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation RemoveSession($id: String!) {\n  removeSession(id: $id)\n}\n"): (typeof documents)["\nmutation RemoveSession($id: String!) {\n  removeSession(id: $id)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery FindSessionsByUser {\n  findSessionsByUser {\n    id\n    createdAt\n    metadata {\n      location {\n        country\n        city\n        latitude\n        longitude\n      }\n      device {\n        browser\n        os\n      }\n      ip\n    }\n  }\n}\n"): (typeof documents)["\nquery FindSessionsByUser {\n  findSessionsByUser {\n    id\n    createdAt\n    metadata {\n      location {\n        country\n        city\n        latitude\n        longitude\n      }\n      device {\n        browser\n        os\n      }\n      ip\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery FindCurrentSession {\n  findCurrentSession {\n    id\n    createdAt\n    metadata {\n      location {\n        country\n        city\n        latitude\n        longitude\n      }\n      device {\n        browser\n        os\n      }\n      ip\n    }\n  }\n}\n"): (typeof documents)["\nquery FindCurrentSession {\n  findCurrentSession {\n    id\n    createdAt\n    metadata {\n      location {\n        country\n        city\n        latitude\n        longitude\n      }\n      device {\n        browser\n        os\n      }\n      ip\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery FindMySponsors {\n  findMySponsors {\n    expiresAt\n    user {\n      username\n      avatar\n      isVerified\n    }\n    plan {\n      title\n    }\n  }\n}\n"): (typeof documents)["\nquery FindMySponsors {\n  findMySponsors {\n    expiresAt\n    user {\n      username\n      avatar\n      isVerified\n    }\n    plan {\n      title\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation CreateIngress($ingressType: IngressInputType!) {\n  createIngress(ingressType: $ingressType)\n}\n"): (typeof documents)["\nmutation CreateIngress($ingressType: IngressInputType!) {\n  createIngress(ingressType: $ingressType)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation ResetIngresses {\n  resetIngresses\n}\n"): (typeof documents)["\nmutation ResetIngresses {\n  resetIngresses\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery FindMyTransactions {\n  findMyTransactions {\n    createdAt\n    status\n    amount\n  }\n}\n"): (typeof documents)["\nquery FindMyTransactions {\n  findMyTransactions {\n    createdAt\n    status\n    amount\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation UnfollowChannel($channelId: String!) {\n  unfollowChannel(channelId: $channelId)\n}\n"): (typeof documents)["\nmutation UnfollowChannel($channelId: String!) {\n  unfollowChannel(channelId: $channelId)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation FollowChannel($channelId: String!) {\n  followChannel(channelId: $channelId)\n}\n"): (typeof documents)["\nmutation FollowChannel($channelId: String!) {\n  followChannel(channelId: $channelId)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery FindMyFollowings {\n  findMyFollowings {\n    createdAt\n    followingId\n  }\n}\n"): (typeof documents)["\nquery FindMyFollowings {\n  findMyFollowings {\n    createdAt\n    followingId\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation MakePayment($planId: String!) {\n  makePayment(planId: $planId) {\n    url\n  }\n}\n"): (typeof documents)["\nmutation MakePayment($planId: String!) {\n  makePayment(planId: $planId) {\n    url\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery FindSponsorsByChannel($channelId: String!) {\n  findSponsorsByChannel(channelId: $channelId) {\n    user {\n      id\n      username\n      avatar\n    }\n  }\n}\n"): (typeof documents)["\nquery FindSponsorsByChannel($channelId: String!) {\n  findSponsorsByChannel(channelId: $channelId) {\n    user {\n      id\n      username\n      avatar\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery FindChatMessagesByStream($streamId: String!) {\n  findChatMessagesByStream(streamId: $streamId) {\n    createdAt\n    text\n    user {\n      id\n      username\n    }\n  }\n}\n"): (typeof documents)["\nquery FindChatMessagesByStream($streamId: String!) {\n  findChatMessagesByStream(streamId: $streamId) {\n    createdAt\n    text\n    user {\n      id\n      username\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nsubscription ChatMessageAdded($streamId: String!) {\n  chatMessageAdded(streamId: $streamId) {\n    createdAt\n    text\n    user {\n      id\n      username\n    }\n  }\n}\n"): (typeof documents)["\nsubscription ChatMessageAdded($streamId: String!) {\n  chatMessageAdded(streamId: $streamId) {\n    createdAt\n    text\n    user {\n      id\n      username\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation SendChatMessage($data: SendMessageInput!) {\n  sendChatMessage(data: $data) {\n    streamId\n  }\n}\n"): (typeof documents)["\nmutation SendChatMessage($data: SendMessageInput!) {\n  sendChatMessage(data: $data) {\n    streamId\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery FindAllCategories {\n  findAllCategories {\n    id\n    updatedAt\n    title\n    slug\n    thumbnailUrl\n  }\n}\n"): (typeof documents)["\nquery FindAllCategories {\n  findAllCategories {\n    id\n    updatedAt\n    title\n    slug\n    thumbnailUrl\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation ChangeStreamInfo($data: ChangeStreamInfoInput!) {\n  changeStreamInfo(data: $data)\n}\n"): (typeof documents)["\nmutation ChangeStreamInfo($data: ChangeStreamInfoInput!) {\n  changeStreamInfo(data: $data)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation RemoveStreamThumbnail {\n  removeStreamThumbnail\n}\n"): (typeof documents)["\nmutation RemoveStreamThumbnail {\n  removeStreamThumbnail\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation ChangeStreamThumbnail($thumbnail: Upload!) {\n  changeStreamThumbnail(thumbnail: $thumbnail)\n}\n"): (typeof documents)["\nmutation ChangeStreamThumbnail($thumbnail: Upload!) {\n  changeStreamThumbnail(thumbnail: $thumbnail)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery FindAllStreams($filters: FiltersInput!) {\n  findAllStreams(filters: $filters) {\n    title\n    thumbnailUrl\n    isLive\n    user {\n      username\n      avatar\n      isVerified\n    }\n    category {\n      title\n      slug\n    }\n  }\n}\n"): (typeof documents)["\nquery FindAllStreams($filters: FiltersInput!) {\n  findAllStreams(filters: $filters) {\n    title\n    thumbnailUrl\n    isLive\n    user {\n      username\n      avatar\n      isVerified\n    }\n    category {\n      title\n      slug\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation GenerateStreamToken($data: GenerateStreamTokenInput!) {\n  generateStreamToken(data: $data) {\n    token\n  }\n}\n"): (typeof documents)["\nmutation GenerateStreamToken($data: GenerateStreamTokenInput!) {\n  generateStreamToken(data: $data) {\n    token\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation CreateUser($data: CreateUserInput!) {\n  createUser(data: $data)\n}\n"): (typeof documents)["\nmutation CreateUser($data: CreateUserInput!) {\n  createUser(data: $data)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation DeactivateAccount($data: DeactivateAccountInput!) {\n  deactivateAccount(data: $data) {\n    user {\n      isDeactivated\n    }\n    message\n  }\n}\n"): (typeof documents)["\nmutation DeactivateAccount($data: DeactivateAccountInput!) {\n  deactivateAccount(data: $data) {\n    user {\n      isDeactivated\n    }\n    message\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation LoginUser($data: LoginInput!) {\n  loginUser(data: $data) {\n    user {\n      username\n    }\n    message\n  }\n}\n"): (typeof documents)["\nmutation LoginUser($data: LoginInput!) {\n  loginUser(data: $data) {\n    user {\n      username\n    }\n    message\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation NewPassword($data: NewPasswordInput!) {\n  newPassword(data: $data)\n}\n"): (typeof documents)["\nmutation NewPassword($data: NewPasswordInput!) {\n  newPassword(data: $data)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation ResetPassword($data: ResetPasswordInput!) {\n  resetPassword(data: $data)\n}\n"): (typeof documents)["\nmutation ResetPassword($data: ResetPasswordInput!) {\n  resetPassword(data: $data)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation VerifyAccount($data: VerificationInput!) {\n  verifyAccount(data: $data) {\n    message\n    user {\n      email\n      isEmailVerified\n    }\n  }\n}\n"): (typeof documents)["\nmutation VerifyAccount($data: VerificationInput!) {\n  verifyAccount(data: $data) {\n    message\n    user {\n      email\n      isEmailVerified\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery FindProfile {\n  findProfile {\n    id\n    username\n    displayName\n    email\n    avatar\n    bio\n    isVerified\n    isTotpEnabled\n    notificationSettings {\n      siteNotifications\n      telegramNotifications\n    }\n    stream {\n      serverUrl\n      streamKey\n      isChatEnabled\n      isChatFollowersOnly\n      isChatPremiumFollowersOnly\n    }\n  }\n}\n"): (typeof documents)["\nquery FindProfile {\n  findProfile {\n    id\n    username\n    displayName\n    email\n    avatar\n    bio\n    isVerified\n    isTotpEnabled\n    notificationSettings {\n      siteNotifications\n      telegramNotifications\n    }\n    stream {\n      serverUrl\n      streamKey\n      isChatEnabled\n      isChatFollowersOnly\n      isChatPremiumFollowersOnly\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation ClearSessionCookie {\n  clearSessionCookie\n}\n"): (typeof documents)["\nmutation ClearSessionCookie {\n  clearSessionCookie\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation LogoutUser {\n  logoutUser\n}\n"): (typeof documents)["\nmutation LogoutUser {\n  logoutUser\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;