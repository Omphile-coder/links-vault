import { useEffect, useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { MainContent } from "./components/MainContent/MainContent";
import { AddModal } from "./components/AddOverlayModal/AddModal";

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description: string;
  tags?: string;
}

function App() {
  const [count, setCount] = useState(0);
  const [links, setLinks] = useState<LinkItem[]>(() => {
    const savedLinks = localStorage.getItem("vaultLinks");
    if (savedLinks) return JSON.parse(savedLinks);
    return [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [linkToEdit, setLinkToEdit] = useState<LinkItem | null>(null);

  useEffect(() => {
    localStorage.setItem("vaultLinks", JSON.stringify(links));
  }, [links]);

  //Functions

  const handleSaveLink = (submittedLink: LinkItem) => {
    if (linkToEdit) {
      setLinks(
        links.map((link) =>
          link.id === submittedLink.id ? submittedLink : link,
        ),
      );
    } else {
      setLinks([...links, submittedLink]);
    }

    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setLinkToEdit(null);
  };

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id));
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
    <div style={{ paddingTop: "80px", fontFamily: "sans-serif" }}>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onOpenAdd={openAddModal}/>

      <MainContent
        links={filteredLinks}
        onOpenAdd={openAddModal}
        onDelete={handleDeleteLink}
        onEdit={openEditModal}
      />

      {isModalOpen && (
        <AddModal
          onClose={closeModal}
          onSubmit={handleSaveLink}
          linkToEdit={linkToEdit}
        />
      )}
    </div>
  );
}

export default App;
