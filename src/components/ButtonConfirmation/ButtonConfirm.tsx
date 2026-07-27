import React from "react";
import styles from "../AddOverlayModal/AddModal.module.css";
import confirmStyles from "./ButtonConfirm.module.css";

type Props = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ButtonConfirm = ({
  title,
  message,
  onConfirm,
  onCancel,
}: Props) => {
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <button className={styles.closeBtn} onClick={onCancel}>
            &times;
          </button>
        </div>

        <p className={confirmStyles.message}>{message}</p>

        <div className={confirmStyles.buttonGroup}>
          <button onClick={onCancel} className={confirmStyles.cancelBtn}>
            Cancel
          </button>
          <button onClick={onConfirm} className={confirmStyles.deleteBtn}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
