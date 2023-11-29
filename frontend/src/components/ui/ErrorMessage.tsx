import React from "react";

type ErrorT = {
  children: React.ReactNode
};

const ErrorMessage = ({children}:ErrorT) => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {children}
    </div>
  );
};

export default ErrorMessage;
