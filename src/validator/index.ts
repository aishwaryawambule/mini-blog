import Validator from 'fastest-validator'
import { AuthorCreateSchema } from "./schemas/author";
import { CardCreateSchema, CardDeleteSchema, CardEditSchema } from "./schemas/card";
import { ObjectIdSchema } from './schemas/objectId';

const validator = new Validator({
    useNewCustomCheckerFunction: true,
    defaults: {
      object: {
        strict: 'remove',
      },
    },
    messages: {
      required: '{field} is required',
      string: '{field} must be a string',
      stringEnum: '{field} must be one of the following {expected}',
      number: '{field} must be a number',
      date: '{field} must be a date',
      array: '{field} must be an array',
    },
})

export const authorCreateValidator = validator.compile(AuthorCreateSchema)
export const cardCreateValidator = validator.compile(CardCreateSchema)
export const cardEditValidator = validator.compile(CardEditSchema)
export const cardDeleteValidator = validator.compile(CardDeleteSchema)
export const objectIdValidator = validator.compile(ObjectIdSchema)

