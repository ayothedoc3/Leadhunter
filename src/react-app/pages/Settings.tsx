import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import SettingsPanel from "@/react-app/components/SettingsPanel";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
        
        <SettingsPanel />
      </div>
    </div>
  );
}