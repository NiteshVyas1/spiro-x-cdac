import express from "express"
import cors from "cors"
import connectDB from "./config/mongodb.js"


// App Config

const app = express()
const port = 8000
connectDB()

// Middlewares
app.use(express.json())
app.use(cors())

// //Api EndPoints
// app.use('/api/user', userRouter)
// app.use('/api/product', productRouter)
// app.use('/api/cart', cartRouter)
// app.use('/api/order', orderRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=> console.log("Server started on PORT : "+ port))