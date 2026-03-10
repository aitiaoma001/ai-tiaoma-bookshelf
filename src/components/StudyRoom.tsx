'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStudy } from '@/store/StudyContext';
import { Book } from '@/types/study';

export default function StudyRoom() {
  const { books, links, layout, brandName, brandSubtitle } = useStudy();
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

  // 根据位置获取书籍
  const getBooksByLocation = (location: Book['location'], shelfRow?: number) => {
    return books
      .filter(b => b.location === location && (shelfRow === undefined || b.shelfRow === shelfRow))
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  };

  // 获取布局元素
  const getLayoutElement = (id: string) => layout.find(e => e.id === id);

  // 检查元素是否可见
  const isVisible = (id: string) => {
    const element = getLayoutElement(id);
    return element ? element.visible : true;
  };

  // 获取元素位置样式
  const getPositionStyle = (id: string) => {
    const element = getLayoutElement(id);
    if (!element) return {};
    return {
      left: element.x,
      top: element.y,
    };
  };

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
        {isVisible('painting') && (
          <div className="painting-area" style={getPositionStyle('painting')}>
            <div className="painting-frame">
              <div className="frame-outer-edge"></div>
              <div className="frame-inner-edge"></div>
              <div className="painting">
                <div className="painting-canvas">
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
                    <rect fill="url(#skyGrad)" width="200" height="150"/>
                    <circle cx="30" cy="25" r="1" fill="#f5e6d3" opacity="0.6"/>
                    <circle cx="80" cy="15" r="0.8" fill="#f5e6d3" opacity="0.4"/>
                    <circle cx="140" cy="30" r="1.2" fill="#f5e6d3" opacity="0.5"/>
                    <circle cx="160" cy="35" r="12" fill="#d4a574" opacity="0.9"/>
                    <circle cx="163" cy="33" r="10" fill="#2d251d" opacity="0.3"/>
                    <path d="M0,90 Q30,50 70,70 Q100,55 140,65 Q170,50 200,60 L200,150 L0,150 Z" 
                          fill="#3d2a15" opacity="0.5" filter="url(#paintBlur)"/>
                    <path d="M0,105 Q50,70 90,85 Q130,65 170,80 Q190,70 200,75 L200,150 L0,150 Z" 
                          fill="#4a3520" opacity="0.6"/>
                    <path d="M0,120 Q40,95 80,105 Q120,90 160,100 Q180,95 200,100 L200,150 L0,150 Z" 
                          fill="#5d4a35"/>
                    <path d="M45,150 L50,120 L47,120 L52,95 L48,95 L53,70 L58,95 L54,95 L59,120 L55,120 L60,150 Z" 
                          fill="#2d1f0f"/>
                    <path d="M160,150 L165,125 L162,125 L167,100 L170,100 L175,125 L172,125 L177,150 Z" 
                          fill="#2d1f0f"/>
                    <ellipse cx="100" cy="130" rx="80" ry="15" fill="#5d4a35" opacity="0.3"/>
                  </svg>
                </div>
                <div className="glass-reflection"></div>
              </div>
            </div>
            
            {/* 链接 */}
            <div className="painting-links">
              {links.map((link) => (
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
        )}

        {/* 壁炉 */}
        {isVisible('fireplace') && (
          <div className="fireplace">
            <div className="mantel">
              <div className="mantel-top"></div>
              <div className="mantel-shelf"></div>
            </div>
            <div className="fireplace-body">
              <div className="stone-texture"></div>
              <div className="fireplace-opening">
                <div className="fireplace-inner"></div>
                <div className="fire-container">
                  <div className="logs">
                    <div className="log log-1"></div>
                    <div className="log log-2"></div>
                  </div>
                  <div className="flames">
                    <div className="flame flame-core"></div>
                    <div className="flame flame-mid"></div>
                    <div className="flame flame-outer"></div>
                  </div>
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
            <div className="hearth"></div>
          </div>
        )}
      </div>

      {/* 地板 */}
      <div className="floor">
        <div className="floorboards">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="floorboard" />
          ))}
        </div>
        <div className="rug">
          <div className="rug-border">
            <div className="rug-pattern">
              <div className="rug-center"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 沙发 */}
      {isVisible('sofa') && (
        <div className="sofa" style={getPositionStyle('sofa')}>
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
      )}

      {/* 大桌子 */}
      {isVisible('table') && (
        <div className="table" style={getPositionStyle('table')}>
          <div className="table-top">
            <div className="table-veneer"></div>
          </div>
          <div className="table-drawer">
            <div className="drawer-handle"></div>
          </div>
          <div className="table-leg table-leg-left"></div>
          <div className="table-leg table-leg-right"></div>
        </div>
      )}

      {/* 台灯 */}
      {isVisible('lamp') && (
        <div className="lamp" onClick={() => setLampOn(!lampOn)} style={getPositionStyle('lamp')}>
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
      )}

      {/* 小桌子 */}
      {isVisible('sideTable') && (
        <div className="side-table" style={getPositionStyle('sideTable')}>
          <div className="side-table-top"></div>
          <div className="side-table-rail"></div>
          <div className="side-table-leg side-table-leg-1"></div>
          <div className="side-table-leg side-table-leg-2"></div>
          <div className="side-table-leg side-table-leg-3"></div>
          
          {/* 小桌子上的书 */}
          <div className="side-table-books">
            {getBooksByLocation('sideTable').map((book, i) => (
              <div
                key={book.id}
                className={`side-table-book side-table-book-${i + 1} ${hoveredBook === book.id ? 'hovered' : ''}`}
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
      )}

      {/* 书架 */}
      {isVisible('bookshelf') && (
        <div className="bookshelf" style={getPositionStyle('bookshelf')}>
          <div className="shelf-back"></div>
          {[1, 2, 3].map((row) => (
            <div key={row} className={`shelf shelf-${row}`}>
              {getBooksByLocation('shelf', row).map((book) => (
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
          ))}
        </div>
      )}

      {/* 地上的书 */}
      {isVisible('floorBooks') && (
        <div className="floor-books" style={getPositionStyle('floorBooks')}>
          <div className="book-stack">
            {getBooksByLocation('floor').map((book, i) => (
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
      )}

      {/* 大桌子上的书 */}
      {isVisible('table') && (
        <div className="table-books">
          {getBooksByLocation('table').map((book, i) => (
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
      )}

      {/* 猫 */}
      {isVisible('cat') && (
        <div className="cat" style={getPositionStyle('cat')}>
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
      )}

      {/* 品牌标识 */}
      <div className="brand">
        <div className="brand-icon">♞</div>
        <div className="brand-text">{brandName}</div>
        <div className="brand-line"></div>
        <div className="brand-subtitle">{brandSubtitle}</div>
        <Link href="/admin" className="brand-admin-link">
          ⚙️ 管理
        </Link>
      </div>

      {/* 台灯光晕 */}
      {lampOn && <div className="room-glow"></div>}
    </div>
  );
}
