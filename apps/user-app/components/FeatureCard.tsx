// components/FeatureCard.tsx
interface FeatureCardProps {
    title: string;
    description: string;
    buttonText: string;
}

export  function FeatureCard({ title, description, buttonText }: FeatureCardProps) {
    return (
        <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <p className="text-gray-600 mt-2">{description}</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">{buttonText}</button>
        </div>
    );
}
