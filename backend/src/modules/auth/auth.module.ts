import { Module } from '@nestjs/common'

import { AccountModule } from './account/account.module'
import { DeactivateModule } from './deactivate/deactivate.module'
import { PasswordRecoveryModule } from './password-recovery/password-recovery.module'
import { ProfileModule } from './profile/profile.module'
import { SessionModule } from './session/session.module'
import { TotpModule } from './totp/totp.module'
import { VerificationModule } from './verification/verification.module'

@Module({
	imports: [
		AccountModule,
		SessionModule,
		VerificationModule,
		PasswordRecoveryModule,
		TotpModule,
		DeactivateModule,
		ProfileModule
	]
})
export class AuthModule {}
