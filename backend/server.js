import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser' ;
import userRouter from './routes/userRouter.js';
import productRoutes from './routes/productRoutes.js'
import orderRouter from './routes/orderRouter.js';
import dotenv from 'dotenv';
import { isAuth } from './utils.js';
import expressAsyncHandler from 'express-async-handler';
import uploadRouter from './routes/uploadRouter.js'
import path from 'path'
import Coupon from './models/couponModel.js';
dotenv.config();


const app = express();
app.use(bodyParser.json())

mongoose.connect("mongodb+srv://ashar1:ashar1@cluster0.ybb8j.mongodb.net/amazonaDB?retryWrites=true&w=majority" , {
        useNewUrlParser : true ,
        useCreateIndex : true ,
        useUnifiedTopology : true } , 
        ()=>{console.log("connected to the DB")}
)



 
 
app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
        res.status(500).send({ message: err.message });
});
// const __dirname = path.resolve();
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));



app.get("/api/orders", async (req, res) => {
        const orders = await Order.find({});
        res.send(orders);
});

app.delete("/api/orders/:id", async (req, res) => {
        const order = await Order.findByIdAndDelete(req.params.id);
        res.send(order);
});
      











const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));


        