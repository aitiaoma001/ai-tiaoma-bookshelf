'use client';

import React, { useState } from 'react';
import { useStudy } from '@/store/StudyContext';
import { Book, bookColors } from '@/types/study';

export default function BookManager() {
  const { books, addBook, updateBook, deleteBook } = useStudy();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    color: '#5D3A1A',
    accent: '#C49A6C',
    location: 'shelf' as Book['location'],
    shelfRow: 1,
  });

  const locationNames: Record<string, string> = {
    shelf: '书架',
    floor: '地上',
    table: '大桌子',
    sideTable: '小桌子',
  };

  const handleAddBook = () => {
    if (!formData.title.trim()) return;
    addBook({
      title: formData.title,
      link: formData.link,
      color: formData.color,
      accent: formData.accent,
      location: formData.location,
      shelfRow: formData.location === 'shelf' ? formData.shelfRow : undefined,
    });
    setFormData({
      title: '',
      link: '',
      color: '#5D3A1A',
      accent: '#C49A6C',
      location: 'shelf',
      shelfRow: 1,
    });
    setShowAddForm(false);
  };

  const handleUpdateBook = (id: string) => {
    updateBook(id, {
      title: formData.title,
      link: formData.link,
      color: formData.color,
      accent: formData.accent,
      location: formData.location,
      shelfRow: formData.location === 'shelf' ? formData.shelfRow : undefined,
    });
    setEditingId(null);
    setFormData({
      title: '',
      link: '',
      color: '#5D3A1A',
      accent: '#C49A6C',
      location: 'shelf',
      shelfRow: 1,
    });
  };

  const startEdit = (book: Book) => {
    setEditingId(book.id);
    setFormData({
      title: book.title,
      link: book.link,
      color: book.color,
      accent: book.accent,
      location: book.location,
      shelfRow: book.shelfRow || 1,
    });
  };

  const handleColorChange = (color: string, accent: string) => {
    setFormData(prev => ({ ...prev, color, accent }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#D4A574]">书籍管理</h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-[#5D4037] text-[#D4A574] rounded-lg hover:bg-[#6B4423] transition-colors"
        >
          {showAddForm ? '取消' : '+ 添加书籍'}
        </button>
      </div>

      {/* 添加表单 */}
      {showAddForm && (
        <div className="bg-[#2D1F0F] p-4 rounded-lg border border-[#5D4037] space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#8B7355] mb-1">书名</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 bg-[#1A1208] border border-[#5D4037] rounded text-[#D4A574] focus:outline-none focus:border-[#D4A574]"
                placeholder="输入书名"
              />
            </div>
            <div>
              <label className="block text-sm text-[#8B7355] mb-1">链接</label>
              <input
                type="text"
                value={formData.link}
                onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                className="w-full px-3 py-2 bg-[#1A1208] border border-[#5D4037] rounded text-[#D4A574] focus:outline-none focus:border-[#D4A574]"
                placeholder="/path 或 https://..."
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#8B7355] mb-1">位置</label>
              <select
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value as Book['location'] }))}
                className="w-full px-3 py-2 bg-[#1A1208] border border-[#5D4037] rounded text-[#D4A574] focus:outline-none focus:border-[#D4A574]"
              >
                <option value="shelf">书架</option>
                <option value="floor">地上</option>
                <option value="table">大桌子</option>
                <option value="sideTable">小桌子</option>
              </select>
            </div>
            {formData.location === 'shelf' && (
              <div>
                <label className="block text-sm text-[#8B7355] mb-1">书架行号</label>
                <select
                  value={formData.shelfRow}
                  onChange={(e) => setFormData(prev => ({ ...prev, shelfRow: Number(e.target.value) }))}
                  className="w-full px-3 py-2 bg-[#1A1208] border border-[#5D4037] rounded text-[#D4A574] focus:outline-none focus:border-[#D4A574]"
                >
                  <option value={1}>第一层</option>
                  <option value={2}>第二层</option>
                  <option value={3}>第三层</option>
                </select>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm text-[#8B7355] mb-2">颜色</label>
            <div className="flex flex-wrap gap-2">
              {bookColors.map((c) => (
                <button
                  key={c.color}
                  onClick={() => handleColorChange(c.color, c.accent)}
                  className={`w-8 h-8 rounded border-2 transition-all ${
                    formData.color === c.color ? 'border-[#D4A574] scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c.color }}
                  title={c.name}
                />
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
              onClick={handleAddBook}
              className="px-4 py-2 bg-[#D4A574] text-[#1A1208] rounded-lg hover:bg-[#E8C89E] transition-colors font-medium"
            >
              添加
            </button>
          </div>
        </div>
      )}

      {/* 书籍列表 */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-[#2D1F0F] p-3 rounded-lg border border-[#3D2A15] flex items-center gap-3"
          >
            {/* 颜色预览 */}
            <div
              className="w-6 h-16 rounded flex-shrink-0"
              style={{ backgroundColor: book.color }}
            />

            {editingId === book.id ? (
              /* 编辑模式 */
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-2 py-1 bg-[#1A1208] border border-[#5D4037] rounded text-[#D4A574] text-sm"
                />
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                  className="w-full px-2 py-1 bg-[#1A1208] border border-[#5D4037] rounded text-[#D4A574] text-sm"
                />
                <div className="flex gap-2">
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value as Book['location'] }))}
                    className="px-2 py-1 bg-[#1A1208] border border-[#5D4037] rounded text-[#D4A574] text-sm"
                  >
                    <option value="shelf">书架</option>
                    <option value="floor">地上</option>
                    <option value="table">大桌子</option>
                    <option value="sideTable">小桌子</option>
                  </select>
                  <div className="flex gap-1">
                    {bookColors.map((c) => (
                      <button
                        key={c.color}
                        onClick={() => handleColorChange(c.color, c.accent)}
                        className={`w-5 h-5 rounded border ${
                          formData.color === c.color ? 'border-[#D4A574]' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: c.color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* 显示模式 */
              <div className="flex-1 min-w-0">
                <div className="text-[#D4A574] font-medium truncate">{book.title}</div>
                <div className="text-[#8B7355] text-sm truncate">{book.link || '无链接'}</div>
                <div className="text-[#6B4423] text-xs mt-1">
                  {locationNames[book.location]}
                  {book.shelfRow && ` · 第${book.shelfRow}层`}
                </div>
              </div>
            )}

            {/* 操作按钮 */}
            <div className="flex gap-1 flex-shrink-0">
              {editingId === book.id ? (
                <>
                  <button
                    onClick={() => handleUpdateBook(book.id)}
                    className="p-2 text-green-500 hover:bg-green-500/20 rounded transition-colors"
                    title="保存"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setFormData({
                        title: '',
                        link: '',
                        color: '#5D3A1A',
                        accent: '#C49A6C',
                        location: 'shelf',
                        shelfRow: 1,
                      });
                    }}
                    className="p-2 text-[#8B7355] hover:bg-[#3D2A15] rounded transition-colors"
                    title="取消"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(book)}
                    className="p-2 text-[#8B7355] hover:text-[#D4A574] hover:bg-[#3D2A15] rounded transition-colors"
                    title="编辑"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => deleteBook(book.id)}
                    className="p-2 text-[#8B7355] hover:text-red-400 hover:bg-red-400/20 rounded transition-colors"
                    title="删除"
                  >
                    🗑
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {books.length === 0 && (
        <div className="text-center text-[#8B7355] py-8">
          暂无书籍，点击上方按钮添加
        </div>
      )}
    </div>
  );
}
