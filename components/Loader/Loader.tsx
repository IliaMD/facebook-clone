import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center ">
      <ClipLoader
        color="#3482F6"
        cssOverride={{}}
        loading
        size={130}
        speedMultiplier={0.7}
      />
    </div>
  );
};
