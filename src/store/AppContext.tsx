'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppData, Comment, defaultApps, defaultComments } from '@/types/app';

interface AppContextType {
  apps: AppData[];
  comments: Comment[];
  addApp: (app: Omit<AppData, 'id' | 'createdAt'>) => void;
  updateApp: (id: string, app: Partial<AppData>) => void;
  deleteApp: (id: string) => void;
  addComment: (comment: Omit<Comment, 'id' | 'createdAt'>) => void;
  deleteComment: (id: string) => void;
  getAppComments: (appId: string) => Comment[];
  resetToDefault: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
const STORAGE_KEY = 'app-showcase-data';
const AUTH_KEY = 'admin_authenticated';
const ADMIN_PASSWORD = 'tiaoma2024';

export function AppProvider({ children }: { children: ReactNode }) {
  const [apps, setApps] = useState<AppData[]>(defaultApps);
  const [comments, setComments] = useState<Comment[]>(defaultComments);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.apps) setApps(data.apps);
        if (data.comments) setComments(data.comments);
      } catch (e) {
        console.error('Failed to load saved data:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ apps, comments }));
    }
  }, [apps, comments, isLoaded]);

  const addApp = (app: Omit<AppData, 'id' | 'createdAt'>) => {
    const newApp: AppData = {
      ...app,
      id: `app-${Date.now()}`,
      createdAt: Date.now()
    };
    setApps(prev => [...prev, newApp]);
  };

  const updateApp = (id: string, app: Partial<AppData>) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, ...app } : a));
  };

  const deleteApp = (id: string) => {
    setApps(prev => prev.filter(a => a.id !== id));
    setComments(prev => prev.filter(c => c.appId !== id));
  };

  const addComment = (comment: Omit<Comment, 'id' | 'createdAt'>) => {
    const newComment: Comment = {
      ...comment,
      id: `c-${Date.now()}`,
      createdAt: Date.now()
    };
    setComments(prev => [...prev, newComment]);
  };

  const deleteComment = (id: string) => {
    setComments(prev => prev.filter(c => c.id !== id));
  };

  const getAppComments = (appId: string) => {
    return comments.filter(c => c.appId === appId).sort((a, b) => b.createdAt - a.createdAt);
  };

  const resetToDefault = () => {
    setApps(defaultApps);
    setComments(defaultComments);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AppContext.Provider value={{
      apps, comments, addApp, updateApp, deleteApp,
      addComment, deleteComment, getAppComments, resetToDefault
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApps() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApps must be used within an AppProvider');
  }
  return context;
}

// 认证相关
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = sessionStorage.getItem(AUTH_KEY);
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, isLoading, login, logout };
}
