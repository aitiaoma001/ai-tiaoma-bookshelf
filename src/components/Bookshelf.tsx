'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Book, { BookProps } from './Book';
import RotatingBookshelf, { LinkItem } from './RotatingBookshelf';
import { cn } from '@/lib/utils';
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react';

interface Shelf {
  id: string;
  name: string;
  books: BookProps[];
  level: 'main' | 'loft';
  privacy?: 'public' | 'semi-private' | 'private';
}

interface BookshelfProps {
  shelves: Shelf[];
  links?: LinkItem[];
}

export default function Bookshelf({ shelves, links = [] }: BookshelfProps) {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainShelves = shelves.filter((s) => s.level === 'main');
  const loftShelves = shelves.filter((s) => s.level === 'loft');

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={cn(
      'relative w-full min-h-screen transition-colors duration-500',
      isDark 
        ? 'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100'
    )}>
      {/* 柔和背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={cn(
          'absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl',
          isDark ? 'bg-slate-600/10' : 'bg-stone-300/20'
        )} />
        <div className={cn(
          'absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl',
          isDark ? 'bg-slate-500/10' : 'bg-stone-200/20'
        )} />
      </div>

      {/* 导航栏 */}
      <nav className={cn(
        'sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300',
        isDark 
          ? 'bg-slate-900/90 border-slate-700/50' 
          : 'bg-stone-50/90 border-stone-200/50'
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo 和品牌名 */}
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden shadow-md ring-1 ring-stone-300/50">
                <Image
                  src="/logo.png"
                  alt="AI 跳马 Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className={cn(
                  'font-semibold text-sm leading-tight',
                  isDark ? 'text-stone-200' : 'text-stone-700'
                )}>
                  AI 跳马
                </span>
                <span className={cn(
                  'text-xs leading-tight',
                  isDark ? 'text-stone-500' : 'text-stone-400'
                )}>
                  aitiaoma.com
                </span>
              </div>
            </div>

            {/* 桌面端导航 */}
            <div className="hidden md:flex items-center gap-5">
              <a href="#loft" className={cn(
                'text-sm transition-colors',
                isDark ? 'text-stone-400 hover:text-stone-200' : 'text-stone-500 hover:text-stone-700'
              )}>
                私密跃层
              </a>
              <a href="#main" className={cn(
                'text-sm transition-colors',
                isDark ? 'text-stone-400 hover:text-stone-200' : 'text-stone-500 hover:text-stone-700'
              )}>
                主藏书区
              </a>
              <a href="#links" className={cn(
                'text-sm transition-colors',
                isDark ? 'text-stone-400 hover:text-stone-200' : 'text-stone-500 hover:text-stone-700'
              )}>
                常用链接
              </a>
              <button
                onClick={toggleTheme}
                className={cn(
                  'p-1.5 rounded-full transition-colors',
                  isDark 
                    ? 'bg-slate-800 text-stone-300 hover:bg-slate-700' 
                    : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                )}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            {/* 移动端菜单按钮 */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className={cn(
                  'p-1.5 rounded-full transition-colors',
                  isDark 
                    ? 'bg-slate-800 text-stone-300' 
                    : 'bg-stone-100 text-stone-500'
                )}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={cn(
                  'p-1.5 rounded-full transition-colors',
                  isDark 
                    ? 'bg-slate-800 text-stone-300' 
                    : 'bg-stone-100 text-stone-500'
                )}
              >
                {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* 移动端菜单 */}
          {isMenuOpen && (
            <div className={cn(
              'md:hidden py-3 border-t transition-colors',
              isDark ? 'border-slate-700' : 'border-stone-200'
            )}>
              <div className="flex flex-col gap-2">
                <a 
                  href="#loft" 
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm transition-colors',
                    isDark 
                      ? 'text-stone-400 hover:bg-slate-800' 
                      : 'text-stone-500 hover:bg-stone-100'
                  )}
                >
                  私密跃层
                </a>
                <a 
                  href="#main" 
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm transition-colors',
                    isDark 
                      ? 'text-stone-400 hover:bg-slate-800' 
                      : 'text-stone-500 hover:bg-stone-100'
                  )}
                >
                  主藏书区
                </a>
                <a 
                  href="#links" 
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm transition-colors',
                    isDark 
                      ? 'text-stone-400 hover:bg-slate-800' 
                      : 'text-stone-500 hover:bg-stone-100'
                  )}
                >
                  常用链接
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero 区域 - 更紧凑 */}
        <div className="text-center mb-10">
          <div className={cn(
              'inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 border',
              isDark 
                ? 'bg-slate-800/50 border-slate-700/50' 
                : 'bg-stone-50 border-stone-200/50'
            )}
          >
            <Sparkles className={cn(
              'w-3.5 h-3.5',
              isDark ? 'text-stone-400' : 'text-stone-500'
            )} />
            <span className={cn(
              'text-xs font-medium',
              isDark ? 'text-stone-300' : 'text-stone-600'
            )}>
              思维的殿堂
            </span>
          </div>
          
          <h1 className={cn(
            'text-2xl md:text-4xl font-bold mb-2',
            isDark ? 'text-stone-100' : 'text-stone-800'
          )}>
            我的思维书架
          </h1>
          
          <p className={cn(
            'text-sm max-w-lg mx-auto',
            isDark ? 'text-stone-400' : 'text-stone-500'
          )}>
            每一本书，都是思想的结晶
          </p>

          {/* 统计数据 - 更紧凑 */}
          <div className="flex justify-center gap-4 mt-5">
            {[
              { label: '藏书', value: shelves.reduce((acc, s) => acc + s.books.length, 0) },
              { label: '分类', value: shelves.length },
            ].map((stat, index) => (
              <div 
                key={index}
                className={cn(
                  'text-center px-4 py-2 rounded-lg border',
                  isDark 
                    ? 'bg-slate-800/30 border-slate-700/30' 
                    : 'bg-stone-50/50 border-stone-200/50'
                )}
              >
                <div className={cn(
                  'text-lg font-semibold',
                  isDark ? 'text-stone-200' : 'text-stone-700'
                )}>
                  {stat.value}
                </div>
                <div className={cn(
                  'text-xs',
                  isDark ? 'text-stone-500' : 'text-stone-400'
                )}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 跃层区域 */}
        {loftShelves.length > 0 && (
          <div id="loft" className="mb-10 scroll-mt-16">
            <div className="flex items-center gap-2 mb-4">
              <div className={cn(
                'h-px flex-1',
                isDark 
                  ? 'bg-gradient-to-r from-transparent via-slate-600 to-transparent' 
                  : 'bg-gradient-to-r from-transparent via-stone-300 to-transparent'
              )} />
              <span className={cn(
                'px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5',
                isDark 
                  ? 'bg-slate-800 text-stone-300 border border-slate-700' 
                  : 'bg-stone-100 text-stone-600 border border-stone-200'
              )}>
                <span>🔐</span>
                私密跃层
              </span>
              <div className={cn(
                'h-px flex-1',
                isDark 
                  ? 'bg-gradient-to-r from-transparent via-slate-600 to-transparent' 
                  : 'bg-gradient-to-r from-transparent via-stone-300 to-transparent'
              )} />
            </div>

            {/* 跃层书架 */}
            <div className={cn(
              'relative rounded-xl p-4 md:p-6 border transition-colors duration-300',
              isDark 
                ? 'bg-slate-800/30 border-slate-700/50' 
                : 'bg-stone-50/80 border-stone-200/50'
            )}>
              {/* 阁楼顶部装饰 */}
              <div className={cn(
                'absolute -top-2 left-6 right-6 h-4 rounded-t-lg',
                isDark 
                  ? 'bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700' 
                  : 'bg-gradient-to-r from-stone-400 via-stone-300 to-stone-400'
              )} />
              
              {/* 装饰：楼梯 */}
              <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-1 hidden lg:flex">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'w-5 h-2.5 rounded-sm shadow',
                      isDark 
                        ? 'bg-gradient-to-r from-slate-700 to-slate-600' 
                        : 'bg-gradient-to-r from-stone-400 to-stone-300'
                    )}
                    style={{ marginLeft: `${i * 8}px` }}
                  />
                ))}
              </div>

              {loftShelves.map((shelf) => (
                <div key={shelf.id} className="mb-8 last:mb-0 relative">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={cn(
                      'text-xs font-medium',
                      isDark ? 'text-stone-300' : 'text-stone-600'
                    )}>
                      {shelf.name}
                    </span>
                    {shelf.privacy === 'private' && (
                      <span className={cn(
                        'px-2 py-0.5 text-xs rounded-full',
                        isDark 
                          ? 'bg-slate-700 text-stone-300 border border-slate-600' 
                          : 'bg-stone-200 text-stone-500'
                      )}>
                        🔒 需密码
                      </span>
                    )}
                  </div>
                  
                  {/* 书架隔板 */}
                  <div className={cn(
                    'relative rounded-lg p-4',
                    isDark 
                      ? 'bg-slate-800/50' 
                      : 'bg-stone-50'
                  )}>
                    <div className="relative flex items-end gap-3 min-h-[260px] overflow-x-auto pb-3">
                      {shelf.books.map((book) => (
                        <Book key={book.id} {...book} isDark={isDark} />
                      ))}
                    </div>
                  </div>

                  {/* 书架底部装饰 */}
                  <div className={cn(
                    'h-3 rounded-b-lg mt-1',
                    isDark 
                      ? 'bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700' 
                      : 'bg-gradient-to-r from-stone-400 via-stone-300 to-stone-400'
                  )} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 主层书架 */}
        <div id="main" className="scroll-mt-16">
          <div className="flex items-center gap-2 mb-4">
            <div className={cn(
              'h-px flex-1',
              isDark 
                ? 'bg-gradient-to-r from-transparent via-slate-600 to-transparent' 
                : 'bg-gradient-to-r from-transparent via-stone-300 to-transparent'
            )} />
            <span className={cn(
              'px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5',
              isDark 
                ? 'bg-slate-800 text-stone-300 border border-slate-700' 
                : 'bg-stone-100 text-stone-600 border border-stone-200'
            )}>
              <span>📖</span>
              主藏书区
            </span>
            <div className={cn(
              'h-px flex-1',
              isDark 
                ? 'bg-gradient-to-r from-transparent via-slate-600 to-transparent' 
                : 'bg-gradient-to-r from-transparent via-stone-300 to-transparent'
            )} />
          </div>

          {mainShelves.map((shelf) => (
            <div key={shelf.id} className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className={cn(
                  'text-xs font-medium',
                  isDark ? 'text-stone-300' : 'text-stone-600'
                )}>
                  {shelf.name}
                </span>
                <span className={cn(
                  'text-xs px-1.5 py-0.5 rounded-full',
                  isDark 
                    ? 'bg-slate-800 text-stone-400' 
                    : 'bg-stone-100 text-stone-500'
                )}>
                  {shelf.books.length}
                </span>
              </div>
              
              {/* 书架隔板 */}
              <div className={cn(
                'relative rounded-lg p-4',
                isDark 
                  ? 'bg-slate-800/30' 
                  : 'bg-stone-50'
              )}>
                <div className="relative flex items-end gap-2.5 min-h-[240px] overflow-x-auto pb-2 flex-wrap">
                  {shelf.books.map((book) => (
                    <Book key={book.id} {...book} isDark={isDark} />
                  ))}
                </div>
              </div>

              {/* 书架底部装饰 */}
              <div className={cn(
                'h-4 rounded-b-lg mt-1',
                isDark 
                  ? 'bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700' 
                  : 'bg-gradient-to-r from-stone-400 via-stone-300 to-stone-400'
              )} />
            </div>
          ))}
        </div>

        {/* 底部旋转书架 - 链接区 */}
        {links.length > 0 && (
          <div id="links" className="scroll-mt-16 mt-10">
            <div className={cn(
              'rounded-xl p-4 border',
              isDark 
                ? 'bg-slate-800/30 border-slate-700/50' 
                : 'bg-stone-50 border-stone-200/50'
            )}>
              <RotatingBookshelf links={links} isDark={isDark} />
            </div>
          </div>
        )}

        {/* 底部品牌区域 - 更紧凑 */}
        <div className="mt-12 text-center">
          <div className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-lg border',
            isDark 
              ? 'bg-slate-800/50 border-slate-700/50' 
              : 'bg-stone-50 border-stone-200/50'
          )}>
            <div className="relative w-6 h-6 rounded-md overflow-hidden">
              <Image
                src="/logo.png"
                alt="AI 跳马"
                fill
                className="object-cover"
              />
            </div>
            <span className={cn(
              'text-xs',
              isDark ? 'text-stone-400' : 'text-stone-500'
            )}>
              AI 跳马 · aitiaoma.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
