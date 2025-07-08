import { Module } from '@nestjs/common'

import { AccountModule } from './account/account.module'
import { SessionModule } from './session/session.module'
import { VerificationModule } from './verification/verification.module'

@Module({
	imports: [AccountModule, SessionModule, VerificationModule]
})
export class AuthModule {}
