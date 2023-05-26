require("dotenv").config();

const connectDB= require("./db/connect")

const Product=require("./models/product")
 const product_JSON=require("./products.json");

const start=async ()=>{
    try{
        await connectDB(process.env.MONGODB_URL)
        await Product.deleteMany();
        await Product.create(product_JSON);
        console.log("success");
    }catch(err){
        console.log(err);
    }
}


start();