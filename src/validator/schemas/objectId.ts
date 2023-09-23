import { ValidationSchema } from "fastest-validator";

export const ObjectIdSchema: ValidationSchema = {
    type: 'string' ,
    min: 15,
    $$root: true
}

