import express from "express"
import cors from "cors"

import "dotenv/config"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import paymentRouter from "./routes/paymentRoute.js"
import historyRouter from './routes/historyRoute.js'
import videoProgressRouter from './routes/videoProgressRoute.js'


// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()


// Middlewares
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/user',userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/payment', paymentRouter);
app.use('/api/history', historyRouter);
app.use('/api/progress', videoProgressRouter);

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=> console.log("Server started on PORT : "+ port))