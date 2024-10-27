// pages/index.tsx
import {Navbar} from "../../components/Navbar";
import {FeatureCard} from "../../components/FeatureCard";
import {AuthButtons} from "../../components/AuthButtons"

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100">
        <Navbar></Navbar>
            <header className="flex flex-col items-center justify-center pt-20 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Your Wallet App</h1>
                <p className="text-lg text-gray-600 mb-10">Securely manage your finances, make transfers, and more.</p>
                <AuthButtons />
            </header>
            <main className="flex flex-col items-center space-y-8 mt-16">
                <FeatureCard
                    title="P2P Transfer"
                    description="Send money to friends and family instantly."
                    buttonText="Get Started"
                />
                <FeatureCard
                    title="Bank Transfer"
                    description="Securely transfer funds to your bank account."
                    buttonText="Transfer Now"
                />
            </main>
        </div>
    );
}
