
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
      res.status(500).send({
        success: false,
        message: "Some error occurred",
        err,
      });
    } else {
      // Handle cases where `next` was called without an error
      next();
    }
  };
  

export default errorMiddleware;