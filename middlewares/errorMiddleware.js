
// const errorMiddleware = (err,req,res,next) =>{
//     console.log(err);
//     res.status(500).send({
//         success: false,
//         message:"some error occured",
//         err,
//     });
// };

const errorMiddleware = (err, req, res, next) => {
    if (err) {
      console.log(err);
      const defaultErrors ={
        statusCode: 500,
        message: err,
      }

      if (err.name === "ValidationError") {
        defaultErrors.statusCode = 400;
        defaultErrors.message = Object.values(err.errors)
          .map((item) => item.message)
          .join(",");
      }

      res.status(defaultErrors.statusCode).json({ message: defaultErrors.message });

    //   res.status(500).send({
    //     success: false,
    //     message: "Some error occurred",
    //     err,
    //   });
    } else {
      // Handle cases where `next` was called without an error
      next();
    }
  };
  

export default errorMiddleware;