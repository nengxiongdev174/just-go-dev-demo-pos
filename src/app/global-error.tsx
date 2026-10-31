"use client";

import React from "react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="lo">
      <body className="min-h-screen flex items-center justify-center p-6 bg-slate-50 text-slate-900">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold">Something went wrong</h2>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

