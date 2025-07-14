import React from 'react';

const Skeleton = () => {
  return (
    <div className="space-y-4 px-4 md:px-0 max-w-md mx-auto">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="animate-pulse p-4 border border-gray-300 rounded-xl shadow bg-white space-y-3"
        >
          {/* Full name and phone */}
          <div className="flex justify-between items-center">
            <div className="h-4 w-2/3 bg-gray-300 rounded" />
            <div className="h-4 w-1/4 bg-gray-300 rounded" />
          </div>

          {/* Address line 1 */}
          <div className="h-4 w-full bg-gray-300 rounded" />

          {/* Address line 2 */}
          <div className="h-4 w-5/6 bg-gray-300 rounded" />

          {/* City, State, ZIP */}
          <div className="flex gap-3">
            <div className="h-4 w-1/3 bg-gray-300 rounded" />
            <div className="h-4 w-1/4 bg-gray-300 rounded" />
            <div className="h-4 w-1/5 bg-gray-300 rounded" />
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2 mt-2">
            <div className="h-8 w-8 bg-gray-300 rounded-full" />
            <div className="h-8 w-8 bg-gray-300 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
