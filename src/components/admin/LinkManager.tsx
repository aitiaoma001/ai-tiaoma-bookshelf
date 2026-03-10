'use client';

import React, { useState } from 'react';
import { useStudy } from '@/store/StudyContext';
import { ExternalLink } from '@/types/study';

const iconOptions = ['⟨⟩', '✦', '◈', '✉', '★', '◇', '◆', '●', '○', '♦'];

export default function LinkManager() {
  const { links, addLink, updateLink, deleteLink } = useStudy();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    icon: '✦',
  });

  const handleAddLink = () => {
    if (!formData.title.trim()) return;
    addLink({
      title: formData.title,
      url: formData.url,
      icon: formData.icon,
    });
    setFormData({ title: '', url: '', icon: '✦' });
    setShowAddForm(false);
  };

  const handleUpdateLink = (id: string) => {
    updateLink(id, formData);
    setEditingId(null);
    setFormData({ title: '', url: '', icon: '✦' });
  };

  const startEdit = (link: ExternalLink) => {
    setEditingId(link.id);
    setFormData({
      title: link.title,
      url: link.url,
      icon: link.icon,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#D4A574]">外部链接</h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-[#5D4037] text-[#D4A574] rounded-lg hover:bg-[#6B4423] transition-colors"
        >
          {showAddForm ? '取消' : '+ 添加链接'}
        </button>
      </div>

      {/* 添加表单 */}
      {showAddForm && (
        <div className="bg-[#2D1F0F] p-4 rounded-lg border border-[#5D4037] space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#8B7355] mb-1">标题</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 bg-[#1A1208] border border-[#5D4037] rounded text-[#D4A574] focus:outline-none focus:border-[#D4A574]"
                placeholder="链接标题"
              />
            </div>
            <div>
              <label className="block text-sm text-[#8B7355] mb-1">URL</label>
              <input
                type="text"
                value={formData.url}
                onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                className="w-full px-3 py-2 bg-[#1A1208] border border-[#5D4037] rounded text-[#D4A574] focus:outline-none focus:border-[#D4A574]"
                placeholder="https://..."
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-[#8B7355] mb-2">图标</label>
            <div className="flex gap-2">
              {iconOptions.map((icon) => (
                <button
                  key={icon}
                  onClick={() => setFormData(prev => ({ ...prev, icon }))}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-all ${
                    formData.icon === icon
                      ? 'bg-[#D4A574] text-[#1A1208]'
                      : 'bg-[#3D2A15] text-[#D4A574] hover:bg-[#5D4037]'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-[#8B7355] hover:text-[#D4A574] transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleAddLink}
              className="px-4 py-2 bg-[#D4A574] text-[#1A1208] rounded-lg hover:bg-[#E8C89E] transition-colors font-medium"
            >
              添加
            </button>
          </div>
        </div>
      )}

      {/* 链接列表 */}
      <div className="space-y-2">
        {links.map((link) => (
          <div
            key={link.id}
            className="bg-[#2D1F0F] p-3 rounded-lg border border-[#3D2A15] flex items-center gap-3"
          >
            <span className="text-xl w-8 text-center">{link.icon}</span>
            
            {editingId === link.id ? (
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="flex-1 px-2 py-1 bg-[#1A1208] border border-[#5D4037] rounded text-[#D4A574] text-sm"
                />
                <input
                  type="text"
                  value={formData.url}
                  onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                  className="flex-1 px-2 py-1 bg-[#1A1208] border border-[#5D4037] rounded text-[#D4A574] text-sm"
                />
              </div>
            ) : (
              <div className="flex-1 min-w-0">
                <div className="text-[#D4A574] font-medium">{link.title}</div>
                <div className="text-[#8B7355] text-sm truncate">{link.url}</div>
              </div>
            )}

            <div className="flex gap-1 flex-shrink-0">
              {editingId === link.id ? (
                <>
                  <button
                    onClick={() => handleUpdateLink(link.id)}
                    className="p-2 text-green-500 hover:bg-green-500/20 rounded transition-colors"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setFormData({ title: '', url: '', icon: '✦' });
                    }}
                    className="p-2 text-[#8B7355] hover:bg-[#3D2A15] rounded transition-colors"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(link)}
                    className="p-2 text-[#8B7355] hover:text-[#D4A574] hover:bg-[#3D2A15] rounded transition-colors"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => deleteLink(link.id)}
                    className="p-2 text-[#8B7355] hover:text-red-400 hover:bg-red-400/20 rounded transition-colors"
                  >
                    🗑
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
