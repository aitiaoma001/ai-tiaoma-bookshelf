'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book, ExternalLink, LayoutElement, defaultBooks, defaultExternalLinks, defaultLayoutElements } from '@/types/study';

interface StudyContextType {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBook: (id: string, book: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  
  links: ExternalLink[];
  setLinks: React.Dispatch<React.SetStateAction<ExternalLink[]>>;
  addLink: (link: Omit<ExternalLink, 'id'>) => void;
  updateLink: (id: string, link: Partial<ExternalLink>) => void;
  deleteLink: (id: string) => void;
  
  layout: LayoutElement[];
  setLayout: React.Dispatch<React.SetStateAction<LayoutElement[]>>;
  updateLayoutElement: (id: string, element: Partial<LayoutElement>) => void;
  
  brandName: string;
  setBrandName: React.Dispatch<React.SetStateAction<string>>;
  brandSubtitle: string;
  setBrandSubtitle: React.Dispatch<React.SetStateAction<string>>;
  
  resetToDefault: () => void;
}

const StudyContext = createContext<StudyContextType | undefined>(undefined);

const STORAGE_KEY = 'study-room-data';

export function StudyProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>(defaultBooks);
  const [links, setLinks] = useState<ExternalLink[]>(defaultExternalLinks);
  const [layout, setLayout] = useState<LayoutElement[]>(defaultLayoutElements);
  const [brandName, setBrandName] = useState('AI 跳马');
  const [brandSubtitle, setBrandSubtitle] = useState('思维的栖息地');
  const [isLoaded, setIsLoaded] = useState(false);

  // 从 localStorage 加载数据
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.books) setBooks(data.books);
        if (data.links) setLinks(data.links);
        if (data.layout) setLayout(data.layout);
        if (data.brandName) setBrandName(data.brandName);
        if (data.brandSubtitle) setBrandSubtitle(data.brandSubtitle);
      } catch (e) {
        console.error('Failed to load saved data:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // 保存到 localStorage
  useEffect(() => {
    if (isLoaded) {
      const data = { books, links, layout, brandName, brandSubtitle };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [books, links, layout, brandName, brandSubtitle, isLoaded]);

  const addBook = (book: Omit<Book, 'id'>) => {
    const newBook = { ...book, id: `book-${Date.now()}` };
    setBooks(prev => [...prev, newBook]);
  };

  const updateBook = (id: string, book: Partial<Book>) => {
    setBooks(prev => prev.map(b => b.id === id ? { ...b, ...book } : b));
  };

  const deleteBook = (id: string) => {
    setBooks(prev => prev.filter(b => b.id !== id));
  };

  const addLink = (link: Omit<ExternalLink, 'id'>) => {
    const newLink = { ...link, id: `link-${Date.now()}` };
    setLinks(prev => [...prev, newLink]);
  };

  const updateLink = (id: string, link: Partial<ExternalLink>) => {
    setLinks(prev => prev.map(l => l.id === id ? { ...l, ...link } : l));
  };

  const deleteLink = (id: string) => {
    setLinks(prev => prev.filter(l => l.id !== id));
  };

  const updateLayoutElement = (id: string, element: Partial<LayoutElement>) => {
    setLayout(prev => prev.map(e => e.id === id ? { ...e, ...element } : e));
  };

  const resetToDefault = () => {
    setBooks(defaultBooks);
    setLinks(defaultExternalLinks);
    setLayout(defaultLayoutElements);
    setBrandName('AI 跳马');
    setBrandSubtitle('思维的栖息地');
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <StudyContext.Provider value={{
      books, setBooks, addBook, updateBook, deleteBook,
      links, setLinks, addLink, updateLink, deleteLink,
      layout, setLayout, updateLayoutElement,
      brandName, setBrandName,
      brandSubtitle, setBrandSubtitle,
      resetToDefault,
    }}>
      {children}
    </StudyContext.Provider>
  );
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (context === undefined) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
}
