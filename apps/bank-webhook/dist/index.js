"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("@repo/db/client"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 3003;
app.get('/', function (req, res) {
    res.json({ message: "Hello" });
});
app.get("/hdfcWebhook", function (req, res) {
    console.log("hi from bank webhook");
    res.json({ message: "Hello from webhook" });
});
app.post("/hdfcWebhook", async function (req, res) {
    //TODO: Add zod validation here?
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.amount,
        status: req.body.status
    };
    console.log("Received request body:", req.body);
    try {
        //Below we used batch transaction, these are concurrent transaction they execute parallely  Use them when you want to run multiple queries in parallel, without needing the result of one query for another query.
        if (paymentInformation.status) {
            console.log("inside status true");
            await client_1.default.$transaction([
                client_1.default.balance.update({
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
                client_1.default.onRampTransaction.update({
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
            });
        }
        else {
            console.log("inside status false");
            const data = await client_1.default.onRampTransaction.update({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "Failure",
                }
            });
            console.log(data);
            res.json({ message: "transaction failed" });
        }
    }
    catch (e) {
        console.error(e);
        res.json({
            message: "Error while processing webhook"
        });
    }
});
app.listen(port, function () {
    console.log("server is on port 3003");
});
