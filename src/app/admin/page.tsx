'use client';

import React, { useState } from 'react';
import { useStudy } from '@/store/StudyContext';
import BookManager from '@/components/admin/BookManager';
import LayoutManager from '@/components/admin/LayoutManager';
import LinkManager from '@/components/admin/LinkManager';
import Link from 'next/link';

type TabType = 'books' | 'layout' | 'links' | 'brand';

export default function AdminPage() {
  const { brandName, setBrandName, brandSubtitle, setBrandSubtitle, resetToDefault } = useStudy();
  const [activeTab, setActiveTab] = useState<TabType>('books');

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'books', label: '书籍管理', icon: '📚' },
    { id: 'layout', label: '布局管理', icon: '🎨' },
    { id: 'links', label: '外部链接', icon: '🔗' },
    { id: 'brand', label: '品牌设置', icon: '♞' },
  ];

  return (
    <div className="min-h-screen bg-[#1A1208] text-[#F5E6D3]">
      {/* 头部 */}
      <header className="bg-[#2D1F0F] border-b border-[#3D2A15] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-[#D4A574] hover:text-[#E8C89E] transition-colors">
              ← 返回书房
            </Link>
            <h1 className="text-xl font-semibold text-[#D4A574]">后台管理</h1>
          </div>
          <button
            onClick={() => {
              if (confirm('确定要重置所有数据吗？此操作不可撤销。')) {
                resetToDefault();
              }
            }}
            className="px-4 py-2 text-sm text-red-400 border border-red-400/30 rounded-lg hover:bg-red-400/20 transition-colors"
          >
            重置数据
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex gap-6">
          {/* 侧边栏 */}
          <div className="w-48 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                    activeTab === tab.id
                      ? 'bg-[#5D4037] text-[#D4A574]'
                      : 'text-[#8B7355] hover:bg-[#2D1F0F] hover:text-[#D4A574]'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* 主内容区 */}
          <div className="flex-1 bg-[#2D1F0F] rounded-xl p-6 border border-[#3D2A15]">
            {activeTab === 'books' && <BookManager />}
            {activeTab === 'layout' && <LayoutManager />}
            {activeTab === 'links' && <LinkManager />}
            
            {activeTab === 'brand' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-[#D4A574]">品牌设置</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-[#8B7355] mb-2">品牌名称</label>
                    <input
                      type="text"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#1A1208] border border-[#5D4037] rounded-lg text-[#D4A574] text-lg focus:outline-none focus:border-[#D4A574]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-[#8B7355] mb-2">品牌标语</label>
                    <input
                      type="text"
                      value={brandSubtitle}
                      onChange={(e) => setBrandSubtitle(e.target.value)}
                      className="w-full px-4 py-3 bg-[#1A1208] border border-[#5D4037] rounded-lg text-[#D4A574] focus:outline-none focus:border-[#D4A574]"
                    />
                  </div>

                  <div className="pt-4 border-t border-[#3D2A15]">
                    <p className="text-sm text-[#8B7355]">
                      预览：
                    </p>
                    <div className="mt-3 text-right">
                      <div className="text-3xl text-[#D4A574] mb-1">♞</div>
                      <div className="text-2xl font-bold text-[#D4A574]">{brandName}</div>
                      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#D4A574] to-transparent opacity-60 my-2" />
                      <div className="text-sm text-[#8B7355]">{brandSubtitle}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
