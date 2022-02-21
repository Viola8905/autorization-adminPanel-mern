const asyncHandler = (controllerFunction) => (req, res, next) =>
  Promise.resolve(controllerFunction(req, res, next)).catch(next);

module.exports = asyncHandler;
