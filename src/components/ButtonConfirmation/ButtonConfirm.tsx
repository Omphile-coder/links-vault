import React from "react";

type Props = {
  message: string;
  type: "success" | "error";
};

export const Confirmation = ({ message, type }: Props) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "40px" /* Changed from bottom to top */,
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: type === "success" ? "#111111" : "#dc3545",
        color: "white",
        padding: "12px 24px",
        borderRadius: "30px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        zIndex: 2000,
        fontWeight: 600,
        animation:
          "slideDown 0.3s ease-out" /* Optional: rename if you add a CSS keyframe for sliding down */,
      }}
    >
      {message}
    </div>
  );
};
