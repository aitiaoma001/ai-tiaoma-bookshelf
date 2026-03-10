'use client';

import { useState } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon?: string;
  color?: string;
  description?: string;
}

interface RotatingBookshelfProps {
  links: LinkItem[];
  isDark?: boolean;
}

const colorMap: Record<string, string> = {
  blue: 'from-sky-500 to-blue-600',
  green: 'from-emerald-500 to-green-600',
  purple: 'from-violet-500 to-purple-600',
  red: 'from-rose-500 to-red-600',
  amber: 'from-amber-500 to-orange-600',
  pink: 'from-pink-500 to-rose-600',
  teal: 'from-teal-500 to-cyan-600',
  indigo: 'from-indigo-500 to-blue-600',
  gray: 'from-slate-500 to-gray-600',
};

export default function RotatingBookshelf({ links, isDark = false }: RotatingBookshelfProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const visibleCount = 5;
  const totalLinks = links.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalLinks);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalLinks) % totalLinks);
  };

  const getVisibleLinks = () => {
    const result = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i - Math.floor(visibleCount / 2) + totalLinks) % totalLinks;
      result.push({ link: links[index], position: i - Math.floor(visibleCount / 2) });
    }
    return result;
  };

  return (
    <div className={cn(
      'relative w-full py-6',
      isDark ? 'text-stone-200' : 'text-stone-700'
    )}>
      {/* 标题 */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className={cn(
          'h-px w-16',
          isDark ? 'bg-stone-700' : 'bg-stone-300'
        )} />
        <h3 className="text-sm font-medium flex items-center gap-2">
          <span>🔗</span>
          常用链接
        </h3>
        <div className={cn(
          'h-px w-16',
          isDark ? 'bg-stone-700' : 'bg-stone-300'
        )} />
      </div>

      {/* 旋转书架容器 */}
      <div className="relative h-32 flex items-center justify-center overflow-hidden">
        {/* 左箭头 */}
        <button
          onClick={prevSlide}
          className={cn(
            'absolute left-2 z-20 p-2 rounded-full transition-all',
            isDark 
              ? 'bg-slate-800 hover:bg-slate-700 text-stone-400' 
              : 'bg-stone-100 hover:bg-stone-200 text-stone-500'
          )}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* 书本卡片 */}
        <div className="relative w-full max-w-2xl h-full flex items-center justify-center gap-2 px-12">
          {getVisibleLinks().map(({ link, position }, index) => {
            const isCenter = position === 0;
            const scale = isCenter ? 1.1 : 0.85 - Math.abs(position) * 0.1;
            const opacity = isCenter ? 1 : 0.6 - Math.abs(position) * 0.15;
            const translateX = position * 70;
            const translateZ = isCenter ? 0 : -20;
            const rotateY = position * -15;

            return (
              <div
                key={link.id}
                className="absolute transition-all duration-500 ease-out cursor-pointer"
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex: isCenter ? 10 : 5 - Math.abs(position),
                }}
                onClick={() => isCenter && window.open(link.url, '_blank')}
              >
                <div
                  className={cn(
                    'w-20 h-28 rounded-lg flex flex-col items-center justify-center p-2 shadow-md transition-all',
                    isCenter && 'ring-2 ring-amber-400/50',
                    'bg-gradient-to-br',
                    colorMap[link.color || 'blue']
                  )}
                >
                  {/* 图标或首字母 */}
                  <div className="text-2xl mb-1">
                    {link.icon || link.title.charAt(0).toUpperCase()}
                  </div>
                  {/* 标题 */}
                  <span className="text-xs text-white text-center font-medium line-clamp-2">
                    {link.title}
                  </span>
                  {/* 外链图标 */}
                  {isCenter && (
                    <ExternalLink className="w-3 h-3 text-white/70 mt-1" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 右箭头 */}
        <button
          onClick={nextSlide}
          className={cn(
            'absolute right-2 z-20 p-2 rounded-full transition-all',
            isDark 
              ? 'bg-slate-800 hover:bg-slate-700 text-stone-400' 
              : 'bg-stone-100 hover:bg-stone-200 text-stone-500'
          )}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 指示器 */}
      <div className="flex justify-center gap-1.5 mt-4">
        {links.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              'w-1.5 h-1.5 rounded-full transition-all',
              index === currentIndex
                ? isDark ? 'bg-amber-500 w-4' : 'bg-amber-500 w-4'
                : isDark ? 'bg-stone-600' : 'bg-stone-300'
            )}
          />
        ))}
      </div>

      {/* 当前链接信息 */}
      {links[currentIndex] && (
        <div className={cn(
          'text-center mt-3 px-4 py-2 mx-auto max-w-xs rounded-lg',
          isDark ? 'bg-slate-800/50' : 'bg-stone-100'
        )}>
          <p className={cn(
            'text-sm font-medium truncate',
            isDark ? 'text-stone-200' : 'text-stone-700'
          )}>
            {links[currentIndex].title}
          </p>
          {links[currentIndex].description && (
            <p className={cn(
              'text-xs mt-1 truncate',
              isDark ? 'text-stone-500' : 'text-stone-500'
            )}>
              {links[currentIndex].description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
