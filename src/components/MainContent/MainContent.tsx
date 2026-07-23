import React from "react";
import styles from "./MainContent.module.css";
import { LinkItem } from "../../App";
import imageIcon from "../../assets/Robot-Image.png";

type Props = {
  links: LinkItem[];
  onOpenAdd: () => void;
  onDelete: (id: string) => void;
  onEdit: (link: LinkItem) => void;
};

export const MainContent = ({ links, onOpenAdd, onDelete, onEdit }: Props) => {
  return (
    <main className={styles.mainContainer}>
      <div className={styles.leftColumn}>
        <div className={styles.headerRow}>
          <h2>My Vault</h2>
          <button className={styles.addBtn} onClick={onOpenAdd}>
            AddLink
          </button>
        </div>

        <div className={styles.linksList}>
          {links.length === 0 ? (
            <p className={styles.empty}>
              No links saved yet. Click "Add New Link" to start your vault!
            </p>
          ) : (
            links.map((link) => (
              <div key={link.id} className={styles.linkCard}>
                <h3>{link.title}</h3>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.url}
                </a>
                <p>{link.description}</p>
                {link.tags && <span className={styles.tag}>{link.tags}</span>}
                <div className={styles.cardActions}>
                  <button
                    className={styles.actionBtn}
                    onClick={() => onEdit(link)}
                  >
                    Edit
                  </button>

                  <button
                    className={styles.actionBtn}
                    onClick={() => onDelete(link.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.imageWrapper}>
            <img
              src={imageIcon}
              alt="AI bookmark Picture"
              className={styles.heroImage}
            />
          </div>
        </div>
      </div>
    </main>
  );
};
