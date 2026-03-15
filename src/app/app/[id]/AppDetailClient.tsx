'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useApps } from '@/store/AppContext';

export default function AppDetailClient() {
  const params = useParams();
  const appId = params.id as string;
  const { apps, getAppComments, addComment } = useApps();
  
  const app = apps.find(a => a.id === appId);
  const comments = getAppComments(appId);
  
  const [newComment, setNewComment] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);

  if (!app) {
    return (
      <div className="app-container">
        <div className="not-found">
          <span className="nf-icon">∅</span>
          <h2>应用不存在</h2>
          <Link href="/" className="btn-back">返回首页</Link>
        </div>
      </div>
    );
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && newAuthor.trim()) {
      addComment({
        appId,
        author: newAuthor,
        content: newComment,
        rating: newRating
      });
      setNewComment('');
      setNewAuthor('');
      setNewRating(5);
    }
  };

  return (
    <div className="app-container detail-page">
      <div className="bg-grid"></div>
      <div className="bg-glow"></div>

      {/* 头部导航 */}
      <header className="header">
        <div className="header-inner">
          <Link href="/" className="back-link">
            <span>←</span>
            <span>返回列表</span>
          </Link>
        </div>
      </header>

      <main className="main detail-main">
        {/* APP信息 */}
        <div className="detail-header">
          <div className="detail-icon">{app.icon}</div>
          <div className="detail-title">
            <h1>{app.name}</h1>
            <div className="detail-meta">
              <span className="category-badge">{app.category}</span>
              {app.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="detail-body">
          {/* 左侧：介绍和评论 */}
          <div className="detail-left">
            {/* 详细介绍 */}
            <section className="detail-section">
              <h2>详细介绍</h2>
              <p className="full-desc">{app.fullDesc}</p>
            </section>

            {/* 用户留言 */}
            <section className="detail-section">
              <h2>用户留言 ({comments.length})</h2>
              
              {/* 发表留言 */}
              <form className="comment-form" onSubmit={handleSubmitComment}>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="昵称"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="input-author"
                  />
                  <div className="rating-select">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        className={`star ${star <= newRating ? 'active' : ''}`}
                        onClick={() => setNewRating(star)}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="发表留言..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="input-comment"
                  />
                  <button type="submit" className="btn-submit">发送</button>
                </div>
              </form>

              {/* 留言列表 */}
              <div className="comment-list">
                {comments.map(comment => (
                  <div key={comment.id} className="comment-item">
                    <div className="comment-header">
                      <span className="comment-author">{comment.author}</span>
                      <span className="comment-rating">
                        {'★'.repeat(comment.rating)}{'☆'.repeat(5 - comment.rating)}
                      </span>
                    </div>
                    <p className="comment-content">{comment.content}</p>
                  </div>
                ))}
                {comments.length === 0 && (
                  <div className="no-comments">暂无留言，来抢沙发吧！</div>
                )}
              </div>
            </section>
          </div>

          {/* 右侧：访问 */}
          <div className="detail-right">
            <div className="download-card">
              <h3>访问网站</h3>
              <div className="qrcode-area">
                {app.qrcodeUrl ? (
                  <img src={app.qrcodeUrl} alt="访问二维码" className="qrcode-img" />
                ) : (
                  <div className="qrcode-placeholder">
                    <span>▢</span>
                    <span>扫码访问</span>
                  </div>
                )}
              </div>
              <a 
                href={app.downloadUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-download"
              >
                立即访问
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* 底部 */}
      <footer className="footer">
        <span>© 2024 AI 跳马</span>
        <Link href="/admin" className="footer-admin">管理</Link>
      </footer>
    </div>
  );
}