import React from "react";

type Props = {
  message: string;
  type: "success" | "error";
};

export const Confirmation = ({ message, type }: Props) => {
  return (
    <>
      <style>
        {`
          @keyframes slideDown {
            from { opacity: 0; transform: translate(-50%, -20px); }
            to { opacity: 1; transform: translate(-50%, 0); }
          }
        `}
      </style>
      <div
        style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: type === "success" ? "#111111" : "#dc3545",
          color: "white",
          padding: "12px 24px",
          borderRadius: "30px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          zIndex: 9999,
          fontWeight: 600,
          animation: "slideDown 0.3s ease-out",
        }}
      >
        {message}
      </div>
    </>
  );
};
