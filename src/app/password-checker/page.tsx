import React from 'react';
import PasswordStrengthContainer from '../components/PasswordContainer/PasswordContainer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            AI-Powered Password Strength Checker
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Test your password security with advanced AI analysis
          </p>
        </div>

        <div className="mt-10">
          <PasswordStrengthContainer />
        </div>
      </div>
    </div>
  );
}
