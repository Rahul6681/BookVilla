/**
 * Error Handling Middleware Utility
 * Higher-order function eliminating repetitive try-catch blocks in Express controllers.
 */
export const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

