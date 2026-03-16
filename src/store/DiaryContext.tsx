'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Diary, defaultDiaries } from '@/types/diary';

interface DiaryContextType {
  diaries: Diary[];
  addDiary: (diary: Omit<Diary, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateDiary: (id: string, diary: Partial<Diary>) => void;
  deleteDiary: (id: string) => void;
}

const DiaryContext = createContext<DiaryContextType | undefined>(undefined);
const STORAGE_KEY = 'diary-data';

export function DiaryProvider({ children }: { children: ReactNode }) {
  const [diaries, setDiaries] = useState<Diary[]>(defaultDiaries);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.diaries) setDiaries(data.diaries);
      } catch (e) {
        console.error('Failed to load diary data:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ diaries }));
    }
  }, [diaries, isLoaded]);

  const addDiary = (diary: Omit<Diary, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = Date.now();
    const newDiary: Diary = {
      ...diary,
      id: `d-${now}`,
      createdAt: now,
      updatedAt: now
    };
    setDiaries(prev => [newDiary, ...prev]);
  };

  const updateDiary = (id: string, diary: Partial<Diary>) => {
    setDiaries(prev => prev.map(d => 
      d.id === id ? { ...d, ...diary, updatedAt: Date.now() } : d
    ));
  };

  const deleteDiary = (id: string) => {
    setDiaries(prev => prev.filter(d => d.id !== id));
  };

  return (
    <DiaryContext.Provider value={{ diaries, addDiary, updateDiary, deleteDiary }}>
      {children}
    </DiaryContext.Provider>
  );
}

export function useDiary() {
  const context = useContext(DiaryContext);
  if (context === undefined) {
    throw new Error('useDiary must be used within a DiaryProvider');
  }
  return context;
}
