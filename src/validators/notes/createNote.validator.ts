import Joi from 'joi';

export const createNoteValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
});
