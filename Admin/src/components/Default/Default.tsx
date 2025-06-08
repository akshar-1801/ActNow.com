import React from "react";

export default function Default() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h2 className="text-3xl font-bold text-green-900 mb-4">
        Welcome to the Admin Dashboard
      </h2>
      <p className="text-gray-600 text-lg text-center max-w-xl">
        Use the sidebar to navigate and manage projects, users, and more. This
        is your central hub for all admin activities.
      </p>
    </div>
  );
}
