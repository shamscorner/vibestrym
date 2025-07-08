import { Module } from '@nestjs/common'

import { AccountModule } from './account/account.module'
import { PasswordRecoveryModule } from './password-recovery/password-recovery.module'
import { SessionModule } from './session/session.module'
import { VerificationModule } from './verification/verification.module'

@Module({
	imports: [
		AccountModule,
		SessionModule,
		VerificationModule,
		PasswordRecoveryModule
	]
})
export class AuthModule {}
