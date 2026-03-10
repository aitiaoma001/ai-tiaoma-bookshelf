'use client';

import { useState } from 'react';
import { Lock, LockOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BookProps {
  id: string;
  title: string;
  link: string;
  color?: string;
  thickness?: 'thin' | 'medium' | 'thick';
  height?: 'short' | 'medium' | 'tall';
  importance?: 'low' | 'medium' | 'high';
  privacy?: 'public' | 'semi-private' | 'private';
  angle?: 'straight' | 'tilted' | 'stacked';
  hasBookmark?: boolean;
  password?: string;
  isDark?: boolean;
}

// 鲜艳配色 - 与深色背景形成强对比
const colorMap: Record<string, { light: string; dark: string }> = {
  red: { 
    light: 'from-rose-400 via-red-500 to-rose-600', 
    dark: 'from-rose-300 via-red-400 to-rose-500' 
  },
  blue: { 
    light: 'from-sky-400 via-blue-500 to-indigo-600', 
    dark: 'from-sky-300 via-blue-400 to-indigo-500' 
  },
  green: { 
    light: 'from-emerald-400 via-green-500 to-teal-600', 
    dark: 'from-emerald-300 via-green-400 to-teal-500' 
  },
  purple: { 
    light: 'from-fuchsia-400 via-purple-500 to-violet-600', 
    dark: 'from-fuchsia-300 via-purple-400 to-violet-500' 
  },
  amber: { 
    light: 'from-yellow-400 via-amber-500 to-orange-500', 
    dark: 'from-yellow-300 via-amber-400 to-orange-400' 
  },
  pink: { 
    light: 'from-pink-400 via-rose-500 to-pink-600', 
    dark: 'from-pink-300 via-rose-400 to-pink-500' 
  },
  teal: { 
    light: 'from-cyan-400 via-teal-500 to-emerald-600', 
    dark: 'from-cyan-300 via-teal-400 to-emerald-500' 
  },
  indigo: { 
    light: 'from-violet-400 via-indigo-500 to-blue-600', 
    dark: 'from-violet-300 via-indigo-400 to-blue-500' 
  },
  gray: { 
    light: 'from-slate-400 via-gray-500 to-zinc-600', 
    dark: 'from-slate-300 via-gray-400 to-zinc-500' 
  },
};

const thicknessMap = {
  thin: 'w-12',
  medium: 'w-16',
  thick: 'w-20',
};

const heightMap = {
  short: 'h-32',
  medium: 'h-40',
  tall: 'h-52',
};

export default function Book({
  title,
  link,
  color = 'blue',
  thickness = 'medium',
  height = 'medium',
  importance = 'medium',
  privacy = 'public',
  angle = 'straight',
  hasBookmark = false,
  password,
  isDark = true,
}: BookProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(privacy === 'public');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const isPrivate = privacy === 'private';
  const isSemiPrivate = privacy === 'semi-private';
  const showTitle = isUnlocked || (isSemiPrivate && isHovered);

  const handleClick = () => {
    if (isPrivate && !isUnlocked) {
      setShowPasswordInput(true);
    } else if (isUnlocked && link) {
      window.open(link, '_blank');
    }
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === password) {
      setIsUnlocked(true);
      setShowPasswordInput(false);
    } else {
      alert('密码错误');
      setPasswordInput('');
    }
  };

  const bookColor = isDark ? colorMap[color]?.dark : colorMap[color]?.light;

  return (
    <div
      className={cn(
        'relative cursor-pointer transition-all duration-300 transform-gpu',
        angle === 'tilted' && 'rotate-3 hover:rotate-0',
        angle === 'stacked' && 'rotate-6 translate-y-2 hover:rotate-0 hover:translate-y-0',
        isHovered && 'scale-105 z-10 -translate-y-1',
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* 书本主体 */}
      <div
        className={cn(
          'relative rounded-sm flex flex-col justify-between overflow-hidden transition-all duration-300',
          bookColor,
          thicknessMap[thickness],
          heightMap[height],
          // 立体阴影效果 + 外发光
          'shadow-[3px_3px_8px_rgba(0,0,0,0.5),6px_6px_16px_rgba(0,0,0,0.4),0_0_20px_rgba(255,255,255,0.1)]',
          'hover:shadow-[5px_5px_12px_rgba(0,0,0,0.6),10px_10px_24px_rgba(0,0,0,0.4),0_0_30px_rgba(255,255,255,0.15)]',
          importance === 'high' && 'ring-1 ring-white/50 shadow-[0_0_25px_rgba(255,255,255,0.2)]',
          !isUnlocked && 'opacity-70',
        )}
      >
        {/* 顶部高光 */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-black/30 via-white/30 to-black/30" />
        {/* 底部阴影 */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-black/40 via-white/10 to-black/40" />
        
        {/* 书脊立体效果 */}
        <div className="absolute left-0 inset-y-0 w-2.5 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
        {/* 右侧高光 */}
        <div className="absolute right-0 inset-y-0 w-1 bg-gradient-to-l from-white/30 to-transparent" />
        
        {/* 科技感光泽 */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none" />

        {/* 高重要度装饰 - 发光效果 */}
        {importance === 'high' && isDark && (
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(6,182,212,0.2)]" />
        )}
        
        {/* 书名区域 */}
        <div className="flex-1 flex items-center justify-center p-1.5 rotate-180" style={{ writingMode: 'vertical-rl' }}>
          <span
            className={cn(
              'text-[11px] font-bold text-white transition-all duration-300',
              '[text-shadow:1px_1px_2px_rgba(0,0,0,0.9),0_0_8px_rgba(0,0,0,0.5)]',
              !showTitle && 'blur-sm select-none',
              isPrivate && !isUnlocked && 'blur-md',
              title.length > 8 && 'text-[10px]',
              title.length > 12 && 'text-[9px]',
            )}
          >
            {showTitle || !isPrivate ? title : '🔒'}
          </span>
        </div>

        {/* 书签 */}
        {hasBookmark && (
          <div className="absolute -top-0.5 right-2 w-1.5 h-6 bg-gradient-to-b from-cyan-400 to-cyan-600 shadow-lg transform -rotate-6 rounded-b-sm" />
        )}

        {/* 私密锁图标 */}
        {(isPrivate || isSemiPrivate) && !isUnlocked && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 rounded-full p-1.5 backdrop-blur-sm">
            <Lock className="w-3 h-3 text-white/90" />
          </div>
        )}

        {/* 解锁状态图标 */}
        {isPrivate && isUnlocked && (
          <div className="absolute top-1.5 right-1 bg-black/40 rounded-full p-0.5">
            <LockOpen className="w-2 h-2 text-white/80" />
          </div>
        )}

        {/* 悬停效果 */}
        {isHovered && isUnlocked && (
          <div className="absolute inset-0 bg-white/10 pointer-events-none" />
        )}
      </div>

      {/* 悬停底部阴影 */}
      {isHovered && (
        <div className={cn(
          'absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-2 blur-md rounded-full',
          isDark ? 'bg-black/50' : 'bg-black/20'
        )} />
      )}

      {/* 密码输入框 */}
      {showPasswordInput && (
        <div 
          className={cn(
            'absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50 p-3 rounded-lg shadow-xl border',
            isDark 
              ? 'bg-slate-800 border-cyan-500/30' 
              : 'bg-white border-blue-200'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center mb-2">
            <Lock className={cn(
              'w-4 h-4 mx-auto mb-1',
              isDark ? 'text-cyan-400' : 'text-blue-500'
            )} />
            <p className={cn(
              'text-xs',
              isDark ? 'text-slate-300' : 'text-slate-600'
            )}>
              输入密码
            </p>
          </div>
          <div className="flex gap-1.5">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              className={cn(
                'px-2 py-1 text-xs border rounded focus:outline-none w-20',
                isDark 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-slate-200 text-slate-700'
              )}
              autoFocus
            />
            <button
              onClick={(e) => { e.stopPropagation(); handlePasswordSubmit(); }}
              className={cn(
                'px-2 py-1 text-xs rounded font-medium',
                isDark 
                  ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              )}
            >
              解锁
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
