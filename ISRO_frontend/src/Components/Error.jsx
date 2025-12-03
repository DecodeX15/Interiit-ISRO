import { Link } from "react-router-dom";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-900  text-white px-4">
      <div className="max-w-md text-center">
        <div className="flex items-center justify-center mb-6">
          <AlertTriangle size={60} className="text-red-500 drop-shadow-lg" />
        </div>

        <h1 className="text-4xl font-semibold mb-3">Something went wrong</h1>

        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          The page you are trying to access is unavailable, or an unexpected
          error occurred. Please try again or return to the homepage.
        </p>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 rounded-xl bg-blue-600 cursor-pointer hover:bg-blue-700 transition flex items-center gap-2"
          >
            <RefreshCcw size={16} />
            Reload
          </button>

          <Link
            to="/"
            className="px-5 py-2 rounded-xl border cursor-pointer border-gray-700 hover:bg-gray-800 transition"
          >
            Go Home
          </Link>
        </div>
      </div>

      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-3 h-3 bg-white/10 rounded-full blur-xl top-20 left-1/4"></div>
        <div className="absolute w-4 h-4 bg-blue-500/10 rounded-full blur-xl bottom-32 right-1/3"></div>
        <div className="absolute w-2 h-2 bg-blue-300/10 rounded-full blur-lg top-1/2 right-20"></div>
      </div>
    </div>
  );
}
