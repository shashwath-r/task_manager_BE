const Joi = require("joi");

const taskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow("", null),
  status: Joi.string()
    .valid("pending", "in-progress", "completed")
    .default("pending"),
  dueDate: Joi.date().greater("now").optional().messages({
    "date.base": `"dueDate" should be a valid date`,
    "date.greater": `"dueDate" must be in the future`,
  }),
});

module.exports = { taskSchema };
