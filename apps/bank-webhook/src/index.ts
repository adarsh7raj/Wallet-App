
//import db from "@repo/db/client";
import { PrismaClient } from '@prisma/client'
import express, { Request, Response } from 'express';
import cors from "cors"
const app = express();
app.use(cors({
    origin: "https://wallet-app-hdfc-bank-adarsh7rajs-projects.vercel.app", // Replace with your frontend's URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
credentials:true
}));
app.use(express.json());
const port =process.env.PORT||3003
app.get('/',function(req,res){
    res.json({message:"Hello"});
})
app.get("/hdfcWebhook", function(req:Request,res:Response){
    console.log("hi from bank webhook")
    res.json({message:"Hello from webhook"})
})
app.post("/hdfcWebhook", async function(req:Request, res:Response)  {
    //TODO: Add zod validation here?
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    const db=new PrismaClient();
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
        status:boolean
    } = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.amount,
        status:req.body.status
    };
    console.log("Received request body:", req.body);

    try {
        //Below we used batch transaction, these are concurrent transaction they execute parallely  Use them when you want to run multiple queries in parallel, without needing the result of one query for another query.
        if(paymentInformation.status){
            console.log("inside status true");
 await db.$transaction([

            db.balance.update({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
        
            db.onRampTransaction.update({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);
        
       

        res.json({
            message: "transaction successfull"
        })
    }
    else{
        console.log("inside status false");

       const data=await db.onRampTransaction.update({
            where: {
                token: paymentInformation.token
            }, 
            data: {
                status: "Failure",
            }
        });
        console.log(data);
        res.json({message:"transaction failed"})
    }
    } catch(e) {
        console.error(e);
        res.json({
            message: "Error while processing webhook"
        })
    }

})

app.listen(port ,function(){
    console.log("server is on port 3003")
});