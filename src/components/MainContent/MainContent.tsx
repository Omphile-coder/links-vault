import React from "react";
import styles from "./MainContent.module.css";
import type { LinkItem } from "../../App";

import imageIcon from "../../assets/Robot-Image.png";
import imageLogo from "../../assets/Logo.jpg";
type Props = {
  links: LinkItem[];
  onOpenAdd: () => void;
  onDelete: (id: string) => void;
  onEdit: (link: LinkItem) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export const MainContent = ({
  links,
  onOpenAdd,
  onDelete,
  onEdit,
  searchQuery,
  setSearchQuery,
}: Props) => {
  return (
    <main className={styles.mainContainer}>
      <div className={styles.leftColumn}>
        <div className={styles.headerRow}>
          <img src={imageLogo} alt="Bookmark logo" className={styles.logo} />
          <h2>Link Custodian</h2>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search tags, titles, links..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button className={styles.addBtn} onClick={onOpenAdd}>
            Add New Link
          </button>
        </div>

        <div className={styles.linksList}>
          {links.length === 0 ? (
            <p className={styles.emptyState}>
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
      </div>

      {/* <div className={styles.rightColumn}>
        <div className={styles.imageWrapper}>
          <img
            src={imageIcon}
            alt="AI Interface"
            className={styles.heroImage}
          />
        </div>
      </div> */}
    </main>
  );
};
