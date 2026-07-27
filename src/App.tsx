import { useEffect, useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { MainContent } from "./components/MainContent/MainContent";
import { AddModal } from "./components/AddOverlayModal/AddModal";
import { ContentContainer } from "./components/ContentContainer/ContentContainer";
import { Confirmation } from "./components/Confirmation/Confirmation";
import { ButtonConfirm } from "./components/ButtonConfirmation/ButtonConfirm";

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description: string;
  tags?: string;
}

function App() {
  const [links, setLinks] = useState<LinkItem[]>(() => {
    const savedLinks = localStorage.getItem("vaultLinks");
    if (savedLinks) return JSON.parse(savedLinks);
    return [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [linkToEdit, setLinkToEdit] = useState<LinkItem | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    localStorage.setItem("vaultLinks", JSON.stringify(links));
  }, [links]);

  const showConfirmation = (message: string, type: "success" | "error") => {
    setConfirmation({ message, type });
    setTimeout(() => {
      setConfirmation(null);
    }, 3000);
  };

  const handleSaveLink = (submittedLink: LinkItem) => {
    if (linkToEdit) {
      setLinks(
        links.map((link) =>
          link.id === submittedLink.id ? submittedLink : link,
        ),
      );
      showConfirmation("Link updated successfully!", "success");
    } else {
      setLinks([...links, submittedLink]);
      showConfirmation("Link saved successfully!", "success");
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setLinkToEdit(null);
  };

  const handleDeleteLink = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    setLinks(links.filter((link) => link.id !== deleteId));
    showConfirmation("Link deleted successfully!", "success");
    setDeleteId(null);
  };

  const openAddModal = () => {
    setLinkToEdit(null);
    setIsModalOpen(true);
  };

  const openEditModal = (link: LinkItem) => {
    setLinkToEdit(link);
    setIsModalOpen(true);
  };

  const filteredLinks = links.filter((link) => {
    const query = searchQuery.toLowerCase();
    const tagsMatch = link.tags
      ? link.tags.toLowerCase().includes(query)
      : false;

    return (
      link.title.toLowerCase().includes(query) ||
      link.url.toLowerCase().includes(query) ||
      link.description.toLowerCase().includes(query) ||
      tagsMatch
    );
  });

  return (
    <ContentContainer>
      <div className="app-wrapper" style={{ fontFamily: "sans-serif" }}>
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenAdd={openAddModal}
        />

        <MainContent
          links={filteredLinks}
          onOpenAdd={openAddModal}
          onDelete={handleDeleteLink}
          onEdit={openEditModal}
          searchQuery={searchQuery}
        />

        {isModalOpen && (
          <AddModal
            onClose={closeModal}
            onSubmit={handleSaveLink}
            linkToEdit={linkToEdit}
          />
        )}

        {deleteId && (
          <ButtonConfirm
            title="Delete Link"
            message="Are you sure you want to delete this link? This action cannot be undone."
            onConfirm={confirmDelete}
            onCancel={() => setDeleteId(null)}
          />
        )}

        {confirmation && (
          <Confirmation
            message={confirmation.message}
            type={confirmation.type}
          />
        )}
      </div>
    </ContentContainer>
  );
}

export default App;
