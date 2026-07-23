import React, { useState } from "react";
import styles from "./AddModal.module.css";
import type { LinkItem } from "../../App";

type Props = {
  onClose: () => void;
  onSubmit: (link: LinkItem) => void;
  linkToEdit: LinkItem | null;
};

export const AddModal = ({ onClose, onSubmit, linkToEdit }: Props) => {
  const [title, setTitle] = useState(linkToEdit ? linkToEdit.title : "");
  const [url, setUrl] = useState(linkToEdit ? linkToEdit.url : "");
  const [description, setDescription] = useState(
    linkToEdit ? linkToEdit.description : "",
  );
  const [tags, setTags] = useState(linkToEdit?.tags ? linkToEdit.tags : "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !url.trim()) {
      alert("Please provide at least a title and a URL.");
      return;
    }

    const submittedLink: LinkItem = {
      id: linkToEdit ? linkToEdit.id : Date.now().toString(),
      title,
      url,
      description,
      tags,
    };

    onSubmit(submittedLink);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{linkToEdit ? "Edit Link" : "Add New Link"}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g.,Sheep stealer"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Link (URL)</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this link about?"
              rows={3}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Tags (Optional)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., #DeadlinesAreSoStressFUl"
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            {linkToEdit ? "Save Changes" : "Save to Vault"}
          </button>
        </form>
      </div>
    </div>
  );
};
