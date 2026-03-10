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
  blue: 'from-cyan-400 via-blue-500 to-indigo-600',
  green: 'from-emerald-400 via-green-500 to-teal-600',
  purple: 'from-violet-400 via-purple-500 to-fuchsia-600',
  red: 'from-rose-400 via-red-500 to-rose-600',
  amber: 'from-amber-400 via-orange-500 to-yellow-500',
  pink: 'from-pink-400 via-rose-500 to-pink-600',
  teal: 'from-cyan-400 via-teal-500 to-emerald-600',
  indigo: 'from-indigo-400 via-violet-500 to-purple-600',
  gray: 'from-slate-400 via-gray-500 to-zinc-600',
};

export default function RotatingBookshelf({ links, isDark = true }: RotatingBookshelfProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalLinks = links.length;
  const visibleCount = 5;

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
      'relative w-full py-4',
      isDark ? 'text-slate-200' : 'text-slate-700'
    )}>
      {/* 标题 */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className={cn(
          'h-px w-12',
          isDark ? 'bg-cyan-500/50' : 'bg-blue-300'
        )} />
        <h3 className="text-xs font-medium flex items-center gap-1.5">
          <span>🔗</span>
          常用链接
        </h3>
        <div className={cn(
          'h-px w-12',
          isDark ? 'bg-cyan-500/50' : 'bg-blue-300'
        )} />
      </div>

      {/* 旋转书架 */}
      <div className="relative h-28 flex items-center justify-center overflow-hidden">
        {/* 左箭头 */}
        <button
          onClick={prevSlide}
          className={cn(
            'absolute left-0 z-20 p-1.5 rounded-full transition-all',
            isDark 
              ? 'bg-slate-800/80 hover:bg-slate-700 text-cyan-400' 
              : 'bg-white hover:bg-slate-50 text-blue-500'
          )}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* 卡片 */}
        <div className="relative w-full max-w-lg h-full flex items-center justify-center px-10">
          {getVisibleLinks().map(({ link, position }) => {
            const isCenter = position === 0;
            const scale = isCenter ? 1.15 : 0.8 - Math.abs(position) * 0.1;
            const opacity = isCenter ? 1 : 0.5 - Math.abs(position) * 0.15;
            const translateX = position * 60;

            return (
              <div
                key={link.id}
                className="absolute transition-all duration-400 ease-out cursor-pointer"
                style={{
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  opacity,
                  zIndex: isCenter ? 10 : 5 - Math.abs(position),
                }}
                onClick={() => isCenter && window.open(link.url, '_blank')}
              >
                <div
                  className={cn(
                    'w-16 h-24 rounded-lg flex flex-col items-center justify-center p-2 shadow-lg transition-all',
                    isCenter && isDark && 'ring-2 ring-cyan-400/50 shadow-cyan-500/30',
                    'bg-gradient-to-br',
                    colorMap[link.color || 'blue']
                  )}
                >
                  <div className="text-xl mb-1">
                    {link.icon || link.title.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-[10px] text-white text-center font-medium line-clamp-2">
                    {link.title}
                  </span>
                  {isCenter && (
                    <ExternalLink className="w-2.5 h-2.5 text-white/70 mt-0.5" />
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
            'absolute right-0 z-20 p-1.5 rounded-full transition-all',
            isDark 
              ? 'bg-slate-800/80 hover:bg-slate-700 text-cyan-400' 
              : 'bg-white hover:bg-slate-50 text-blue-500'
          )}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 指示器 */}
      <div className="flex justify-center gap-1 mt-3">
        {links.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              'h-1 rounded-full transition-all',
              index === currentIndex
                ? isDark ? 'bg-cyan-400 w-4' : 'bg-blue-500 w-4'
                : isDark ? 'bg-slate-600 w-1' : 'bg-slate-300 w-1'
            )}
          />
        ))}
      </div>

      {/* 当前信息 */}
      {links[currentIndex] && (
        <div className={cn(
          'text-center mt-2 px-3 py-1.5 mx-auto max-w-xs rounded-lg',
          isDark ? 'bg-slate-800/50' : 'bg-slate-50'
        )}>
          <p className={cn(
            'text-xs font-medium truncate',
            isDark ? 'text-slate-200' : 'text-slate-700'
          )}>
            {links[currentIndex].title}
          </p>
        </div>
      )}
    </div>
  );
}
