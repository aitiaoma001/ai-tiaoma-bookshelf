'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApps, useAuth } from '@/store/AppContext';
import { AppData, categories } from '@/types/app';

type TabType = 'apps' | 'comments';

export default function AdminPage() {
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  const { apps, comments, addApp, updateApp, deleteApp, deleteComment } = useApps();
  const [activeTab, setActiveTab] = useState<TabType>('apps');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // 新增/编辑APP状态
  const [editingApp, setEditingApp] = useState<AppData | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    icon: '📱',
    shortDesc: '',
    fullDesc: '',
    downloadUrl: '',
    qrcodeUrl: '',
    category: '效率工具',
    tags: ''
  });

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
    setEditingApp(null);
    setFormData({
      name: '',
      icon: '📱',
      shortDesc: '',
      fullDesc: '',
      downloadUrl: '',
      qrcodeUrl: '',
      category: '效率工具',
      tags: ''
    });
    setShowForm(true);
  };

  // 打开编辑表单
  const handleEdit = (app: AppData) => {
    setEditingApp(app);
    setFormData({
      name: app.name,
      icon: app.icon,
      shortDesc: app.shortDesc,
      fullDesc: app.fullDesc,
      downloadUrl: app.downloadUrl,
      qrcodeUrl: app.qrcodeUrl,
      category: app.category,
      tags: app.tags.join(', ')
    });
    setShowForm(true);
  };

  // 保存APP
  const handleSave = () => {
    const appData = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    if (editingApp) {
      updateApp(editingApp.id, appData);
    } else {
      addApp(appData);
    }
    setShowForm(false);
  };

  // 删除网站
  const handleDelete = (id: string) => {
    if (confirm('确定删除此网站？')) {
      deleteApp(id);
    }
  };

  // 图标选择
  const iconOptions = ['📱', '🎮', '🛠️', '📚', '💪', '🎨', '🎵', '📷', '💰', '🌐', '🔒', '⚡', '🚀', '💬', '📊'];

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
          <div className="login-logo">◇</div>
          <h1>后台管理</h1>
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="password"
              placeholder="请输入管理密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              autoFocus
            />
            {error && <div className="login-error">{error}</div>}
            <button type="submit" className="login-btn">进入后台</button>
          </form>
          <Link href="/" className="login-back">← 返回首页</Link>
        </div>
      </div>
    );
  }

  // 已登录 - 管理界面
  return (
    <div className="app-container admin-page">
      <div className="bg-grid"></div>
      
      {/* 头部 */}
      <header className="header">
        <div className="header-inner">
          <div className="header-left">
            <Link href="/" className="back-link">
              <span>←</span>
              <span>返回首页</span>
            </Link>
            <h1 className="page-title">后台管理</h1>
          </div>
          <div className="header-actions">
            <Link href="/diary" className="btn-diary">📖 日记本</Link>
            <button onClick={logout} className="btn-logout">退出登录</button>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="main admin-main">
        {/* Tab切换 */}
        <div className="admin-tabs">
          <button 
            className={`admin-tab ${activeTab === 'apps' ? 'active' : ''}`}
            onClick={() => setActiveTab('apps')}
          >
            网站管理 ({apps.length})
          </button>
          <button 
            className={`admin-tab ${activeTab === 'comments' ? 'active' : ''}`}
            onClick={() => setActiveTab('comments')}
          >
            留言管理 ({comments.length})
          </button>
        </div>

        {/* 网站管理 */}
        {activeTab === 'apps' && (
          <div className="admin-content">
            <div className="admin-actions">
              <button onClick={handleAddNew} className="btn-add">+ 添加网站</button>
            </div>
            
            <div className="admin-list">
              {apps.map(app => (
                <div key={app.id} className="admin-item">
                  <div className="item-icon">{app.icon}</div>
                  <div className="item-info">
                    <div className="item-name">{app.name}</div>
                    <div className="item-desc">{app.shortDesc}</div>
                  </div>
                  <div className="item-actions">
                    <button onClick={() => handleEdit(app)} className="btn-edit">编辑</button>
                    <button onClick={() => handleDelete(app.id)} className="btn-delete">删除</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 留言管理 */}
        {activeTab === 'comments' && (
          <div className="admin-content">
            <div className="admin-list">
              {comments.map(comment => {
                const app = apps.find(a => a.id === comment.appId);
                return (
                  <div key={comment.id} className="admin-item comment-item-admin">
                    <div className="item-info">
                      <div className="item-name">
                        {comment.author} 
                        <span className="comment-rating-admin">
                          {'★'.repeat(comment.rating)}{'☆'.repeat(5 - comment.rating)}
                        </span>
                      </div>
                      <div className="item-desc">{comment.content}</div>
                      <div className="comment-app-name">网站: {app?.name || '未知'}</div>
                    </div>
                    <div className="item-actions">
                      <button onClick={() => deleteComment(comment.id)} className="btn-delete">删除</button>
                    </div>
                  </div>
                );
              })}
              {comments.length === 0 && <div className="empty-tip">暂无留言</div>}
            </div>
          </div>
        )}
      </main>

      {/* 编辑弹窗 */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingApp ? '编辑网站' : '添加网站'}</h2>
              <button onClick={() => setShowForm(false)} className="modal-close">×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>图标</label>
                <div className="icon-picker">
                  {iconOptions.map(icon => (
                    <button
                      key={icon}
                      className={`icon-option ${formData.icon === icon ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, icon })}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>名称</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                    placeholder="网站名称"
                  />
                </div>
                <div className="form-group">
                  <label>分类</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="form-select"
                  >
                    {categories.filter(c => c !== '全部').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>简短介绍</label>
                <input
                  type="text"
                  value={formData.shortDesc}
                  onChange={e => setFormData({ ...formData, shortDesc: e.target.value })}
                  className="form-input"
                  placeholder="一句话介绍"
                />
              </div>
              <div className="form-group">
                <label>详细介绍</label>
                <textarea
                  value={formData.fullDesc}
                  onChange={e => setFormData({ ...formData, fullDesc: e.target.value })}
                  className="form-textarea"
                  placeholder="详细介绍网站功能..."
                  rows={4}
                />
              </div>
              <div className="form-group">
                <label>标签 (逗号分隔)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={e => setFormData({ ...formData, tags: e.target.value })}
                  className="form-input"
                  placeholder="PWA, 工具, 效率"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>访问链接</label>
                  <input
                    type="text"
                    value={formData.downloadUrl}
                    onChange={e => setFormData({ ...formData, downloadUrl: e.target.value })}
                    className="form-input"
                    placeholder="https://..."
                  />
                </div>
                <div className="form-group">
                  <label>二维码图片URL</label>
                  <input
                    type="text"
                    value={formData.qrcodeUrl}
                    onChange={e => setFormData({ ...formData, qrcodeUrl: e.target.value })}
                    className="form-input"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowForm(false)} className="btn-cancel">取消</button>
              <button onClick={handleSave} className="btn-save">保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
