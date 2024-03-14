
let mode = 'dev'

export const globalError=(err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (mode == "prod") {
  res.status(err.statusCode).json({ success: false, result: err.message });
    
  } else {
  res.status(err.statusCode).json({ success: false, result: err.message, stack: err.stack });
  
  }
  
};