import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        startTime: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status: string,
        provider: string
    }[]
}) => {console.log(transactions);
    if (!transactions.length) {
        console.log("hi");
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">

                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                    {t.status === "Success"? "Received INR": t.status === "Processing"?"Processing transaction":"Failed"}

         
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.startTime.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    + Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}