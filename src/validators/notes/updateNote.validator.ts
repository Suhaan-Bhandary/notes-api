import Joi from 'joi';

export const updateNoteValidation = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
}).or('title', 'description');
