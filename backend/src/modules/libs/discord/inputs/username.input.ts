import { StringOption } from 'necord'

export class UsernameInput {
	@StringOption({
		name: 'username',
		description: 'Your username',
		required: true
	})
	username: string
}
