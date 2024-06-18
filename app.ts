import express,{ Express } from "express";
import {PORT} from './config/env.config';
import connectDb from './config//db.config';
import studentRoutes from './routes/student.routes';
import testRoutes from './routes/test.routes'; 
const app: Express = express();

app.use(express.json());
connectDb();
app.use('/student',studentRoutes);
app.use('/test',testRoutes);  

app.listen(PORT, ():void=> {
  console.log(`Server is running on port ${PORT}`);
});