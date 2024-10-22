import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
      <p className="text-lg">This page displays user information and is protected for authenticated users only.</p>
    </div>
  );
};

export default DashboardPage;
