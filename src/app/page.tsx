'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApps } from '@/store/AppContext';
import { AppData, categories } from '@/types/app';

export default function HomePage() {
  const { apps } = useApps();
  const [activeCategory, setActiveCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApps = apps.filter(app => {
    const matchCategory = activeCategory === '全部' || app.category === activeCategory;
    const matchSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       app.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="app-container">
      {/* 背景效果 */}
      <div className="bg-grid"></div>
      <div className="bg-glow"></div>

      {/* 头部 */}
      <header className="header">
        <div className="header-inner">
          <Link href="/" className="logo">
            <span className="logo-icon">◇</span>
            <span className="logo-text">APP SHOWCASE</span>
          </Link>
        </div>
      </header>

      {/* 主内容 */}
      <main className="main">
        {/* 搜索和筛选 */}
        <div className="filter-bar">
          <div className="search-box">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              placeholder="搜索应用..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="category-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                className={`tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* APP列表 */}
        <div className="app-grid">
          {filteredApps.map(app => (
            <AppCard key={app.id} app={app} />
          ))}
          {filteredApps.length === 0 && (
            <div className="empty-state">
              <span>暂无应用</span>
            </div>
          )}
        </div>
      </main>

      {/* 底部 */}
      <footer className="footer">
        <span>© 2024 AI 跳马 · 精选应用展示</span>
        <Link href="/admin" className="footer-admin">管理</Link>
      </footer>
    </div>
  );
}

function AppCard({ app }: { app: AppData }) {
  return (
    <Link href={`/app/${app.id}`} className="app-card">
      <div className="card-glow"></div>
      <div className="card-content">
        <div className="card-icon">{app.icon}</div>
        <div className="card-info">
          <h3 className="card-name">{app.name}</h3>
          <p className="card-desc">{app.shortDesc}</p>
          <div className="card-tags">
            {app.tags.slice(0, 2).map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
        <div className="card-arrow">→</div>
      </div>
    </Link>
  );
}
