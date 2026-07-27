import React from "react";
import styles from "./Confirmation.module.css";

type Props = {
  message: string;
  type: "success" | "error";
};

export const Confirmation = ({ message, type }: Props) => {
  return (
    <div
      className={`${styles.notification} ${
        type === "success" ? styles.success : styles.error
      }`}
    >
      {message}
    </div>
  );
};
