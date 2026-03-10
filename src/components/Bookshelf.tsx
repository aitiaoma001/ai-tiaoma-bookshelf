'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Book, { BookProps } from './Book';
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
}

export default function Bookshelf({ shelves }: BookshelfProps) {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const mainShelves = shelves.filter((s) => s.level === 'main');
  const loftShelves = shelves.filter((s) => s.level === 'loft');

  useEffect(() => {
    setMounted(true);
  }, []);

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
        {/* 淡化浮动光斑 */}
        <div className={cn(
          'absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl',
          isDark ? 'bg-slate-600/10' : 'bg-stone-300/20'
        )} />
        <div className={cn(
          'absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl',
          isDark ? 'bg-slate-500/10' : 'bg-stone-200/20'
        )} />
        <div className={cn(
          'absolute bottom-40 left-1/3 w-80 h-80 rounded-full blur-3xl',
          isDark ? 'bg-slate-600/10' : 'bg-stone-300/20'
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
          <div className="flex items-center justify-between h-16">
            {/* Logo 和品牌名 */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md ring-1 ring-stone-300/50">
                <Image
                  src="/logo.png"
                  alt="AI 跳马 Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className={cn(
                  'font-semibold text-base leading-tight',
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
            <div className="hidden md:flex items-center gap-6">
              <a href="#loft" className={cn(
                'text-sm font-medium transition-colors',
                isDark ? 'text-stone-400 hover:text-stone-200' : 'text-stone-500 hover:text-stone-700'
              )}>
                私密跃层
              </a>
              <a href="#main" className={cn(
                'text-sm font-medium transition-colors',
                isDark ? 'text-stone-400 hover:text-stone-200' : 'text-stone-500 hover:text-stone-700'
              )}>
                主藏书区
              </a>
              <button
                onClick={toggleTheme}
                className={cn(
                  'p-2 rounded-full transition-colors',
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
                  'p-2 rounded-full transition-colors',
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
                  'p-2 rounded-full transition-colors',
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
              'md:hidden py-4 border-t transition-colors',
              isDark ? 'border-slate-700' : 'border-stone-200'
            )}>
              <div className="flex flex-col gap-3">
                <a 
                  href="#loft" 
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
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
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    isDark 
                      ? 'text-stone-400 hover:bg-slate-800' 
                      : 'text-stone-500 hover:bg-stone-100'
                  )}
                >
                  主藏书区
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero 区域 */}
        <div className="text-center mb-16">
          <div className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 backdrop-blur-sm border',
              isDark 
                ? 'bg-slate-800/50 border-slate-700/50' 
                : 'bg-stone-50 border-stone-200/50'
            )}
          >
            <Sparkles className={cn(
              'w-4 h-4',
              isDark ? 'text-stone-400' : 'text-stone-500'
            )} />
            <span className={cn(
              'text-sm font-medium',
              isDark ? 'text-stone-300' : 'text-stone-600'
            )}>
              思维的殿堂
            </span>
          </div>
          
          <h1 className={cn(
            'text-3xl md:text-5xl font-bold mb-4',
            isDark ? 'text-stone-100' : 'text-stone-800'
          )}>
            我的思维书架
          </h1>
          
          <p className={cn(
            'text-base md:text-lg max-w-2xl mx-auto',
            isDark ? 'text-stone-400' : 'text-stone-500'
          )}>
            每一本书，都是思想的结晶；每一页，都是智慧的积累
          </p>

          {/* 统计数据 */}
          <div className="flex justify-center gap-6 mt-8">
            {[
              { label: '藏书', value: shelves.reduce((acc, s) => acc + s.books.length, 0) },
              { label: '分类', value: shelves.length },
              { label: '私密', value: shelves.filter(s => s.privacy === 'private').length },
            ].map((stat, index) => (
              <div 
                key={index}
                className={cn(
                  'text-center px-5 py-2.5 rounded-xl backdrop-blur-sm border transition-colors',
                  isDark 
                    ? 'bg-slate-800/30 border-slate-700/30' 
                    : 'bg-stone-50/50 border-stone-200/50'
                )}
              >
                <div className={cn(
                  'text-xl font-semibold',
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
          <div id="loft" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-2 mb-6">
              <div className={cn(
                'h-px flex-1',
                isDark 
                  ? 'bg-gradient-to-r from-transparent via-slate-600 to-transparent' 
                  : 'bg-gradient-to-r from-transparent via-stone-300 to-transparent'
              )} />
              <span className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2',
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
              'relative rounded-2xl p-6 md:p-8 border transition-colors duration-300',
              isDark 
                ? 'bg-slate-800/30 border-slate-700/50' 
                : 'bg-stone-50/80 border-stone-200/50'
            )}>
              {/* 阁楼顶部装饰 */}
              <div className={cn(
                'absolute -top-3 left-8 right-8 h-5 rounded-t-xl transition-colors',
                isDark 
                  ? 'bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700' 
                  : 'bg-gradient-to-r from-stone-400 via-stone-300 to-stone-400'
              )} />
              
              {/* 装饰：楼梯 */}
              <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-1.5 hidden lg:flex">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'w-6 h-3 rounded-sm shadow',
                      isDark 
                        ? 'bg-gradient-to-r from-slate-700 to-slate-600' 
                        : 'bg-gradient-to-r from-stone-400 to-stone-300'
                    )}
                    style={{ marginLeft: `${i * 10}px` }}
                  />
                ))}
              </div>

              {/* 阁楼窗户装饰 */}
              <div className={cn(
                  'absolute top-4 right-8 w-14 h-14 rounded-full border-2 hidden md:block',
                  isDark ? 'border-slate-600/50' : 'border-stone-300/50'
                )}
              >
                <div className={cn(
                  'absolute inset-2 rounded-full',
                  isDark ? 'bg-slate-700/30' : 'bg-stone-200/30'
                )} />
              </div>

              {loftShelves.map((shelf) => (
                <div key={shelf.id} className="mb-10 last:mb-0 relative">
                  <div className="flex items-center gap-3 mb-5">
                    <span className={cn(
                      'text-sm font-medium',
                      isDark ? 'text-stone-300' : 'text-stone-600'
                    )}>
                      {shelf.name}
                    </span>
                    {shelf.privacy === 'private' && (
                      <span className={cn(
                        'px-2.5 py-1 text-xs rounded-full flex items-center gap-1',
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
                    'relative rounded-xl p-5 transition-colors',
                    isDark 
                      ? 'bg-slate-800/50' 
                      : 'bg-stone-50'
                  )}>
                    <div className="relative flex items-end gap-4 min-h-[300px] overflow-x-auto pb-4">
                      {shelf.books.map((book) => (
                        <Book key={book.id} {...book} isDark={isDark} />
                      ))}
                    </div>
                  </div>

                  {/* 书架底部装饰 */}
                  <div className={cn(
                    'h-4 rounded-b-xl mt-1.5 relative overflow-hidden',
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
        <div id="main" className="scroll-mt-20">
          <div className="flex items-center gap-2 mb-6">
            <div className={cn(
              'h-px flex-1',
              isDark 
                ? 'bg-gradient-to-r from-transparent via-slate-600 to-transparent' 
                : 'bg-gradient-to-r from-transparent via-stone-300 to-transparent'
            )} />
            <span className={cn(
              'px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2',
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
            <div key={shelf.id} className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <span className={cn(
                  'text-sm font-medium',
                  isDark ? 'text-stone-300' : 'text-stone-600'
                )}>
                  {shelf.name}
                </span>
                <span className={cn(
                  'text-xs px-2 py-0.5 rounded-full',
                  isDark 
                    ? 'bg-slate-800 text-stone-400' 
                    : 'bg-stone-100 text-stone-500'
                )}>
                  {shelf.books.length} 本
                </span>
              </div>
              
              {/* 书架隔板 */}
              <div className={cn(
                'relative rounded-xl p-6 transition-colors',
                isDark 
                  ? 'bg-slate-800/30' 
                  : 'bg-stone-50'
              )}>
                <div className="relative flex items-end gap-3 min-h-[280px] overflow-x-auto pb-3 flex-wrap">
                  {shelf.books.map((book) => (
                    <Book key={book.id} {...book} isDark={isDark} />
                  ))}
                </div>
              </div>

              {/* 书架底部装饰 */}
              <div className={cn(
                'h-5 rounded-b-xl mt-1.5 relative overflow-hidden',
                isDark 
                  ? 'bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700' 
                  : 'bg-gradient-to-r from-stone-400 via-stone-300 to-stone-400'
              )}>
                <div className="absolute inset-0 opacity-30">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'absolute h-px',
                        isDark ? 'bg-slate-500/30' : 'bg-stone-500/20'
                      )}
                      style={{
                        top: `${(i + 1) * 25}%`,
                        left: '10%',
                        right: '10%',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 底部品牌区域 */}
        <div className="mt-20 text-center">
          <div className={cn(
            'inline-block px-8 py-5 rounded-2xl backdrop-blur-sm border transition-colors',
            isDark 
              ? 'bg-slate-800/50 border-slate-700/50' 
              : 'bg-stone-50 border-stone-200/50'
          )}>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="AI 跳马"
                  fill
                  className="object-cover"
                />
              </div>
              <span className={cn(
                'font-medium',
                isDark ? 'text-stone-200' : 'text-stone-600'
              )}>
                AI 跳马
              </span>
            </div>
            <p className={cn(
              'text-sm',
              isDark ? 'text-stone-400' : 'text-stone-500'
            )}>
              书架上的每一本书，都是思维的结晶
            </p>
            <p className={cn(
              'text-xs mt-2',
              isDark ? 'text-stone-600' : 'text-stone-400'
            )}>
              aitiaoma.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
