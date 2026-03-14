// APP数据类型
export interface AppData {
  id: string;
  name: string;
  icon: string; // 图标URL或emoji
  shortDesc: string; // 简短介绍
  fullDesc: string; // 详细介绍
  downloadUrl: string; // 下载链接
  qrcodeUrl: string; // 二维码图片URL
  category: string; // 分类
  tags: string[];
  createdAt: number;
}

// 评论数据类型
export interface Comment {
  id: string;
  appId: string;
  author: string;
  content: string;
  rating: number; // 1-5星
  createdAt: number;
}

// 默认APP数据
export const defaultApps: AppData[] = [
  {
    id: 'app-1',
    name: '智记账',
    icon: '📊',
    shortDesc: 'AI智能记账，自动识别消费类型',
    fullDesc: '智记账是一款基于人工智能的个人财务管理应用。支持语音记账、拍照识别票据、自动分类统计等功能。通过AI算法分析您的消费习惯，提供个性化的理财建议。',
    downloadUrl: 'https://example.com/download/zijizhang',
    qrcodeUrl: '',
    category: '效率工具',
    tags: ['财务', 'AI', '记账'],
    createdAt: Date.now()
  },
  {
    id: 'app-2',
    name: '悦动健身',
    icon: '🏃',
    shortDesc: '智能运动追踪，定制健身计划',
    fullDesc: '悦动健身为您提供专业的运动追踪和健身指导。支持多种运动模式识别，智能生成个性化训练计划，实时监测心率、卡路里消耗等数据。',
    downloadUrl: 'https://example.com/download/yuedong',
    qrcodeUrl: '',
    category: '健康生活',
    tags: ['健身', '运动', '健康'],
    createdAt: Date.now()
  },
  {
    id: 'app-3',
    name: '灵感笔记',
    icon: '📝',
    shortDesc: '创意捕捉工具，支持手写语音',
    fullDesc: '灵感笔记是一款多模态笔记应用，支持文字、手写、语音、图片等多种记录方式。内置AI助手可自动整理笔记内容，生成思维导图。',
    downloadUrl: 'https://example.com/download/linggan',
    qrcodeUrl: '',
    category: '效率工具',
    tags: ['笔记', '创意', 'AI'],
    createdAt: Date.now()
  },
  {
    id: 'app-4',
    name: '星际探索',
    icon: '🚀',
    shortDesc: '沉浸式太空探索游戏',
    fullDesc: '星际探索是一款科幻题材的太空探索游戏。在浩瀚的宇宙中探索未知星球，建造基地，发展科技，与其他玩家组成联盟共同征服银河。',
    downloadUrl: 'https://example.com/download/xingji',
    qrcodeUrl: '',
    category: '游戏娱乐',
    tags: ['游戏', '科幻', '策略'],
    createdAt: Date.now()
  },
  {
    id: 'app-5',
    name: '时光相册',
    icon: '📷',
    shortDesc: 'AI智能整理，自动生成回忆',
    fullDesc: '时光相册利用AI技术自动整理您的照片，识别人物、场景、时间，智能生成精彩回忆相册。支持云端同步，永不丢失珍贵回忆。',
    downloadUrl: 'https://example.com/download/shiguang',
    qrcodeUrl: '',
    category: '生活服务',
    tags: ['相册', 'AI', '云存储'],
    createdAt: Date.now()
  },
  {
    id: 'app-6',
    name: '极简翻译',
    icon: '🌐',
    shortDesc: '支持100+语言即时翻译',
    fullDesc: '极简翻译是一款轻量级翻译工具，支持100多种语言的即时翻译。提供文本翻译、语音翻译、拍照翻译等多种模式，离线也可使用。',
    downloadUrl: 'https://example.com/download/jijian',
    qrcodeUrl: '',
    category: '效率工具',
    tags: ['翻译', '语言', '工具'],
    createdAt: Date.now()
  }
];

// 默认评论数据
export const defaultComments: Comment[] = [
  {
    id: 'c1',
    appId: 'app-1',
    author: '用户A',
    content: '非常好用，自动分类功能很智能！',
    rating: 5,
    createdAt: Date.now() - 86400000
  },
  {
    id: 'c2',
    appId: 'app-1',
    author: '用户B',
    content: '界面简洁，功能实用',
    rating: 4,
    createdAt: Date.now() - 172800000
  }
];

// 分类列表
export const categories = [
  '全部',
  '效率工具',
  '游戏娱乐',
  '健康生活',
  '生活服务',
  '社交通讯',
  '学习教育',
  '其他'
];
