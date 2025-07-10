import { Markup } from 'telegraf'

export const BUTTONS = {
	authSuccess: Markup.inlineKeyboard([
		[
			Markup.button.callback('🎯 My Subscriptions', 'follows'),
			Markup.button.callback('👤 View Profile', 'me')
		],
		[Markup.button.url('🌐 Go to Website', 'https://bdlive.com')]
	]),

	profile: Markup.inlineKeyboard([
		Markup.button.url(
			'⚙️ Account Settings',
			'https://bdlive.com/dashboard/settings'
		)
	])
}
