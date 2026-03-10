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
}

const colorMap: Record<string, string> = {
  red: 'from-red-600 to-red-800',
  blue: 'from-blue-600 to-blue-800',
  green: 'from-green-600 to-green-800',
  purple: 'from-purple-600 to-purple-800',
  amber: 'from-amber-600 to-amber-800',
  pink: 'from-pink-600 to-pink-800',
  teal: 'from-teal-600 to-teal-800',
  indigo: 'from-indigo-600 to-indigo-800',
  gray: 'from-gray-600 to-gray-800',
};

const thicknessMap = {
  thin: 'w-12',
  medium: 'w-16',
  thick: 'w-24',
};

const heightMap = {
  short: 'h-32',
  medium: 'h-40',
  tall: 'h-52',
};

const importanceStyles = {
  low: 'shadow-sm',
  medium: 'shadow-md ring-1 ring-amber-400/30',
  high: 'shadow-xl ring-2 ring-amber-500/50 relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-amber-300/20 before:to-transparent before:pointer-events-none',
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

  return (
    <div
      className={cn(
        'relative cursor-pointer transition-all duration-300 transform-gpu',
        angle === 'tilted' && 'rotate-6',
        angle === 'stacked' && 'rotate-3 translate-y-2',
        isHovered && 'scale-105 z-10',
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* 书本主体 */}
      <div
        className={cn(
          'relative bg-gradient-to-b rounded-sm flex flex-col justify-between overflow-hidden transition-all duration-300',
          colorMap[color],
          thicknessMap[thickness],
          heightMap[height],
          importanceStyles[importance],
          !isUnlocked && 'opacity-60',
        )}
      >
        {/* 书脊装饰 */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-black/30 via-white/20 to-black/30" />
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-black/30 via-white/20 to-black/30" />
        
        {/* 侧边阴影 */}
        <div className="absolute left-0 inset-y-0 w-2 bg-gradient-to-r from-black/40 to-transparent" />
        
        {/* 书名区域 */}
        <div className="flex-1 flex items-center justify-center p-2 rotate-180" style={{ writingMode: 'vertical-rl' }}>
          <span
            className={cn(
              'text-xs font-medium text-white transition-all duration-300',
              !showTitle && 'blur-sm select-none',
              isPrivate && !isUnlocked && 'blur-md',
            )}
          >
            {showTitle || !isPrivate ? title : '🔒 私密内容'}
          </span>
        </div>

        {/* 书签 */}
        {hasBookmark && (
          <div className="absolute -top-1 right-2 w-2 h-8 bg-gradient-to-b from-amber-400 to-amber-600 shadow-md transform rotate-12" />
        )}

        {/* 私密锁图标 */}
        {(isPrivate || isSemiPrivate) && !isUnlocked && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Lock className="w-4 h-4 text-white/70" />
          </div>
        )}

        {/* 解锁状态图标 */}
        {isPrivate && isUnlocked && (
          <div className="absolute top-2 right-1">
            <LockOpen className="w-3 h-3 text-white/80" />
          </div>
        )}

        {/* 悬停效果 */}
        {isHovered && isUnlocked && (
          <div className="absolute inset-0 bg-white/10 pointer-events-none" />
        )}
      </div>

      {/* 密码输入框 */}
      {showPasswordInput && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
            placeholder="输入密码"
            className="px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            autoFocus
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePasswordSubmit();
            }}
            className="ml-2 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            解锁
          </button>
        </div>
      )}
    </div>
  );
}
