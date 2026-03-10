'use client';

import React, { useState } from 'react';

// 书籍数据类型
interface Book {
  id: string;
  title: string;
  link: string;
  color: string; // 书籍封面颜色
}

// 壁炉链接数据类型
interface FireplaceLink {
  id: string;
  title: string;
  url: string;
  icon?: string;
}

// 默认数据
const defaultBooks: Book[] = [
  { id: '1', title: '人生哲学', link: '/philosophy', color: '#8B4513' },
  { id: '2', title: '创业笔记', link: '/startup', color: '#A0522D' },
  { id: '3', title: '技术手册', link: '/tech', color: '#654321' },
  { id: '4', title: '诗词集', link: '/poetry', color: '#5D3A1A' },
  { id: '5', title: '投资理财', link: '/finance', color: '#704214' },
  { id: '6', title: '健康生活', link: '/health', color: '#8B7355' },
];

const defaultFireplaceLinks: FireplaceLink[] = [
  { id: 'f1', title: 'GitHub', url: 'https://github.com', icon: '💻' },
  { id: 'f2', title: '博客', url: 'https://blog.example.com', icon: '📝' },
  { id: 'f3', title: '作品集', url: 'https://portfolio.example.com', icon: '🎨' },
  { id: 'f4', title: '联系方式', url: 'mailto:hello@example.com', icon: '✉️' },
];

export default function StudyRoom() {
  const [hoveredBook, setHoveredBook] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [lampOn, setLampOn] = useState(true);

  return (
    <div className="study-room">
      {/* 墙壁背景 */}
      <div className="wall">
        {/* 墙纸纹理 */}
        <div className="wallpaper-texture"></div>
        
        {/* 墙上的画 */}
        <div className="painting-frame">
          <div className="painting">
            <div className="painting-scene">
              {/* 一幅山水画 */}
              <svg viewBox="0 0 200 150" className="w-full h-full">
                {/* 天空 */}
                <rect fill="#2D1F0F" width="200" height="150"/>
                {/* 远山 */}
                <path d="M0,100 Q50,60 100,80 T200,70 L200,150 L0,150 Z" fill="#4A3520" opacity="0.6"/>
                <path d="M0,120 Q60,90 120,100 T200,95 L200,150 L0,150 Z" fill="#5D4A35" opacity="0.7"/>
                {/* 近山 */}
                <path d="M0,130 Q40,110 80,120 T160,115 L200,130 L200,150 L0,150 Z" fill="#6B5344"/>
                {/* 月亮 */}
                <circle cx="160" cy="40" r="15" fill="#D4A574" opacity="0.8"/>
                {/* 云 */}
                <ellipse cx="50" cy="50" rx="30" ry="10" fill="#4A3520" opacity="0.4"/>
              </svg>
            </div>
          </div>
        </div>

        {/* 壁炉 */}
        <div className="fireplace">
          {/* 壁炉架 */}
          <div className="fireplace-mantel"></div>
          {/* 壁炉开口 */}
          <div className="fireplace-opening">
            {/* 火焰 */}
            <div className="fire">
              <div className="flame flame-1"></div>
              <div className="flame flame-2"></div>
              <div className="flame flame-3"></div>
            </div>
            {/* 链接在火焰中 */}
            <div className="fireplace-links">
              {defaultFireplaceLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`fireplace-link ${hoveredLink === link.id ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredLink(link.id)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <span className="link-icon">{link.icon}</span>
                  <span className="link-title">{link.title}</span>
                </a>
              ))}
            </div>
          </div>
          {/* 壁炉底座 */}
          <div className="fireplace-base"></div>
        </div>
      </div>

      {/* 地板 */}
      <div className="floor">
        {/* 木地板纹理 */}
        <div className="floor-texture"></div>
        
        {/* 地毯 */}
        <div className="rug">
          <div className="rug-pattern"></div>
        </div>
      </div>

      {/* 左侧沙发 */}
      <div className="sofa">
        <div className="sofa-back"></div>
        <div className="sofa-seat"></div>
        <div className="sofa-arm sofa-arm-left"></div>
        <div className="sofa-arm sofa-arm-right"></div>
        <div className="sofa-legs"></div>
        {/* 沙发靠垫 */}
        <div className="cushion cushion-1"></div>
        <div className="cushion cushion-2"></div>
      </div>

      {/* 右侧桌子 */}
      <div className="table">
        <div className="table-top"></div>
        <div className="table-leg table-leg-left"></div>
        <div className="table-leg table-leg-right"></div>
      </div>

      {/* 台灯 */}
      <div className="lamp" onClick={() => setLampOn(!lampOn)}>
        <div className="lamp-shade"></div>
        <div className="lamp-stand"></div>
        <div className="lamp-base"></div>
        {lampOn && <div className="lamp-light"></div>}
      </div>

      {/* 小桌子上的跳马雕像 */}
      <div className="small-table">
        <div className="small-table-top"></div>
        <div className="small-table-leg"></div>
        {/* 跳马雕像 */}
        <div className="horse-statue">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* 马身体 */}
            <ellipse cx="50" cy="60" rx="25" ry="15" fill="#D4A574"/>
            {/* 马头 */}
            <ellipse cx="75" cy="40" rx="12" ry="20" fill="#D4A574" transform="rotate(-20 75 40)"/>
            {/* 马耳朵 */}
            <path d="M78,25 L82,15 L86,25 Z" fill="#D4A574"/>
            {/* 马腿 */}
            <rect x="35" y="70" width="6" height="25" fill="#C49A6C"/>
            <rect x="48" y="70" width="6" height="25" fill="#C49A6C"/>
            <rect x="55" y="70" width="6" height="25" fill="#C49A6C"/>
            {/* 马尾 */}
            <path d="M25,55 Q15,60 20,75" stroke="#8B7355" strokeWidth="4" fill="none"/>
            {/* 马鬃 */}
            <path d="M60,35 Q70,30 80,35" stroke="#8B7355" strokeWidth="3" fill="none"/>
            {/* 底座 */}
            <rect x="25" y="92" width="50" height="8" fill="#654321" rx="2"/>
          </svg>
        </div>
      </div>

      {/* 地上的书堆 */}
      <div className="book-stack-floor">
        {defaultBooks.slice(0, 3).map((book, index) => (
          <div
            key={book.id}
            className={`book-on-floor book-floor-${index + 1}`}
            style={{ backgroundColor: book.color }}
          >
            <a
              href={book.link}
              className="book-spine-link"
              onMouseEnter={() => setHoveredBook(book.id)}
              onMouseLeave={() => setHoveredBook(null)}
            >
              <span className="book-title-gold">{book.title}</span>
            </a>
          </div>
        ))}
      </div>

      {/* 桌子上的书 */}
      <div className="books-on-table">
        {defaultBooks.slice(3, 5).map((book, index) => (
          <div
            key={book.id}
            className={`book-on-table book-table-${index + 1}`}
            style={{ backgroundColor: book.color }}
          >
            <a
              href={book.link}
              className="book-spine-link"
              onMouseEnter={() => setHoveredBook(book.id)}
              onMouseLeave={() => setHoveredBook(null)}
            >
              <span className="book-title-gold">{book.title}</span>
            </a>
          </div>
        ))}
      </div>

      {/* 墙边书架 */}
      <div className="bookshelf-wall">
        <div className="shelf-bracket"></div>
        <div className="shelf-board"></div>
        <div className="shelf-books">
          {defaultBooks.map((book, index) => (
            <div
              key={book.id}
              className={`shelf-book ${hoveredBook === book.id ? 'hovered' : ''}`}
              style={{
                backgroundColor: book.color,
                height: `${60 + Math.random() * 30}px`,
                width: `${15 + Math.random() * 10}px`,
              }}
            >
              <a
                href={book.link}
                className="book-spine-link"
                onMouseEnter={() => setHoveredBook(book.id)}
                onMouseLeave={() => setHoveredBook(null)}
              >
                <span className="book-title-gold">{book.title}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 猫 */}
      <div className="cat">
        <div className="cat-body"></div>
        <div className="cat-head">
          <div className="cat-ear cat-ear-left"></div>
          <div className="cat-ear cat-ear-right"></div>
          <div className="cat-eye cat-eye-left"></div>
          <div className="cat-eye cat-eye-right"></div>
          <div className="cat-nose"></div>
        </div>
        <div className="cat-tail"></div>
        <div className="cat-paw cat-paw-left"></div>
        <div className="cat-paw cat-paw-right"></div>
      </div>

      {/* 品牌标识 */}
      <div className="brand">
        <span className="brand-text">AI 跳马</span>
        <span className="brand-subtitle">思维的栖息地</span>
      </div>

      {/* 灯光效果 */}
      {lampOn && <div className="lamp-glow"></div>}
    </div>
  );
}
