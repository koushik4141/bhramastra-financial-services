"use client";
import React, { useState, useEffect } from "react";
import ConsultationModal from "./ConsultationModal";

export default function ConsultationManager() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#consultation") {
        setIsOpen(true);
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    };
    
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (link && link.getAttribute("href") === "#consultation") {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    
    document.addEventListener("click", handleClick);
    
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return <ConsultationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
