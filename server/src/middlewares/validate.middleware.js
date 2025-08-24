const ApiError = require("../error/apiError");

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const message = error.details.map((d) => d.message).join(", ");
      return next(new ApiError(message, 400));
    }

    next();
  };
};

module.exports = validate;
