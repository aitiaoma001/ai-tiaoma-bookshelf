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
        ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100'
    )}>
      {/* 动态背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 浮动光斑 */}
        <div className={cn(
          'absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse',
          isDark ? 'bg-purple-500/20' : 'bg-amber-300/30'
        )} />
        <div className={cn(
          'absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000',
          isDark ? 'bg-blue-500/20' : 'bg-orange-300/30'
        )} />
        <div className={cn(
          'absolute bottom-40 left-1/3 w-80 h-80 rounded-full blur-3xl animate-pulse delay-500',
          isDark ? 'bg-pink-500/20' : 'bg-yellow-300/30'
        )} />
        
        {/* 网格背景 */}
        <div className={cn(
          'absolute inset-0 opacity-5',
          isDark ? 'bg-white' : 'bg-black'
        )}>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
      </div>

      {/* 导航栏 */}
      <nav className={cn(
        'sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300',
        isDark 
          ? 'bg-gray-900/80 border-gray-700/50' 
          : 'bg-white/80 border-amber-200/50'
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo 和品牌名 */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg ring-2 ring-amber-400/50">
                <Image
                  src="/logo.png"
                  alt="AI 跳马 Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className={cn(
                  'font-bold text-lg leading-tight bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent',
                )}>
                  AI 跳马
                </span>
                <span className={cn(
                  'text-xs leading-tight',
                  isDark ? 'text-gray-400' : 'text-gray-500'
                )}>
                  aitiaoma.com
                </span>
              </div>
            </div>

            {/* 桌面端导航 */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#loft" className={cn(
                'text-sm font-medium transition-colors hover:text-amber-500',
                isDark ? 'text-gray-300' : 'text-gray-600'
              )}>
                私密跃层
              </a>
              <a href="#main" className={cn(
                'text-sm font-medium transition-colors hover:text-amber-500',
                isDark ? 'text-gray-300' : 'text-gray-600'
              )}>
                主藏书区
              </a>
              <button
                onClick={toggleTheme}
                className={cn(
                  'p-2 rounded-full transition-colors',
                  isDark 
                    ? 'bg-gray-800 text-amber-400 hover:bg-gray-700' 
                    : 'bg-amber-100 text-amber-600 hover:bg-amber-200'
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
                    ? 'bg-gray-800 text-amber-400' 
                    : 'bg-amber-100 text-amber-600'
                )}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={cn(
                  'p-2 rounded-full transition-colors',
                  isDark 
                    ? 'bg-gray-800 text-gray-300' 
                    : 'bg-amber-100 text-gray-600'
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
              isDark ? 'border-gray-700' : 'border-amber-200'
            )}>
              <div className="flex flex-col gap-3">
                <a 
                  href="#loft" 
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    isDark 
                      ? 'text-gray-300 hover:bg-gray-800' 
                      : 'text-gray-600 hover:bg-amber-100'
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
                      ? 'text-gray-300 hover:bg-gray-800' 
                      : 'text-gray-600 hover:bg-amber-100'
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
                ? 'bg-gray-800/50 border-gray-700/50' 
                : 'bg-white/50 border-amber-200/50'
            )}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className={cn(
              'text-sm font-medium',
              isDark ? 'text-amber-300' : 'text-amber-700'
            )}>
              思维的殿堂
            </span>
          </div>
          
          <h1 className={cn(
            'text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent',
            isDark 
              ? 'from-amber-300 via-orange-400 to-amber-300' 
              : 'from-amber-600 via-orange-500 to-amber-600'
          )}>
            我的思维书架
          </h1>
          
          <p className={cn(
            'text-lg md:text-xl max-w-2xl mx-auto',
            isDark ? 'text-gray-400' : 'text-amber-700/80'
          )}>
            每一本书，都是思想的结晶；每一页，都是智慧的积累
          </p>

          {/* 统计数据 */}
          <div className="flex justify-center gap-8 mt-8">
            {[
              { label: '藏书', value: shelves.reduce((acc, s) => acc + s.books.length, 0) },
              { label: '分类', value: shelves.length },
              { label: '私密', value: shelves.filter(s => s.privacy === 'private').length },
            ].map((stat, index) => (
              <div 
                key={index}
                className={cn(
                  'text-center px-6 py-3 rounded-xl backdrop-blur-sm border transition-colors',
                  isDark 
                    ? 'bg-gray-800/30 border-gray-700/30' 
                    : 'bg-white/30 border-amber-200/30'
                )}
              >
                <div className={cn(
                  'text-2xl font-bold',
                  isDark ? 'text-amber-400' : 'text-amber-600'
                )}>
                  {stat.value}
                </div>
                <div className={cn(
                  'text-xs',
                  isDark ? 'text-gray-500' : 'text-gray-600'
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
                  ? 'bg-gradient-to-r from-transparent via-purple-500/50 to-transparent' 
                  : 'bg-gradient-to-r from-transparent via-amber-400 to-transparent'
              )} />
              <span className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2',
                isDark 
                  ? 'bg-purple-900/50 text-purple-300 border border-purple-500/30' 
                  : 'bg-amber-200 text-amber-800'
              )}>
                <span>🔐</span>
                私密跃层
              </span>
              <div className={cn(
                'h-px flex-1',
                isDark 
                  ? 'bg-gradient-to-r from-transparent via-purple-500/50 to-transparent' 
                  : 'bg-gradient-to-r from-transparent via-amber-400 to-transparent'
              )} />
            </div>

            {/* 跃层书架 */}
            <div className={cn(
              'relative rounded-2xl p-8 border-2 transition-colors duration-300',
              isDark 
                ? 'bg-gradient-to-br from-purple-900/20 to-gray-800/50 border-purple-500/30' 
                : 'bg-gradient-to-br from-amber-100/80 to-orange-50/50 border-amber-300/50'
            )}>
              {/* 阁楼顶部装饰 */}
              <div className={cn(
                'absolute -top-3 left-8 right-8 h-6 rounded-t-xl transition-colors',
                isDark 
                  ? 'bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700' 
                  : 'bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700'
              )} />
              
              {/* 装饰：楼梯 */}
              <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-1.5 hidden lg:flex">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'w-6 h-3 rounded-sm shadow-lg transition-colors',
                      isDark 
                        ? 'bg-gradient-to-r from-gray-600 to-gray-500' 
                        : 'bg-gradient-to-r from-amber-600 to-amber-500'
                    )}
                    style={{ marginLeft: `${i * 10}px` }}
                  />
                ))}
              </div>

              {/* 阁楼窗户装饰 */}
              <div className={cn(
                  'absolute top-4 right-8 w-16 h-16 rounded-full border-4 opacity-30 hidden md:block',
                  isDark ? 'border-purple-400' : 'border-amber-500'
                )}
              >
                <div className={cn(
                  'absolute inset-2 rounded-full',
                  isDark ? 'bg-purple-400/20' : 'bg-amber-500/20'
                )} />
              </div>

              {loftShelves.map((shelf) => (
                <div key={shelf.id} className="mb-10 last:mb-0 relative">
                  <div className="flex items-center gap-3 mb-5">
                    <span className={cn(
                      'text-sm font-semibold',
                      isDark ? 'text-purple-300' : 'text-amber-700'
                    )}>
                      {shelf.name}
                    </span>
                    {shelf.privacy === 'private' && (
                      <span className={cn(
                        'px-2.5 py-1 text-xs rounded-full flex items-center gap-1',
                        isDark 
                          ? 'bg-red-900/50 text-red-300 border border-red-500/30' 
                          : 'bg-red-100 text-red-600'
                      )}>
                        🔒 需密码
                      </span>
                    )}
                  </div>
                  
                  {/* 书架隔板 */}
                  <div className={cn(
                    'relative rounded-xl p-5 shadow-inner transition-colors',
                    isDark 
                      ? 'bg-gray-800/50 border border-gray-700/50' 
                      : 'bg-white/50 border border-amber-100'
                  )}>
                    {/* 木纹效果 */}
                    <div className={cn(
                      'absolute inset-0 opacity-10 rounded-xl',
                      isDark 
                        ? 'bg-gradient-to-r from-transparent via-purple-500 to-transparent' 
                        : 'bg-gradient-to-r from-transparent via-amber-600 to-transparent'
                    )} />
                    
                    <div className="relative flex items-end gap-4 min-h-[300px] overflow-x-auto pb-4">
                      {shelf.books.map((book) => (
                        <Book key={book.id} {...book} isDark={isDark} />
                      ))}
                    </div>
                  </div>

                  {/* 书架底部装饰 */}
                  <div className={cn(
                    'h-5 rounded-b-xl shadow-xl mt-2 relative overflow-hidden',
                    isDark 
                      ? 'bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700' 
                      : 'bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700'
                  )}>
                    <div className={cn(
                      'absolute inset-0 opacity-20',
                      isDark 
                        ? 'bg-gradient-to-r from-transparent via-purple-400 to-transparent' 
                        : 'bg-gradient-to-r from-transparent via-amber-400 to-transparent'
                    )} />
                  </div>
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
                ? 'bg-gradient-to-r from-transparent via-amber-500/50 to-transparent' 
                : 'bg-gradient-to-r from-transparent via-amber-400 to-transparent'
            )} />
            <span className={cn(
              'px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2',
              isDark 
                ? 'bg-amber-900/30 text-amber-300 border border-amber-500/30' 
                : 'bg-amber-200 text-amber-800'
            )}>
              <span>📖</span>
              主藏书区
            </span>
            <div className={cn(
              'h-px flex-1',
              isDark 
                ? 'bg-gradient-to-r from-transparent via-amber-500/50 to-transparent' 
                : 'bg-gradient-to-r from-transparent via-amber-400 to-transparent'
            )} />
          </div>

          {mainShelves.map((shelf) => (
            <div key={shelf.id} className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <span className={cn(
                  'text-sm font-semibold',
                  isDark ? 'text-amber-300' : 'text-amber-700'
                )}>
                  {shelf.name}
                </span>
                <span className={cn(
                  'text-xs px-2 py-0.5 rounded-full',
                  isDark 
                    ? 'bg-gray-800 text-gray-400' 
                    : 'bg-amber-100 text-amber-600'
                )}>
                  {shelf.books.length} 本
                </span>
              </div>
              
              {/* 书架隔板 */}
              <div className={cn(
                'relative rounded-xl p-6 shadow-inner transition-colors border',
                isDark 
                  ? 'bg-gray-800/50 border-gray-700/30' 
                  : 'bg-white/70 border-amber-100/50'
              )}>
                {/* 木纹效果 */}
                <div className={cn(
                  'absolute inset-0 opacity-5 rounded-xl',
                  isDark 
                    ? 'bg-gradient-to-r from-transparent via-amber-500 to-transparent' 
                    : 'bg-gradient-to-r from-transparent via-amber-800 to-transparent'
                )} />
                
                <div className="relative flex items-end gap-3 min-h-[280px] overflow-x-auto pb-3 flex-wrap">
                  {shelf.books.map((book) => (
                    <Book key={book.id} {...book} isDark={isDark} />
                  ))}
                </div>
              </div>

              {/* 书架底部装饰 */}
              <div className={cn(
                'h-6 rounded-b-xl shadow-xl mt-2 relative overflow-hidden',
                isDark 
                  ? 'bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700' 
                  : 'bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800'
              )}>
                {/* 木纹纹理 */}
                <div className="absolute inset-0 opacity-30">
                  <div className={cn(
                    'absolute inset-0',
                    isDark 
                      ? 'bg-gradient-to-r from-transparent via-amber-500/30 to-transparent' 
                      : 'bg-gradient-to-r from-transparent via-amber-400 to-transparent'
                  )} />
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'absolute h-px',
                        isDark ? 'bg-gray-500/30' : 'bg-amber-900/20'
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
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white/50 border-amber-200/50'
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
                'font-semibold',
                isDark ? 'text-amber-400' : 'text-amber-700'
              )}>
                AI 跳马
              </span>
            </div>
            <p className={cn(
              'text-sm',
              isDark ? 'text-gray-500' : 'text-gray-600'
            )}>
              书架上的每一本书，都是思维的结晶
            </p>
            <p className={cn(
              'text-xs mt-2',
              isDark ? 'text-gray-600' : 'text-gray-400'
            )}>
              aitiaoma.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
