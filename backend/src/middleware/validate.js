import { ApiError } from '../utils/apiError.js';

/**
 * Joi Validation Middleware Generator
 * Validates req.body, req.query, or req.params against given Joi schema
 */
export const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorDetails = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message.replace(/['"]/g, '')
      }));

      return next(
        new ApiError(400, `Input Validation Failed: ${errorDetails.map(d => d.message).join('; ')}`)
      );
    }

    req[property] = value;
    next();
  };
};
