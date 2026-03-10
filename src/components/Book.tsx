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

// 柔和的配色方案
const colorMap: Record<string, { light: string; dark: string }> = {
  red: { 
    light: 'from-rose-400 via-rose-500 to-rose-600', 
    dark: 'from-rose-600 via-rose-700 to-rose-800' 
  },
  blue: { 
    light: 'from-sky-400 via-sky-500 to-sky-600', 
    dark: 'from-sky-700 via-sky-800 to-sky-900' 
  },
  green: { 
    light: 'from-emerald-400 via-emerald-500 to-emerald-600', 
    dark: 'from-emerald-700 via-emerald-800 to-emerald-900' 
  },
  purple: { 
    light: 'from-violet-400 via-violet-500 to-violet-600', 
    dark: 'from-violet-700 via-violet-800 to-violet-900' 
  },
  amber: { 
    light: 'from-amber-400 via-amber-500 to-amber-600', 
    dark: 'from-amber-700 via-amber-800 to-amber-900' 
  },
  pink: { 
    light: 'from-pink-400 via-pink-500 to-pink-600', 
    dark: 'from-pink-700 via-pink-800 to-pink-900' 
  },
  teal: { 
    light: 'from-teal-400 via-teal-500 to-teal-600', 
    dark: 'from-teal-700 via-teal-800 to-teal-900' 
  },
  indigo: { 
    light: 'from-indigo-400 via-indigo-500 to-indigo-600', 
    dark: 'from-indigo-700 via-indigo-800 to-indigo-900' 
  },
  gray: { 
    light: 'from-slate-400 via-slate-500 to-slate-600', 
    dark: 'from-slate-600 via-slate-700 to-slate-800' 
  },
};

const thicknessMap = {
  thin: 'w-14',
  medium: 'w-18',
  thick: 'w-24',
};

const heightMap = {
  short: 'h-36',
  medium: 'h-44',
  tall: 'h-56',
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
  isDark = false,
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
        isHovered && 'scale-105 z-10 -translate-y-2',
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
          importance === 'high' && 'ring-1 ring-stone-400/50 shadow-md',
          importance === 'medium' && 'shadow-sm',
          importance === 'low' && 'shadow-sm',
          !isUnlocked && 'opacity-70',
        )}
      >
        {/* 书脊装饰 */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-black/20 via-white/10 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-black/20 via-white/10 to-black/20" />
        
        {/* 侧边阴影 - 模拟书脊厚度 */}
        <div className="absolute left-0 inset-y-0 w-2.5 bg-gradient-to-r from-black/30 via-black/15 to-transparent" />
        
        {/* 柔和纹理 */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />
        </div>

        {/* 高重要度装饰 */}
        {importance === 'high' && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />
          </div>
        )}
        
        {/* 书名区域 */}
        <div className="flex-1 flex items-center justify-center p-2 rotate-180" style={{ writingMode: 'vertical-rl' }}>
          <span
            className={cn(
              'text-xs font-medium text-white/95 transition-all duration-300',
              !showTitle && 'blur-sm select-none',
              isPrivate && !isUnlocked && 'blur-md',
              title.length > 10 && 'text-[10px]',
            )}
          >
            {showTitle || !isPrivate ? title : '🔒 私密'}
          </span>
        </div>

        {/* 书签 */}
        {hasBookmark && (
          <div className="absolute -top-1 right-3 w-2 h-8 bg-gradient-to-b from-amber-400 to-amber-600 shadow-sm transform -rotate-6 rounded-b-sm" />
        )}

        {/* 私密锁图标 */}
        {(isPrivate || isSemiPrivate) && !isUnlocked && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/20 rounded-full p-1.5 backdrop-blur-sm">
            <Lock className="w-3.5 h-3.5 text-white/90" />
          </div>
        )}

        {/* 解锁状态图标 */}
        {isPrivate && isUnlocked && (
          <div className="absolute top-2 right-1.5 bg-black/20 rounded-full p-0.5">
            <LockOpen className="w-2.5 h-2.5 text-white/80" />
          </div>
        )}

        {/* 悬停效果 */}
        {isHovered && isUnlocked && (
          <div className="absolute inset-0 bg-white/5 pointer-events-none" />
        )}
      </div>

      {/* 悬停时的阴影 */}
      {isHovered && (
        <div className={cn(
          'absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-2 blur-md rounded-full',
          isDark ? 'bg-black/30' : 'bg-black/10'
        )} />
      )}

      {/* 密码输入框 */}
      {showPasswordInput && (
        <div 
          className={cn(
            'absolute top-full left-1/2 transform -translate-x-1/2 mt-3 z-50 p-4 rounded-xl shadow-xl border backdrop-blur-sm',
            isDark 
              ? 'bg-slate-800 border-slate-700' 
              : 'bg-stone-50 border-stone-200'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center mb-3">
            <Lock className={cn(
              'w-5 h-5 mx-auto mb-1',
              isDark ? 'text-stone-400' : 'text-stone-500'
            )} />
            <p className={cn(
              'text-xs',
              isDark ? 'text-stone-400' : 'text-stone-500'
            )}>
              请输入密码解锁
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              placeholder="密码"
              className={cn(
                'px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-1 w-24',
                isDark 
                  ? 'bg-slate-700 border-slate-600 text-stone-200 placeholder-stone-500 focus:ring-stone-500' 
                  : 'bg-white border-stone-200 text-stone-700 placeholder-stone-400 focus:ring-stone-400'
              )}
              autoFocus
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePasswordSubmit();
              }}
              className={cn(
                'px-3 py-1.5 text-sm rounded-lg transition-colors font-medium',
                isDark 
                  ? 'bg-slate-700 text-stone-200 hover:bg-slate-600' 
                  : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
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
