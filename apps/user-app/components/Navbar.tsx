// components/Navbar.tsx
export  function Navbar() {
    return (
        <nav className="w-full bg-white shadow p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold text-blue-600">WalletApp</div>
                <div>
                    <a href="#" className="text-gray-600 hover:text-blue-600 mx-2">Home</a>
                    <a href="#" className="text-gray-600 hover:text-blue-600 mx-2">Features</a>
                    <a href="#" className="text-gray-600 hover:text-blue-600 mx-2">Contact</a>
                </div>
            </div>
        </nav>
    );
}
