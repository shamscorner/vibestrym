import type { SponsorshipPlan, User } from '@/prisma/generated'
import type { SessionMetadata } from '@/src/shared/types/session-metadata.types'

export const MESSAGES = {
	welcome:
		`<b>👋 Hey there! Welcome to Vibestrym Bot!</b>\n\n` +
		`To get notifications and make your experience awesome, let's connect your Telegram account with Vibestrym.\n\n` +
		`Just tap the button below and head to the <b>Notifications</b> section to finish setting things up.`,

	authSuccess: `🥳 Woohoo! You've successfully connected your Telegram account with Vibestrym!\n\n`,

	invalidToken: '⚠️ Oops! That token is invalid or has expired.',
	profile: (user: User, followersCount: number) =>
		`<b>💫 Your Profile:</b>\n\n` +
		`👤 Username: <b>${user.username}</b>\n` +
		`📧 Email: <b>${user.email}</b>\n` +
		`🎉 Followers: <b>${followersCount}</b>\n` +
		`💬 About: <b>${user.bio || 'Nothing yet'}</b>\n\n` +
		`⚙️ Tap the button below to update your profile settings.`,

	follows: (user: User) =>
		`📱 <a href="https://vibestrym.com/${user.username}">${user.username}</a>`,

	resetPassword: (token: string, metadata: SessionMetadata) =>
		`<b>🔑 Reset Your Password</b>\n\n` +
		`Hey there! You asked to reset your password on <b>Vibestrym</b>.\n\n` +
		`To set up a new password, just click this link:\n\n` +
		`<b><a href="https://vibestrym.com/account/recovery/${token}/update-password">Update Password</a></b>\n\n` +
		`📆 <b>Request Time:</b> ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}\n\n` +
		`<b>Request Details:</b>\n\n` +
		`🌎 <b>Location:</b> ${metadata.location?.country}, ${metadata.location?.city}\n` +
		`📱 <b>Device:</b> ${metadata.device?.os}\n` +
		`🌐 <b>Browser:</b> ${metadata.device?.browser}\n` +
		`🔒 <b>IP Address:</b> ${metadata.ip}\n\n` +
		`If this wasn't you, no worries - just ignore this message.\n\n` +
		`Thanks for using <b>Vibestrym</b>! 🚀`,

	deactivate: (token: string, metadata: SessionMetadata) =>
		`<b>⚠️ Account Deactivation Request</b>\n\n` +
		`Hey! We noticed you're trying to deactivate your Vibestrym account.\n\n` +
		`To confirm this is really you, enter this code:\n\n` +
		`<b>Confirmation Code: ${token}</b>\n\n` +
		`📆 <b>Request Time:</b> ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}\n\n` +
		`<b>Request Details:</b>\n\n` +
		`• 🌎 <b>Location:</b> ${metadata.location?.country}, ${metadata.location?.city}\n` +
		`• 📱 <b>Device:</b> ${metadata.device?.os}\n` +
		`• 🌐 <b>Browser:</b> ${metadata.device?.browser}\n` +
		`• 🔒 <b>IP Address:</b> ${metadata.ip}\n\n` +
		`<b>What happens next?</b>\n\n` +
		`1. You'll be logged out right away.\n` +
		`2. If you don't change your mind within 7 days, your account and all your stuff will be permanently deleted.\n\n` +
		`<b>⏰ Quick note:</b> Changed your mind? No problem! Just contact our support team within 7 days and we can restore everything.\n\n` +
		`After the 7 days though, everything will be gone for good - no way to get it back.\n\n` +
		`If you're having second thoughts, just ignore this message and your account will stay active.\n\n` +
		`Thanks for being part of <b>Vibestrym</b>! We'd love to see you stick around. 🚀\n\n` +
		`Cheers,\n` +
		`The Vibestrym Team`,

	accountDeleted:
		`<b>👋 Your account has been deleted</b>\n\n` +
		`We've completely removed your account from Vibestrym. All your data is gone for good. 🗑️\n\n` +
		`🔔 You won't get any more notifications from us on Telegram or email.\n\n` +
		`Miss us already? You can always sign up again here:\n` +
		`<b><a href="https://vibestrym.com/account/create">Rejoin Vibestrym</a></b>\n\n` +
		`Thanks for hanging out with us! Our door is always open if you want to come back. 🚀\n\n` +
		`Take care,\n` +
		`The Vibestrym Team`,

	streamStart: (channel: User) =>
		`<b>🔴 ${channel.displayName} is LIVE right now!</b>\n\n` +
		`Don't miss out: <a href="https://vibestrym.com/${channel.username}">Watch now</a>`,

	newFollowing: (follower: User, followersCount: number) =>
		`<b>🎉 You've got a new follower!</b>\n\n<a href="https://vibestrym.com/${follower.username}">${follower.displayName}</a> just followed you!\n\nYou now have ${followersCount} awesome followers on your channel`,

	enableTwoFactor:
		`🛡️ Beef up your security!\n\n` +
		`Turn on two-factor authentication in your <a href="https://vibestrym.com/dashboard/settings">account settings</a> to keep your account extra safe.`,

	verifyChannel:
		`<b>🌟 Amazing news! Your channel is now verified</b>\n\n` +
		`Guess what? Your channel just got the official verification badge!\n\n` +
		`This badge shows everyone your channel is the real deal and helps build trust with your viewers.\n\n` +
		`Thanks for being part of the Vibestrym family and keep creating awesome content!`,

	newSponsorship: (plan: SponsorshipPlan, sponsor: User) =>
		`<b>🎉 Great news! You've got a new Sponsorship</b>\n\n` +
		`You've received a new sponsorship for the plan <b>${plan.title}</b>.\n` +
		`💰 Amount: <b>${plan.price} ₽</b>\n` +
		`👤 Sponsor: <a href="https://vibestrym.com/${sponsor.username}">${sponsor.displayName}</a>\n` +
		`📅 Date: <b>${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</b>`
}
