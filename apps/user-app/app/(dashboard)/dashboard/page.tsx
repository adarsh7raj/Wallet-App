import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return txns.map((t) => ({
    startTime: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function Dashboard() {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here is your account summary.</p>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Balance Card */}
        <div className="lg:col-span-1">
          <BalanceCard amount={balance.amount} locked={balance.locked} />
        </div>

       

        {/* Recent Transactions */}
        <div className="lg:col-span-3">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
          <OnRampTransactions transactions={transactions} />
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-12 text-center text-gray-500">
        <p>&copy; 2024 Wallet App. All rights reserved.</p>
      </footer>
    </div>
  );
}
