import React from "react";
import imageIcon from "../../assets/GlassBookMark.png";
import styles from "./Navbar.module.css";

type NavbarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenAdd: () => void;
};

export const Navbar = ({
  searchQuery,
  setSearchQuery,
  onOpenAdd,
}: NavbarProps) => {
  return (
    <nav>
      <div className={styles.navContainer}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <img src={imageIcon} alt="Bookmark logo" className={styles.logo} />
            <h1 className={styles.title}> Links Custodian</h1>
          </div>

          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search tags, titles, links..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.addContainer}>
            <button className={styles.addBtn} onClick={onOpenAdd}>
              Add New Link
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
