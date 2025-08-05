export interface NotificationData {
	title: string
	description: string
	color?: number
	fields?: Array<{ name: string; value: string; inline?: boolean }>
	timestamp?: boolean
	footer?: string
	thumbnail?: string
	image?: string
}
