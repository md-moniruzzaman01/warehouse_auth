import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';


     const app: Application = express();

app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response) => {
//   throw new Error('Testing Error logger')
res.send("Testing");
})


//global error handler
// app.use(globalErrorHandler);


//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
      success: false,
      message: 'Not Found',
      errorMessages: [
        {
          path: req.originalUrl,
          message: 'API Not Found',
        },
      ],
    });
    next();
  });
  
  export default app;