const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  console.log(err);

  let error = { ...err };

  error.message = err.message;

  if (err.name === "CastError") {
    const message = "Resourse not found";
    error = new ErrorResponse(message, 404);
  }

  if (err.code === 11000) {
    const message = "duplicste field value entered";
    error = new ErrorResponse(message, 404);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((error) => error.message)
      .join(",");
    error = new ErrorResponse(message, 404);
  }

  //add more check later

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "server error",
  });
};

module.exports = errorHandler;
