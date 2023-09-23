
import { ValidationSchema } from 'fastest-validator'

export const CardCreateSchema: ValidationSchema = {
    name: { type: 'string', min: 1 },
    emailAddress: { type: 'string', min: 10 },
    category: { type: 'string', min: 1 },
    description: { type: 'string', min: 1 }
}


export const CardEditSchema: ValidationSchema = {
    name: { type: 'string', min: 1 },
    emailAddress: { type: 'string', min: 10 },
    category: { type: 'string', min: 1 },
    description: { type: 'string', min: 10 }
}

export const CardDeleteSchema: ValidationSchema = {
    emailAddress: { type: 'string', min: 10 }
}
  