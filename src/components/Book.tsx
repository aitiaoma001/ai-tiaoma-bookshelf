'use client';

import { useState } from 'react';
import { Lock, LockOpen, Sparkles } from 'lucide-react';
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

const colorMap: Record<string, { light: string; dark: string }> = {
  red: { 
    light: 'from-red-500 via-red-600 to-red-700', 
    dark: 'from-red-600 via-red-700 to-red-800' 
  },
  blue: { 
    light: 'from-blue-500 via-blue-600 to-blue-700', 
    dark: 'from-blue-600 via-blue-700 to-blue-800' 
  },
  green: { 
    light: 'from-emerald-500 via-emerald-600 to-emerald-700', 
    dark: 'from-emerald-600 via-emerald-700 to-emerald-800' 
  },
  purple: { 
    light: 'from-purple-500 via-purple-600 to-purple-700', 
    dark: 'from-purple-600 via-purple-700 to-purple-800' 
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
    light: 'from-gray-500 via-gray-600 to-gray-700', 
    dark: 'from-gray-600 via-gray-700 to-gray-800' 
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
          importance === 'high' && 'ring-2 ring-amber-400/50 shadow-lg shadow-amber-500/20',
          importance === 'medium' && 'shadow-md',
          importance === 'low' && 'shadow-sm',
          !isUnlocked && 'opacity-70 grayscale-[30%]',
        )}
      >
        {/* 书脊装饰 */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-black/40 via-white/30 to-black/40" />
        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-black/40 via-white/30 to-black/40" />
        
        {/* 侧边阴影 - 模拟书脊厚度 */}
        <div className="absolute left-0 inset-y-0 w-3 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
        
        {/* 装饰纹理 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20" />
        </div>

        {/* 高重要度金边效果 */}
        {importance === 'high' && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-300/20 via-transparent to-amber-300/10" />
            <div className="absolute inset-0 ring-1 ring-inset ring-amber-300/30" />
          </div>
        )}
        
        {/* 书名区域 */}
        <div className="flex-1 flex items-center justify-center p-2 rotate-180" style={{ writingMode: 'vertical-rl' }}>
          <span
            className={cn(
              'text-xs font-medium text-white transition-all duration-300 drop-shadow-sm',
              !showTitle && 'blur-sm select-none',
              isPrivate && !isUnlocked && 'blur-md',
              title.length > 10 && 'text-[10px]',
            )}
          >
            {showTitle || !isPrivate ? title : '🔒 私密内容'}
          </span>
        </div>

        {/* 书签 */}
        {hasBookmark && (
          <div className="absolute -top-1 right-3 w-2.5 h-10 bg-gradient-to-b from-amber-400 via-amber-500 to-red-500 shadow-md transform -rotate-6 rounded-b-sm">
            <div className="absolute bottom-0 left-0 right-0 h-2 border-l-4 border-r-4 border-l-transparent border-r-transparent border-b-amber-600" />
          </div>
        )}

        {/* 私密锁图标 */}
        {(isPrivate || isSemiPrivate) && !isUnlocked && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/30 rounded-full p-2 backdrop-blur-sm">
            <Lock className="w-4 h-4 text-white" />
          </div>
        )}

        {/* 解锁状态图标 */}
        {isPrivate && isUnlocked && (
          <div className="absolute top-2 right-1.5 bg-black/30 rounded-full p-1">
            <LockOpen className="w-3 h-3 text-white/80" />
          </div>
        )}

        {/* 悬停效果 */}
        {isHovered && isUnlocked && (
          <>
            <div className="absolute inset-0 bg-white/10 pointer-events-none" />
            {/* 光泽效果 */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
          </>
        )}

        {/* 重要书籍的星星标记 */}
        {importance === 'high' && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
            <Sparkles className="w-3 h-3 text-amber-300 drop-shadow" />
          </div>
        )}
      </div>

      {/* 悬停时的阴影 */}
      {isHovered && (
        <div className={cn(
          'absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-3 blur-md rounded-full',
          isDark ? 'bg-black/40' : 'bg-black/20'
        )} />
      )}

      {/* 密码输入框 */}
      {showPasswordInput && (
        <div 
          className={cn(
            'absolute top-full left-1/2 transform -translate-x-1/2 mt-3 z-50 p-4 rounded-xl shadow-2xl border backdrop-blur-xl',
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-amber-200'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center mb-3">
            <Lock className={cn(
              'w-6 h-6 mx-auto mb-1',
              isDark ? 'text-amber-400' : 'text-amber-600'
            )} />
            <p className={cn(
              'text-xs font-medium',
              isDark ? 'text-gray-300' : 'text-gray-600'
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
                'px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 w-28',
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'
              )}
              autoFocus
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePasswordSubmit();
              }}
              className="px-4 py-2 text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-colors font-medium shadow-md"
            >
              解锁
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
