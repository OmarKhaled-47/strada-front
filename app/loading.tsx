import { Loader2 } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F8F8]">
      <div className="text-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#003344] mx-auto mb-4" />
        <p className="text-[#003344] font-medium">
          Loading contact information...
        </p>
      </div>
    </div>
  );
};

export default loading;
