import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { IngressInput } from 'livekit-server-sdk'

registerEnumType(IngressInput, {
	name: 'IngressInput'
})

@InputType()
export class IngressInputType {
	@Field(() => IngressInput)
	public type: IngressInput
}
