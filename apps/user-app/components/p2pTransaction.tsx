import { Card } from "@repo/ui/card";
import { p2pTransfer } from "../app/lib/actions/p2ptransfer";

interface transaction_data{
   Sent_transactions:{ timestamp: Date;
    amount: number;
    toUserId:number;
    toUser: {
        number: string;
    }
}[],
Received_transactions:{ timestamp: Date;
    amount: number;
   fromUserId:number;
    toUser: {
        number: string;
    }
}[]
}
// 
export function P2pTransactions({ Sent_transactions,Received_transactions }: transaction_data) {
    return (
      <div className="flex justify-between gap-5">
        <Card title="Recent Sent Transactions">
          <div className="pt-2">
            {Sent_transactions.map((t, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <div className="text-sm">Sent INR</div>
                  <div className="text-slate-600 text-xs">{t.toUser.number}</div>
                  <div className="text-slate-600 text-xs">{t.timestamp.toDateString()}</div>
                </div>
                <div className="flex flex-col justify-center">+ Rs {t.amount}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Recent Received Transactions">
          <div className="pt-2">
            {Received_transactions.map((t, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <div className="text-sm">Received INR</div>
                  <div className="text-slate-600 text-xs">{t.toUser.number}</div>
                  <div className="text-slate-600 text-xs">{t.timestamp.toDateString()}</div>
                </div>
                <div className="flex flex-col justify-center">+ Rs {t.amount}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }
  