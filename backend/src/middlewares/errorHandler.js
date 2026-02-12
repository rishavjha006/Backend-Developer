const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  console.error(err.message, err.stack);

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  } else {
    res.status(err.statusCode).json({
      success: false,
      message: err.isOperational ? err.message : 'Something went wrong',
      error: err.isOperational ? err.message : 'Internal server error',
    });
  }
};

export default errorHandler;
