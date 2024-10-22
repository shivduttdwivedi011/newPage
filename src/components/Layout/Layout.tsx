import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl">User Profile Dashboard</h1>
      </header>
      <main className="flex-grow p-5">{children}</main>
    </div>
  );
};

export default Layout;
