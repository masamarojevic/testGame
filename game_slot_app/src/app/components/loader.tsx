import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="absolute top-full mt-2 flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-pink-500 border-b-pink-500"></div>
    </div>
  );
};

export default Loader;
