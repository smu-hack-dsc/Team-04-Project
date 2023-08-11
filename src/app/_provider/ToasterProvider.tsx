"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        className: "",
        duration: 5000,
        style: {
          background: "#000",
          color: "#fff",
        },
      }}
    />
  );
};

export default ToasterProvider;
