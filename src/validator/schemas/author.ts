
import { ValidationSchema } from 'fastest-validator'

export const AuthorCreateSchema: ValidationSchema = {
    userName: { type: 'string', min: 2 },
    emailAddress: { type: 'string', min: 10 }
}
  