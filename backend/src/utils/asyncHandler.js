// promiss method-01;
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise
      .resolve(requestHandler(req, res, next))
      .catch((err) => next(err));
  }
};

export { asyncHandler };

// example
// const asyncHandler = () => {};
// const asyncHandler = (func) => { () => {}}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async() => {}

// try-catch method-02;
// const asyncHandler = (requestHandler) => async (req, res, next) => {
//   try {
//     await requestHandler(req, res, next);
//   } catch (error) {
//     res.status(error.code || 500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// };

// export { asyncHandler };

