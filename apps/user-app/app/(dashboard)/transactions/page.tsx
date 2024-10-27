"use client";
import { useState, useEffect } from "react";
import { P2pTransactions } from "../../../components/p2pTransaction";
import { Senttransactions,Receivedtransactions } from "../../lib/actions/transaction";

// Define transaction data structure
interface Transactions_data1 {
  timestamp: Date;
  amount: number;
  toUserId: number;
  toUser: {
    number: string;
}
}
interface Transactions_data2 {
  timestamp: Date;
  amount: number;
  fromUserId: number;
  toUser: {
    number: string;
}
}
export default function Money() {
  const [Senttransaction, setSentTransactions] = useState<Transactions_data1[]>([]);
  const [Receivedtransaction,setReceivedTransactions]=useState<Transactions_data2[]>([])
  useEffect(() => {
    async function fetchTransactions() {
      const Sent_data = await Senttransactions();
      setSentTransactions(Sent_data);
      const Received_data=await Receivedtransactions();
      setReceivedTransactions(Received_data);
    }

    fetchTransactions();
  }, []); // Empty dependency array to run once on component mount

  return (
  
      <P2pTransactions Sent_transactions={Senttransaction} Received_transactions={Receivedtransaction} >
      </P2pTransactions>
    
  );
}
