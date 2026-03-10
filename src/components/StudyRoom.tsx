'use client';

import React, { useState, useEffect } from 'react';

// 书籍数据类型
interface Book {
  id: string;
  title: string;
  link: string;
  color: string;
  accent?: string;
}

// 外部链接数据类型
interface ExternalLink {
  id: string;
  title: string;
  url: string;
  icon: string;
}

// 默认书籍数据
const defaultBooks: Book[] = [
  { id: '1', title: '人生哲学', link: '/philosophy', color: '#5D3A1A', accent: '#C49A6C' },
  { id: '2', title: '创业笔记', link: '/startup', color: '#8B4513', accent: '#D4A574' },
  { id: '3', title: '技术手册', link: '/tech', color: '#654321', accent: '#B8956E' },
  { id: '4', title: '诗词集', link: '/poetry', color: '#4A3728', accent: '#E8C89E' },
  { id: '5', title: '投资理财', link: '/finance', color: '#6B4423', accent: '#C49A6C' },
  { id: '6', title: '健康生活', link: '/health', color: '#7B5B3A', accent: '#D4A574' },
];

// 外部链接数据
const externalLinks: ExternalLink[] = [
  { id: 'l1', title: 'GitHub', url: 'https://github.com', icon: '⟨⟩' },
  { id: 'l2', title: '博客', url: 'https://blog.example.com', icon: '✦' },
  { id: 'l3', title: '作品集', url: 'https://portfolio.example.com', icon: '◈' },
  { id: 'l4', title: '联系', url: 'mailto:hello@example.com', icon: '✉' },
];

export default function StudyRoom() {
  const [hoveredBook, setHoveredBook] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [lampOn, setLampOn] = useState(true);
  const [time, setTime] = useState(0);

  // 火焰动画计时
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(t => t + 1);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="study-room">
      {/* 环境光效 */}
      <div className="ambient-light"></div>
      
      {/* 灰尘粒子 */}
      <div className="dust-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="dust"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* 墙壁 */}
      <div className="wall">
        {/* 墙纸纹理 */}
        <div className="wallpaper"></div>
        
        {/* 墙裙 */}
        <div className="wainscoting">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="wainscot-panel" />
          ))}
        </div>
        
        {/* 踢脚线 */}
        <div className="baseboard"></div>
        
        {/* 画作区域 */}
        <div className="painting-area">
          <div className="painting-frame">
            <div className="frame-outer-edge"></div>
            <div className="frame-inner-edge"></div>
            <div className="painting">
              <div className="painting-canvas">
                {/* 山水油画 */}
                <svg viewBox="0 0 200 150" className="w-full h-full painting-svg">
                  <defs>
                    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1a1510"/>
                      <stop offset="100%" stopColor="#2d251d"/>
                    </linearGradient>
                    <filter id="paintBlur">
                      <feGaussianBlur stdDeviation="0.5"/>
                    </filter>
                  </defs>
                  {/* 天空 */}
                  <rect fill="url(#skyGrad)" width="200" height="150"/>
                  {/* 星星 */}
                  <circle cx="30" cy="25" r="1" fill="#f5e6d3" opacity="0.6"/>
                  <circle cx="80" cy="15" r="0.8" fill="#f5e6d3" opacity="0.4"/>
                  <circle cx="140" cy="30" r="1.2" fill="#f5e6d3" opacity="0.5"/>
                  {/* 月亮 */}
                  <circle cx="160" cy="35" r="12" fill="#d4a574" opacity="0.9"/>
                  <circle cx="163" cy="33" r="10" fill="#2d251d" opacity="0.3"/>
                  {/* 远山层 */}
                  <path d="M0,90 Q30,50 70,70 Q100,55 140,65 Q170,50 200,60 L200,150 L0,150 Z" 
                        fill="#3d2a15" opacity="0.5" filter="url(#paintBlur)"/>
                  <path d="M0,105 Q50,70 90,85 Q130,65 170,80 Q190,70 200,75 L200,150 L0,150 Z" 
                        fill="#4a3520" opacity="0.6"/>
                  {/* 近山 */}
                  <path d="M0,120 Q40,95 80,105 Q120,90 160,100 Q180,95 200,100 L200,150 L0,150 Z" 
                        fill="#5d4a35"/>
                  {/* 松树剪影 */}
                  <path d="M45,150 L50,120 L47,120 L52,95 L48,95 L53,70 L58,95 L54,95 L59,120 L55,120 L60,150 Z" 
                        fill="#2d1f0f"/>
                  <path d="M160,150 L165,125 L162,125 L167,100 L170,100 L175,125 L172,125 L177,150 Z" 
                        fill="#2d1f0f"/>
                  {/* 雾气 */}
                  <ellipse cx="100" cy="130" rx="80" ry="15" fill="#5d4a35" opacity="0.3"/>
                </svg>
              </div>
              {/* 玻璃反光 */}
              <div className="glass-reflection"></div>
            </div>
          </div>
          
          {/* 画作下方的链接 */}
          <div className="painting-links">
            {externalLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`painting-link ${hoveredLink === link.id ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredLink(link.id)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <span className="link-icon">{link.icon}</span>
                <span className="link-title">{link.title}</span>
                <span className="link-arrow">→</span>
              </a>
            ))}
          </div>
        </div>

        {/* 壁炉 */}
        <div className="fireplace">
          {/* 壁炉架 */}
          <div className="mantel">
            <div className="mantel-top"></div>
            <div className="mantel-shelf"></div>
          </div>
          
          {/* 壁炉主体 */}
          <div className="fireplace-body">
            {/* 石材纹理 */}
            <div className="stone-texture"></div>
            
            {/* 壁炉开口 */}
            <div className="fireplace-opening">
              {/* 内壁 */}
              <div className="fireplace-inner"></div>
              
              {/* 火焰 */}
              <div className="fire-container">
                {/* 木柴 */}
                <div className="logs">
                  <div className="log log-1"></div>
                  <div className="log log-2"></div>
                </div>
                
                {/* 火焰 */}
                <div className="flames">
                  <div className="flame flame-core"></div>
                  <div className="flame flame-mid"></div>
                  <div className="flame flame-outer"></div>
                </div>
                
                {/* 火星 */}
                <div className="sparks">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="spark"
                      style={{
                        left: `${40 + Math.random() * 20}%`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* 壁炉底座 */}
          <div className="hearth"></div>
        </div>
      </div>

      {/* 地板 */}
      <div className="floor">
        {/* 木地板 */}
        <div className="floorboards">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="floorboard" />
          ))}
        </div>
        
        {/* 地毯 */}
        <div className="rug">
          <div className="rug-border">
            <div className="rug-pattern">
              <div className="rug-center"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 沙发 */}
      <div className="sofa">
        <div className="sofa-back">
          <div className="tuft tuft-1"></div>
          <div className="tuft tuft-2"></div>
          <div className="tuft tuft-3"></div>
        </div>
        <div className="sofa-seat">
          <div className="seat-cushion seat-cushion-left"></div>
          <div className="seat-cushion seat-cushion-right"></div>
        </div>
        <div className="sofa-arm sofa-arm-left"></div>
        <div className="sofa-arm sofa-arm-right"></div>
        <div className="sofa-skirt"></div>
        <div className="throw-pillow pillow-1"></div>
        <div className="throw-pillow pillow-2"></div>
      </div>

      {/* 桌子 */}
      <div className="table">
        <div className="table-top">
          <div className="table-veneer"></div>
        </div>
        <div className="table-drawer">
          <div className="drawer-handle"></div>
        </div>
        <div className="table-leg table-leg-left"></div>
        <div className="table-leg table-leg-right"></div>
      </div>

      {/* 台灯 */}
      <div className="lamp" onClick={() => setLampOn(!lampOn)}>
        <div className="lamp-cord"></div>
        <div className="lamp-shade">
          <div className="shade-rim shade-rim-top"></div>
          <div className="shade-fabric"></div>
          <div className="shade-rim shade-rim-bottom"></div>
        </div>
        <div className="lamp-neck"></div>
        <div className="lamp-base">
          <div className="base-ornament"></div>
        </div>
        {lampOn && (
          <>
            <div className="lamp-glow"></div>
            <div className="lamp-light-cone"></div>
          </>
        )}
      </div>

      {/* 小桌子 */}
      <div className="side-table">
        <div className="side-table-top"></div>
        <div className="side-table-rail"></div>
        <div className="side-table-leg side-table-leg-1"></div>
        <div className="side-table-leg side-table-leg-2"></div>
        <div className="side-table-leg side-table-leg-3"></div>
        
        {/* 跳马雕像 */}
        <div className="horse-statue">
          <div className="statue-base"></div>
          <div className="horse-body">
            <svg viewBox="0 0 80 70" className="w-full h-full">
              {/* 底座 */}
              <rect x="10" y="58" width="60" height="12" fill="#8B7355" rx="2"/>
              <rect x="15" y="55" width="50" height="5" fill="#A0826D" rx="1"/>
              
              {/* 马身体 */}
              <ellipse cx="40" cy="38" rx="20" ry="12" fill="#D4A574"/>
              
              {/* 马腿 - 前腿抬起 */}
              <path d="M55,45 L58,55 L54,55 L52,45" fill="#C49A6C"/>
              <path d="M50,48 L48,55 L44,55 L46,48" fill="#B8956E"/>
              <path d="M32,45 L30,55 L26,55 L28,45" fill="#C49A6C"/>
              <path d="M38,45 L36,55 L32,55 L34,45" fill="#B8956E"/>
              
              {/* 马头 */}
              <path d="M58,35 Q68,30 65,20 Q62,15 58,18 Q55,22 55,30 Q56,35 58,35" fill="#D4A574"/>
              
              {/* 马耳 */}
              <path d="M60,18 L62,10 L64,17" fill="#C49A6C"/>
              
              {/* 马鬃 */}
              <path d="M55,25 Q50,22 48,28 Q52,26 55,28" fill="#8B7355"/>
              <path d="M50,30 Q45,28 43,32 Q47,30 50,32" fill="#8B7355"/>
              
              {/* 马尾 */}
              <path d="M20,35 Q10,40 15,50" stroke="#8B7355" strokeWidth="3" fill="none"/>
              
              {/* 眼睛 */}
              <circle cx="62" cy="24" r="1.5" fill="#2D1F0F"/>
            </svg>
          </div>
        </div>
      </div>

      {/* 书架 */}
      <div className="bookshelf">
        <div className="shelf-back"></div>
        <div className="shelf shelf-1">
          {defaultBooks.slice(0, 2).map((book) => (
            <div
              key={book.id}
              className={`shelf-book ${hoveredBook === book.id ? 'hovered' : ''}`}
              style={{
                '--book-color': book.color,
                '--book-accent': book.accent,
                height: `${55 + Math.random() * 20}px`,
              } as React.CSSProperties}
              onMouseEnter={() => setHoveredBook(book.id)}
              onMouseLeave={() => setHoveredBook(null)}
            >
              <a href={book.link} className="book-link">
                <div className="book-spine">
                  <div className="book-decoration"></div>
                  <span className="book-title">{book.title}</span>
                  <div className="book-decoration book-decoration-bottom"></div>
                </div>
              </a>
            </div>
          ))}
        </div>
        <div className="shelf shelf-2">
          {defaultBooks.slice(2, 5).map((book) => (
            <div
              key={book.id}
              className={`shelf-book ${hoveredBook === book.id ? 'hovered' : ''}`}
              style={{
                '--book-color': book.color,
                '--book-accent': book.accent,
                height: `${50 + Math.random() * 25}px`,
              } as React.CSSProperties}
              onMouseEnter={() => setHoveredBook(book.id)}
              onMouseLeave={() => setHoveredBook(null)}
            >
              <a href={book.link} className="book-link">
                <div className="book-spine">
                  <div className="book-decoration"></div>
                  <span className="book-title">{book.title}</span>
                  <div className="book-decoration book-decoration-bottom"></div>
                </div>
              </a>
            </div>
          ))}
        </div>
        <div className="shelf shelf-3">
          {defaultBooks.slice(4, 6).map((book) => (
            <div
              key={book.id}
              className={`shelf-book ${hoveredBook === book.id ? 'hovered' : ''}`}
              style={{
                '--book-color': book.color,
                '--book-accent': book.accent,
                height: `${45 + Math.random() * 20}px`,
              } as React.CSSProperties}
              onMouseEnter={() => setHoveredBook(book.id)}
              onMouseLeave={() => setHoveredBook(null)}
            >
              <a href={book.link} className="book-link">
                <div className="book-spine">
                  <div className="book-decoration"></div>
                  <span className="book-title">{book.title}</span>
                  <div className="book-decoration book-decoration-bottom"></div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 地上的书堆 */}
      <div className="floor-books">
        <div className="book-stack">
          {defaultBooks.slice(0, 3).map((book, i) => (
            <div
              key={book.id}
              className={`floor-book floor-book-${i + 1}`}
              style={{
                '--book-color': book.color,
                '--book-accent': book.accent,
              } as React.CSSProperties}
              onMouseEnter={() => setHoveredBook(book.id)}
              onMouseLeave={() => setHoveredBook(null)}
            >
              <a href={book.link} className="book-link">
                <span className="book-title-flat">{book.title}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 桌上的书 */}
      <div className="table-books">
        {defaultBooks.slice(3, 5).map((book, i) => (
          <div
            key={book.id}
            className={`table-book table-book-${i + 1}`}
            style={{
              '--book-color': book.color,
              '--book-accent': book.accent,
            } as React.CSSProperties}
            onMouseEnter={() => setHoveredBook(book.id)}
            onMouseLeave={() => setHoveredBook(null)}
          >
            <a href={book.link} className="book-link">
              <span className="book-title-flat">{book.title}</span>
            </a>
          </div>
        ))}
      </div>

      {/* 猫 */}
      <div className="cat">
        <div className="cat-tail"></div>
        <div className="cat-body">
          <div className="cat-fur-pattern"></div>
        </div>
        <div className="cat-head">
          <div className="cat-ear cat-ear-left"></div>
          <div className="cat-ear cat-ear-right"></div>
          <div className="cat-face">
            <div className="cat-eye cat-eye-left">
              <div className="cat-pupil"></div>
            </div>
            <div className="cat-eye cat-eye-right">
              <div className="cat-pupil"></div>
            </div>
            <div className="cat-nose"></div>
            <div className="cat-whiskers cat-whiskers-left">
              <div className="whisker"></div>
              <div className="whisker"></div>
              <div className="whisker"></div>
            </div>
            <div className="cat-whiskers cat-whiskers-right">
              <div className="whisker"></div>
              <div className="whisker"></div>
              <div className="whisker"></div>
            </div>
          </div>
        </div>
        <div className="cat-paws">
          <div className="cat-paw cat-paw-left"></div>
          <div className="cat-paw cat-paw-right"></div>
        </div>
      </div>

      {/* 品牌标识 */}
      <div className="brand">
        <div className="brand-icon">♞</div>
        <div className="brand-text">AI 跳马</div>
        <div className="brand-line"></div>
        <div className="brand-subtitle">思维的栖息地</div>
      </div>

      {/* 台灯光晕 */}
      {lampOn && <div className="room-glow"></div>}
    </div>
  );
}
