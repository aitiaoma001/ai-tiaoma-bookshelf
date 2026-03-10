'use client';

import { useState } from 'react';
import Book, { BookProps } from './Book';
import RotatingBookshelf, { LinkItem } from './RotatingBookshelf';
import { cn } from '@/lib/utils';
import { Menu, X, Sun, Moon, Zap } from 'lucide-react';

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
  const [isDark, setIsDark] = useState(true); // 默认深色科技风
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainShelves = shelves.filter((s) => s.level === 'main');
  const loftShelves = shelves.filter((s) => s.level === 'loft');

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={cn(
      'relative w-full min-h-screen transition-colors duration-500 overflow-hidden',
      isDark 
        ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950' 
        : 'bg-gradient-to-b from-slate-100 via-white to-slate-100'
    )}>
      {/* 科技感背景效果 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 网格背景 */}
        <div 
          className={cn(
            'absolute inset-0 opacity-[0.03]',
            isDark ? 'bg-cyan-500' : 'bg-blue-600'
          )}
          style={{
            backgroundImage: `
              linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* 流动光效 */}
        <div className={cn(
          'absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[100px] animate-pulse',
          isDark ? 'bg-cyan-500/20' : 'bg-blue-400/30'
        )} />
        <div className={cn(
          'absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-[80px] animate-pulse delay-1000',
          isDark ? 'bg-blue-500/15' : 'bg-cyan-300/30'
        )} />
        <div className={cn(
          'absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full blur-[60px] animate-pulse delay-500',
          isDark ? 'bg-indigo-500/15' : 'bg-indigo-300/30'
        )} />

        {/* 扫描线效果 */}
        <div className={cn(
          'absolute inset-0 opacity-[0.02]',
          isDark ? 'bg-gradient-to-b from-transparent via-cyan-400 to-transparent' : 'bg-gradient-to-b from-transparent via-blue-400 to-transparent'
        )}
        style={{
          animation: 'scanline 8s linear infinite',
          backgroundSize: '100% 4px'
        }}
        />
      </div>

      {/* 导航栏 */}
      <nav className={cn(
        'sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300',
        isDark 
          ? 'bg-slate-950/80 border-cyan-500/20' 
          : 'bg-white/80 border-blue-200/50'
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className={cn(
                'relative w-8 h-8 rounded-lg overflow-hidden shadow-lg',
                'ring-2 ring-cyan-400/50 shadow-cyan-500/30'
              )}>
                <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className={cn(
                  'font-bold text-sm',
                  isDark ? 'text-cyan-400' : 'text-blue-600'
                )}>
                  AI 跳马
                </span>
                <span className={cn(
                  'text-xs ml-2',
                  isDark ? 'text-slate-500' : 'text-slate-400'
                )}>
                  aitiaoma.com
                </span>
              </div>
            </div>

            {/* 导航链接 */}
            <div className="hidden md:flex items-center gap-4">
              <a href="#loft" className={cn(
                'text-xs transition-colors',
                isDark ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-500 hover:text-blue-600'
              )}>
                私密跃层
              </a>
              <a href="#main" className={cn(
                'text-xs transition-colors',
                isDark ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-500 hover:text-blue-600'
              )}>
                主藏书区
              </a>
              <a href="#links" className={cn(
                'text-xs transition-colors',
                isDark ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-500 hover:text-blue-600'
              )}>
                链接
              </a>
              <button
                onClick={toggleTheme}
                className={cn(
                  'p-1.5 rounded-full transition-colors',
                  isDark 
                    ? 'bg-slate-800 text-cyan-400 hover:bg-slate-700' 
                    : 'bg-slate-100 text-blue-600 hover:bg-slate-200'
                )}
              >
                {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* 移动端菜单 */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                'md:hidden p-1.5 rounded-full',
                isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
              )}
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

          {/* 移动菜单 */}
          {isMenuOpen && (
            <div className={cn(
              'md:hidden py-2 border-t',
              isDark ? 'border-slate-800' : 'border-slate-200'
            )}>
              <a href="#loft" className={cn('block py-2 text-xs', isDark ? 'text-slate-400' : 'text-slate-500')}>私密跃层</a>
              <a href="#main" className={cn('block py-2 text-xs', isDark ? 'text-slate-400' : 'text-slate-500')}>主藏书区</a>
              <a href="#links" className={cn('block py-2 text-xs', isDark ? 'text-slate-400' : 'text-slate-500')}>链接</a>
            </div>
          )}
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-4 py-4">
        {/* Hero - 紧凑 */}
        <div className="text-center mb-6">
          <div className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3 border',
            isDark 
              ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' 
              : 'bg-blue-50 border-blue-200 text-blue-600'
          )}>
            <Zap className="w-3 h-3" />
            <span className="text-xs font-medium">思维的殿堂</span>
          </div>
          
          <h1 className={cn(
            'text-xl md:text-2xl font-bold mb-1',
            isDark 
              ? 'bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent' 
              : 'text-slate-800'
          )}>
            我的思维书架
          </h1>
          
          <p className={cn(
            'text-xs',
            isDark ? 'text-slate-500' : 'text-slate-400'
          )}>
            每一本书，都是思想的结晶
          </p>
        </div>

        {/* 跃层区域 */}
        {loftShelves.length > 0 && (
          <div id="loft" className="mb-6 scroll-mt-14">
            <div className="flex items-center gap-2 mb-2">
              <div className={cn(
                'h-px flex-1',
                isDark ? 'bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent' : 'bg-gradient-to-r from-transparent via-blue-300 to-transparent'
              )} />
              <span className={cn(
                'px-2 py-0.5 rounded text-xs flex items-center gap-1',
                isDark 
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' 
                  : 'bg-blue-50 text-blue-600 border border-blue-200'
              )}>
                🔐 私密跃层
              </span>
              <div className={cn(
                'h-px flex-1',
                isDark ? 'bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent' : 'bg-gradient-to-r from-transparent via-blue-300 to-transparent'
              )} />
            </div>

            <div className={cn(
              'relative rounded-xl p-3 border transition-colors',
              isDark 
                ? 'bg-slate-900/50 border-cyan-500/20' 
                : 'bg-white/80 border-blue-200/50'
            )}>
              {/* 科技感边框光效 */}
              <div className={cn(
                'absolute inset-0 rounded-xl pointer-events-none',
                isDark ? 'shadow-[inset_0_1px_1px_rgba(6,182,212,0.1)]' : 'shadow-[inset_0_1px_1px_rgba(59,130,246,0.1)]'
              )} />

              {loftShelves.map((shelf) => (
                <div key={shelf.id} className="mb-4 last:mb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={cn(
                      'text-xs',
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    )}>
                      {shelf.name}
                    </span>
                    {shelf.privacy === 'private' && (
                      <span className={cn(
                        'px-1.5 py-0.5 text-[10px] rounded',
                        isDark 
                          ? 'bg-red-500/20 text-red-400' 
                          : 'bg-red-50 text-red-500'
                      )}>
                        🔒 需密码
                      </span>
                    )}
                  </div>
                  
                  <div className={cn(
                    'relative rounded-lg p-3',
                    isDark ? 'bg-slate-800/50' : 'bg-slate-50'
                  )}>
                    <div className="flex items-end gap-2 min-h-[240px] overflow-x-auto pb-2">
                      {shelf.books.map((book) => (
                        <Book key={book.id} {...book} isDark={isDark} />
                      ))}
                    </div>
                  </div>

                  <div className={cn(
                    'h-2 rounded-b-lg mt-0.5',
                    isDark 
                      ? 'bg-gradient-to-r from-cyan-600/30 via-blue-600/30 to-cyan-600/30' 
                      : 'bg-gradient-to-r from-blue-300 via-blue-200 to-blue-300'
                  )} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 主层书架 */}
        <div id="main" className="scroll-mt-14">
          <div className="flex items-center gap-2 mb-2">
            <div className={cn(
              'h-px flex-1',
              isDark ? 'bg-gradient-to-r from-transparent via-blue-500/50 to-transparent' : 'bg-gradient-to-r from-transparent via-blue-300 to-transparent'
            )} />
            <span className={cn(
              'px-2 py-0.5 rounded text-xs flex items-center gap-1',
              isDark 
                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' 
                : 'bg-blue-50 text-blue-600 border border-blue-200'
            )}>
              📖 主藏书区
            </span>
            <div className={cn(
              'h-px flex-1',
              isDark ? 'bg-gradient-to-r from-transparent via-blue-500/50 to-transparent' : 'bg-gradient-to-r from-transparent via-blue-300 to-transparent'
            )} />
          </div>

          {mainShelves.map((shelf) => (
            <div key={shelf.id} className="mb-5">
              <div className="flex items-center gap-2 mb-1.5">
                <span className={cn(
                  'text-xs',
                  isDark ? 'text-slate-300' : 'text-slate-600'
                )}>
                  {shelf.name}
                </span>
                <span className={cn(
                  'text-[10px] px-1.5 py-0.5 rounded-full',
                  isDark 
                    ? 'bg-slate-800 text-slate-500' 
                    : 'bg-slate-100 text-slate-500'
                )}>
                  {shelf.books.length}
                </span>
              </div>
              
              <div className={cn(
                'relative rounded-lg p-3',
                isDark ? 'bg-slate-800/30' : 'bg-slate-50'
              )}>
                <div className="flex items-end gap-2 min-h-[220px] overflow-x-auto pb-2 flex-wrap">
                  {shelf.books.map((book) => (
                    <Book key={book.id} {...book} isDark={isDark} />
                  ))}
                </div>
              </div>

              <div className={cn(
                'h-2 rounded-b-lg mt-0.5',
                isDark 
                  ? 'bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-blue-600/30' 
                  : 'bg-gradient-to-r from-blue-200 via-indigo-200 to-blue-200'
              )} />
            </div>
          ))}
        </div>

        {/* 底部链接区 */}
        {links.length > 0 && (
          <div id="links" className="scroll-mt-14 mt-6">
            <div className={cn(
              'rounded-xl p-3 border',
              isDark 
                ? 'bg-slate-900/50 border-cyan-500/20' 
                : 'bg-white/80 border-blue-200/50'
            )}>
              <RotatingBookshelf links={links} isDark={isDark} />
            </div>
          </div>
        )}

        {/* 底部 */}
        <div className="mt-8 text-center">
          <div className={cn(
            'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border',
            isDark 
              ? 'bg-slate-900/50 border-cyan-500/20' 
              : 'bg-white/50 border-blue-200/50'
          )}>
            <div className="w-5 h-5 rounded overflow-hidden">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className={cn(
              'text-xs',
              isDark ? 'text-slate-400' : 'text-slate-500'
            )}>
              AI 跳马 · aitiaoma.com
            </span>
          </div>
        </div>
      </div>

      {/* 科技感动画样式 */}
      <style jsx global>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
}
