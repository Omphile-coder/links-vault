import React from "react";
import styles from "./MainContent.module.css";
import type { LinkItem } from "../../App";
import imageIcon from "../../assets/Robot-Image.png";
import emptyImg from "../../assets/notFound.jpg";
import "bootstrap-icons/font/bootstrap-icons.css";

type Props = {
  links: LinkItem[];
  onDelete: (id: string) => void;
  onEdit: (link: LinkItem) => void;
  onOpenAdd: () => void;
};

export const MainContent = ({ links, onDelete, onEdit, onOpenAdd }: Props) => {
  return (
    <main className={styles.mainContainer}>
      <div className={styles.content}>
        <div className={styles.headerRow}>
          <h2>
            Your Bookmarks <i className="bi bi-bookmark-heart-fill"></i>
          </h2>
        </div>

        <div className={styles.linksList}>
          {links.length === 0 ? (
            <div className={styles.emptyState}>
              <img
                src={emptyImg}
                alt="No links found"
                className={styles.emptyImage}
              />
              <p>
                No links saved yet. Click "Add New Link" to start your vault!
              </p>
              <p>
                <button className={styles.addBtn} onClick={onOpenAdd}>
                  Add New Link
                </button>
              </p>
            </div>
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
      </div>
    </main>
  );
};
