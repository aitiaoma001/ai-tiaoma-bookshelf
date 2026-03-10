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
    light: 'from-rose-500 via-rose-600 to-rose-700', 
    dark: 'from-rose-600 via-rose-700 to-rose-800' 
  },
  blue: { 
    light: 'from-sky-500 via-sky-600 to-sky-700', 
    dark: 'from-sky-600 via-sky-700 to-sky-800' 
  },
  green: { 
    light: 'from-emerald-500 via-emerald-600 to-emerald-700', 
    dark: 'from-emerald-600 via-emerald-700 to-emerald-800' 
  },
  purple: { 
    light: 'from-violet-500 via-violet-600 to-violet-700', 
    dark: 'from-violet-600 via-violet-700 to-violet-800' 
  },
  amber: { 
    light: 'from-amber-500 via-amber-600 to-amber-700', 
    dark: 'from-amber-600 via-amber-700 to-amber-800' 
  },
  pink: { 
    light: 'from-pink-500 via-pink-600 to-pink-700', 
    dark: 'from-pink-600 via-pink-700 to-pink-800' 
  },
  teal: { 
    light: 'from-teal-500 via-teal-600 to-teal-700', 
    dark: 'from-teal-600 via-teal-700 to-teal-800' 
  },
  indigo: { 
    light: 'from-indigo-500 via-indigo-600 to-indigo-700', 
    dark: 'from-indigo-600 via-indigo-700 to-indigo-800' 
  },
  gray: { 
    light: 'from-slate-500 via-slate-600 to-slate-700', 
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
          // 立体阴影效果
          'shadow-[4px_4px_8px_rgba(0,0,0,0.3),8px_8px_16px_rgba(0,0,0,0.2),-1px_-1px_4px_rgba(255,255,255,0.1)]',
          'hover:shadow-[6px_6px_12px_rgba(0,0,0,0.4),12px_12px_24px_rgba(0,0,0,0.25),-2px_-2px_6px_rgba(255,255,255,0.15)]',
          importance === 'high' && 'ring-1 ring-white/30',
          !isUnlocked && 'opacity-70',
        )}
      >
        {/* 书脊装饰 - 顶部高光 */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-black/30 via-white/20 to-black/30" />
        {/* 书脊装饰 - 底部阴影 */}
        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-black/40 via-white/10 to-black/40" />
        
        {/* 侧边立体效果 - 书脊厚度 */}
        <div className="absolute left-0 inset-y-0 w-3 bg-gradient-to-r from-black/50 via-black/25 to-transparent" />
        {/* 右侧高光 */}
        <div className="absolute right-0 inset-y-0 w-1 bg-gradient-to-l from-white/20 to-transparent" />
        
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
              'text-xs font-bold text-white transition-all duration-300 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)]',
              !showTitle && 'blur-sm select-none',
              isPrivate && !isUnlocked && 'blur-md',
              title.length > 10 && 'text-[10px]',
              title.length > 15 && 'text-[9px]',
            )}
          >
            {showTitle || !isPrivate ? title : '🔒 私密'}
          </span>
        </div>

        {/* 书签 */}
        {hasBookmark && (
          <div className="absolute -top-1 right-3 w-2 h-8 bg-gradient-to-b from-amber-400 to-amber-600 shadow-md transform -rotate-6 rounded-b-sm" />
        )}

        {/* 私密锁图标 */}
        {(isPrivate || isSemiPrivate) && !isUnlocked && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/40 rounded-full p-1.5 backdrop-blur-sm shadow-lg">
            <Lock className="w-3.5 h-3.5 text-white drop-shadow" />
          </div>
        )}

        {/* 解锁状态图标 */}
        {isPrivate && isUnlocked && (
          <div className="absolute top-2 right-1.5 bg-black/30 rounded-full p-0.5 shadow">
            <LockOpen className="w-2.5 h-2.5 text-white/90" />
          </div>
        )}

        {/* 悬停效果 */}
        {isHovered && isUnlocked && (
          <div className="absolute inset-0 bg-white/10 pointer-events-none" />
        )}
      </div>

      {/* 悬停时的底部阴影 */}
      {isHovered && (
        <div className={cn(
          'absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-4/5 h-3 blur-md rounded-full',
          isDark ? 'bg-black/40' : 'bg-black/20'
        )} />
      )}

      {/* 密码输入框 */}
      {showPasswordInput && (
        <div 
          className={cn(
            'absolute top-full left-1/2 transform -translate-x-1/2 mt-3 z-50 p-4 rounded-xl shadow-2xl border backdrop-blur-sm',
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
