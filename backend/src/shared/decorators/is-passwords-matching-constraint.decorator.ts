import {
	type ValidationArguments,
	ValidatorConstraint,
	type ValidatorConstraintInterface
} from 'class-validator'

type NewPasswordInput = {
	password: string
	passwordRepeat: string
	token: string
}

@ValidatorConstraint({ name: 'IsPasswordsMatching', async: false })
export class IsPasswordsMatchingConstraint
	implements ValidatorConstraintInterface
{
	validate(passwordRepeat: string, args: ValidationArguments) {
		const object = args.object as NewPasswordInput
		return object.password === passwordRepeat
	}

	defaultMessage(validationArguments?: ValidationArguments) {
		if (validationArguments?.property) {
			return `${validationArguments.property} passwords do not match`
		}
		return 'Passwords do not match'
	}
}
