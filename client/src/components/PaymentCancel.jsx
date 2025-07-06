import { Link } from "react-router-dom";

export default function PaymentCancel() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4">Payment Cancelled</h1>
      <p className="text-xl mb-6">No worries—your card wasn’t charged.</p>

      <div className="flex gap-4">
        <Link
          to="/pricing"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
        >
          Try Again
        </Link>
        <Link
          to="/"
          className="bg-gray-700 hover:bg-gray-800 px-6 py-3 rounded-xl"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}
