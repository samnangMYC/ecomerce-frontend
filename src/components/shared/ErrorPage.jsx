import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ErrorPage = ({ message }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center space-y-4">
        <div className="flex justify-center">
          <AlertTriangle className="w-12 h-12 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Something went wrong</h1>
        <p className="text-gray-500">
          {message ? message : "An unexpected error has occurred. Please try again later."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 inline-block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
