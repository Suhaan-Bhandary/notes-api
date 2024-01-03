import Joi from 'joi';

export const shareNoteValidation = Joi.object({
  shareEmail: Joi.string().email().required(),
});
