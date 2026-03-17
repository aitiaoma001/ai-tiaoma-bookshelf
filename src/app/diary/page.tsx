'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDiary } from '@/store/DiaryContext';
import { useAuth } from '@/store/AppContext';
import { Diary, moodOptions, weatherOptions } from '@/types/diary';
import { QuickLink, iconOptions } from '@/types/links';

export default function DiaryPage() {
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  const { diaries, addDiary, updateDiary, deleteDiary } = useDiary();
  
  // 常用链接状态
  const [quickLinks, setQuickLinks] = useState<QuickLink[]>([]);
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [editingLink, setEditingLink] = useState<QuickLink | null>(null);
  const [linkFormData, setLinkFormData] = useState({ title: '', url: '', icon: '🔗' });
  
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [editingDiary, setEditingDiary] = useState<Diary | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [viewDiary, setViewDiary] = useState<Diary | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mood: '😊',
    weather: '☀️',
    tags: ''
  });

  // 加载常用链接
  useEffect(() => {
    const savedLinks = localStorage.getItem('quick-links');
    if (savedLinks) {
      setQuickLinks(JSON.parse(savedLinks));
    }
  }, []);

  // 保存常用链接
  useEffect(() => {
    if (quickLinks.length > 0 || localStorage.getItem('quick-links')) {
      localStorage.setItem('quick-links', JSON.stringify(quickLinks));
    }
  }, [quickLinks]);

  // 添加/编辑链接
  const handleSaveLink = () => {
    if (!linkFormData.title.trim() || !linkFormData.url.trim()) return;
    
    if (editingLink) {
      setQuickLinks(prev => prev.map(l => 
        l.id === editingLink.id 
          ? { ...l, ...linkFormData }
          : l
      ));
    } else {
      const newLink: QuickLink = {
        id: `link-${Date.now()}`,
        ...linkFormData,
        createdAt: Date.now()
      };
      setQuickLinks(prev => [...prev, newLink]);
    }
    setShowLinkForm(false);
    setEditingLink(null);
    setLinkFormData({ title: '', url: '', icon: '🔗' });
  };

  // 删除链接
  const handleDeleteLink = (id: string) => {
    if (confirm('确定删除此链接？')) {
      setQuickLinks(prev => prev.filter(l => l.id !== id));
    }
  };

  // 打开编辑链接
  const handleEditLink = (link: QuickLink) => {
    setEditingLink(link);
    setLinkFormData({ title: link.title, url: link.url, icon: link.icon });
    setShowLinkForm(true);
  };

  // 登录处理
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setError('');
    } else {
      setError('密码错误');
      setPassword('');
    }
  };

  // 打开新增表单
  const handleAddNew = () => {
    setEditingDiary(null);
    setFormData({
      title: '',
      content: '',
      mood: '😊',
      weather: '☀️',
      tags: ''
    });
    setShowForm(true);
  };

  // 打开编辑表单
  const handleEdit = (diary: Diary) => {
    setEditingDiary(diary);
    setFormData({
      title: diary.title,
      content: diary.content,
      mood: diary.mood,
      weather: diary.weather,
      tags: diary.tags.join(', ')
    });
    setShowForm(true);
    setViewDiary(null);
  };

  // 保存日记
  const handleSave = () => {
    const diaryData = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    if (editingDiary) {
      updateDiary(editingDiary.id, diaryData);
    } else {
      addDiary(diaryData);
    }
    setShowForm(false);
    setEditingDiary(null);
  };

  // 删除日记
  const handleDelete = (id: string) => {
    if (confirm('确定删除这篇日记？')) {
      deleteDiary(id);
      setViewDiary(null);
    }
  };

  // 格式化日期
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  // 加载中
  if (isLoading) {
    return (
      <div className="app-container loading-page">
        <div className="loading-text">加载中...</div>
      </div>
    );
  }

  // 未登录
  if (!isAuthenticated) {
    return (
      <div className="app-container login-page">
        <div className="bg-grid"></div>
        <div className="login-box">
          <div className="login-logo">📖</div>
          <h1>私密日记本</h1>
          <p className="login-desc">仅自己可见</p>
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="password"
              placeholder="请输入密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              autoFocus
            />
            {error && <div className="login-error">{error}</div>}
            <button type="submit" className="login-btn">进入日记本</button>
          </form>
          <Link href="/" className="login-back">← 返回首页</Link>
        </div>
      </div>
    );
  }

  // 查看日记详情
  if (viewDiary) {
    return (
      <div className="app-container diary-page">
        <div className="bg-grid"></div>
        
        <header className="header">
          <div className="header-inner">
            <button onClick={() => setViewDiary(null)} className="back-link">
              <span>←</span>
              <span>返回列表</span>
            </button>
            <div className="header-actions">
              <button onClick={() => handleEdit(viewDiary)} className="btn-edit">编辑</button>
              <button onClick={() => handleDelete(viewDiary.id)} className="btn-delete">删除</button>
            </div>
          </div>
        </header>

        <main className="main diary-main">
          <div className="diary-layout">
            <div className="diary-content">
              <div className="diary-view">
                <div className="diary-view-header">
                  <div className="diary-view-meta">
                    <span className="diary-mood">{viewDiary.mood}</span>
                    <span className="diary-weather">{viewDiary.weather}</span>
                    <span className="diary-date">{formatDate(viewDiary.createdAt)}</span>
                  </div>
                  <h1 className="diary-view-title">{viewDiary.title}</h1>
                  {viewDiary.tags.length > 0 && (
                    <div className="diary-view-tags">
                      {viewDiary.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="diary-view-content">
                  {viewDiary.content.split('\n').map((line, i) => (
                    <p key={i}>{line || '\u00A0'}</p>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 右侧常用链接 */}
            <aside className="diary-sidebar">
              <div className="quick-links-card">
                <div className="quick-links-header">
                  <h3>常用链接</h3>
                  <button onClick={() => { setEditingLink(null); setLinkFormData({ title: '', url: '', icon: '🔗' }); setShowLinkForm(true); }} className="btn-add-link">+</button>
                </div>
                <div className="quick-links-list">
                  {quickLinks.map(link => (
                    <div key={link.id} className="quick-link-item">
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="quick-link-a">
                        <span className="link-icon">{link.icon}</span>
                        <span className="link-title">{link.title}</span>
                      </a>
                      <div className="link-actions">
                        <button onClick={() => handleEditLink(link)} className="link-btn-edit">✎</button>
                        <button onClick={() => handleDeleteLink(link.id)} className="link-btn-delete">×</button>
                      </div>
                    </div>
                  ))}
                  {quickLinks.length === 0 && (
                    <div className="no-links">暂无链接</div>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </main>

        {/* 日记编辑弹窗 */}
        {showForm && (
          <div className="modal-overlay" onClick={() => setShowForm(false)}>
            <div className="modal modal-large" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editingDiary ? '编辑日记' : '写日记'}</h2>
                <button onClick={() => setShowForm(false)} className="modal-close">×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>标题</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="form-input"
                    placeholder="今天发生了什么..."
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>心情</label>
                    <div className="emoji-picker">
                      {moodOptions.map(mood => (
                        <button
                          key={mood}
                          className={`emoji-option ${formData.mood === mood ? 'active' : ''}`}
                          onClick={() => setFormData({ ...formData, mood })}
                        >
                          {mood}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>天气</label>
                    <div className="emoji-picker">
                      {weatherOptions.map(weather => (
                        <button
                          key={weather}
                          className={`emoji-option ${formData.weather === weather ? 'active' : ''}`}
                          onClick={() => setFormData({ ...formData, weather })}
                        >
                          {weather}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>内容</label>
                  <textarea
                    value={formData.content}
                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                    className="form-textarea form-textarea-large"
                    placeholder="写下今天的故事..."
                    rows={12}
                  />
                </div>
                <div className="form-group">
                  <label>标签 (逗号分隔)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={e => setFormData({ ...formData, tags: e.target.value })}
                    className="form-input"
                    placeholder="生活, 随笔"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button onClick={() => setShowForm(false)} className="btn-cancel">取消</button>
                <button onClick={handleSave} className="btn-save">保存</button>
              </div>
            </div>
          </div>
        )}

        {/* 链接编辑弹窗 */}
        {showLinkForm && (
          <div className="modal-overlay" onClick={() => setShowLinkForm(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editingLink ? '编辑链接' : '添加链接'}</h2>
                <button onClick={() => setShowLinkForm(false)} className="modal-close">×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>图标</label>
                  <div className="emoji-picker">
                    {iconOptions.map(icon => (
                      <button
                        key={icon}
                        className={`emoji-option ${linkFormData.icon === icon ? 'active' : ''}`}
                        onClick={() => setLinkFormData({ ...linkFormData, icon })}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>标题</label>
                  <input
                    type="text"
                    value={linkFormData.title}
                    onChange={e => setLinkFormData({ ...linkFormData, title: e.target.value })}
                    className="form-input"
                    placeholder="链接名称"
                  />
                </div>
                <div className="form-group">
                  <label>网址</label>
                  <input
                    type="url"
                    value={linkFormData.url}
                    onChange={e => setLinkFormData({ ...linkFormData, url: e.target.value })}
                    className="form-input"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button onClick={() => setShowLinkForm(false)} className="btn-cancel">取消</button>
                <button onClick={handleSaveLink} className="btn-save">保存</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 日记列表页面
  return (
    <div className="app-container diary-page">
      <div className="bg-grid"></div>
      
      <header className="header">
        <div className="header-inner">
          <div className="header-left">
            <Link href="/" className="back-link">
              <span>←</span>
              <span>返回首页</span>
            </Link>
            <h1 className="page-title">📖 私密日记本</h1>
          </div>
          <button onClick={logout} className="btn-logout">退出</button>
        </div>
      </header>

      <main className="main diary-main">
        <div className="diary-layout">
          <div className="diary-content">
            <div className="diary-actions">
              <button onClick={handleAddNew} className="btn-add">+ 写日记</button>
              <span className="diary-count">共 {diaries.length} 篇</span>
            </div>

            <div className="diary-list">
              {diaries.map(diary => (
                <div 
                  key={diary.id} 
                  className="diary-item"
                  onClick={() => setViewDiary(diary)}
                >
                  <div className="diary-item-header">
                    <span className="diary-mood">{diary.mood}</span>
                    <span className="diary-weather">{diary.weather}</span>
                    <span className="diary-item-date">{formatDate(diary.createdAt)}</span>
                  </div>
                  <h3 className="diary-item-title">{diary.title}</h3>
                  <p className="diary-item-content">
                    {diary.content.substring(0, 100)}...
                  </p>
                  {diary.tags.length > 0 && (
                    <div className="diary-item-tags">
                      {diary.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {diaries.length === 0 && (
                <div className="empty-diary">
                  <span className="empty-icon">📝</span>
                  <p>还没有日记</p>
                  <button onClick={handleAddNew} className="btn-add">写第一篇</button>
                </div>
              )}
            </div>
          </div>
          
          {/* 右侧常用链接 */}
          <aside className="diary-sidebar">
            <div className="quick-links-card">
              <div className="quick-links-header">
                <h3>常用链接</h3>
                <button onClick={() => { setEditingLink(null); setLinkFormData({ title: '', url: '', icon: '🔗' }); setShowLinkForm(true); }} className="btn-add-link">+</button>
              </div>
              <div className="quick-links-list">
                {quickLinks.map(link => (
                  <div key={link.id} className="quick-link-item">
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="quick-link-a">
                      <span className="link-icon">{link.icon}</span>
                      <span className="link-title">{link.title}</span>
                    </a>
                    <div className="link-actions">
                      <button onClick={() => handleEditLink(link)} className="link-btn-edit">✎</button>
                      <button onClick={() => handleDeleteLink(link.id)} className="link-btn-delete">×</button>
                    </div>
                  </div>
                ))}
                {quickLinks.length === 0 && (
                  <div className="no-links">暂无链接，点击 + 添加</div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* 日记编辑弹窗 */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal modal-large" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingDiary ? '编辑日记' : '写日记'}</h2>
              <button onClick={() => setShowForm(false)} className="modal-close">×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>标题</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="form-input"
                  placeholder="今天发生了什么..."
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>心情</label>
                  <div className="emoji-picker">
                    {moodOptions.map(mood => (
                      <button
                        key={mood}
                        className={`emoji-option ${formData.mood === mood ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, mood })}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>天气</label>
                  <div className="emoji-picker">
                    {weatherOptions.map(weather => (
                      <button
                        key={weather}
                        className={`emoji-option ${formData.weather === weather ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, weather })}
                      >
                        {weather}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>内容</label>
                <textarea
                  value={formData.content}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                  className="form-textarea form-textarea-large"
                  placeholder="写下今天的故事..."
                  rows={12}
                />
              </div>
              <div className="form-group">
                <label>标签 (逗号分隔)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={e => setFormData({ ...formData, tags: e.target.value })}
                  className="form-input"
                  placeholder="生活, 随笔"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowForm(false)} className="btn-cancel">取消</button>
              <button onClick={handleSave} className="btn-save">保存</button>
            </div>
          </div>
        </div>
      )}

      {/* 链接编辑弹窗 */}
      {showLinkForm && (
        <div className="modal-overlay" onClick={() => setShowLinkForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingLink ? '编辑链接' : '添加链接'}</h2>
              <button onClick={() => setShowLinkForm(false)} className="modal-close">×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>图标</label>
                <div className="emoji-picker">
                  {iconOptions.map(icon => (
                    <button
                      key={icon}
                      className={`emoji-option ${linkFormData.icon === icon ? 'active' : ''}`}
                      onClick={() => setLinkFormData({ ...linkFormData, icon })}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>标题</label>
                <input
                  type="text"
                  value={linkFormData.title}
                  onChange={e => setLinkFormData({ ...linkFormData, title: e.target.value })}
                  className="form-input"
                  placeholder="链接名称"
                />
              </div>
              <div className="form-group">
                <label>网址</label>
                <input
                  type="url"
                  value={linkFormData.url}
                  onChange={e => setLinkFormData({ ...linkFormData, url: e.target.value })}
                  className="form-input"
                  placeholder="https://..."
                />
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowLinkForm(false)} className="btn-cancel">取消</button>
              <button onClick={handleSaveLink} className="btn-save">保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
