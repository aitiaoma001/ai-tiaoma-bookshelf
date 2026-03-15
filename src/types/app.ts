// PWA网站数据类型
export interface AppData {
  id: string;
  name: string;
  icon: string; // 图标URL或emoji
  shortDesc: string; // 简短介绍
  fullDesc: string; // 详细介绍
  downloadUrl: string; // 访问链接
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

// 默认PWA网站数据
export const defaultApps: AppData[] = [
  {
    id: 'app-1',
    name: '任务清单',
    icon: '✅',
    shortDesc: '轻量级待办事项管理，支持离线使用',
    fullDesc: '任务清单是一款渐进式Web应用(PWA)，帮助您高效管理日常待办事项。支持离线访问、桌面安装、消息推送等PWA特性。数据本地存储，保护隐私安全。',
    downloadUrl: 'https://example.com/tasks',
    qrcodeUrl: '',
    category: '效率工具',
    tags: ['PWA', '待办', '离线'],
    createdAt: Date.now()
  },
  {
    id: 'app-2',
    name: '天气通',
    icon: '🌤️',
    shortDesc: '实时天气预报，支持桌面推送通知',
    fullDesc: '天气通是一款PWA天气应用，提供精准的实时天气预报。支持添加到主屏幕、离线缓存历史数据、恶劣天气推送预警。界面简洁，启动速度快。',
    downloadUrl: 'https://example.com/weather',
    qrcodeUrl: '',
    category: '生活服务',
    tags: ['PWA', '天气', '推送'],
    createdAt: Date.now()
  },
  {
    id: 'app-3',
    name: '笔记空间',
    icon: '📝',
    shortDesc: '云端同步笔记，跨平台无缝衔接',
    fullDesc: '笔记空间是一款支持离线编辑的PWA笔记应用。支持Markdown语法、实时云同步、跨设备访问。可安装到桌面，体验原生应用般的流畅操作。',
    downloadUrl: 'https://example.com/notes',
    qrcodeUrl: '',
    category: '效率工具',
    tags: ['PWA', '笔记', '同步'],
    createdAt: Date.now()
  },
  {
    id: 'app-4',
    name: '番茄时钟',
    icon: '🍅',
    shortDesc: '专注时间管理，提升工作效率',
    fullDesc: '番茄时钟是一款基于番茄工作法的PWA应用。支持后台运行、桌面通知提醒、统计报表。可离线使用，无需担心网络中断影响专注。',
    downloadUrl: 'https://example.com/pomodoro',
    qrcodeUrl: '',
    category: '效率工具',
    tags: ['PWA', '时间', '专注'],
    createdAt: Date.now()
  },
  {
    id: 'app-5',
    name: '图片压缩',
    icon: '🖼️',
    shortDesc: '本地图片压缩，隐私安全有保障',
    fullDesc: '图片压缩是一款完全离线运行的PWA工具。所有处理在本地完成，无需上传服务器，保护您的隐私。支持批量压缩、格式转换，效果媲美桌面软件。',
    downloadUrl: 'https://example.com/compress',
    qrcodeUrl: '',
    category: '效率工具',
    tags: ['PWA', '图片', '离线'],
    createdAt: Date.now()
  },
  {
    id: 'app-6',
    name: '密码生成器',
    icon: '🔐',
    shortDesc: '安全密码生成，本地算法更可靠',
    fullDesc: '密码生成器是一款轻量级PWA安全工具。支持自定义密码规则、批量生成、本地加密存储。无网络状态下也可正常使用，保障密码安全。',
    downloadUrl: 'https://example.com/password',
    qrcodeUrl: '',
    category: '效率工具',
    tags: ['PWA', '安全', '密码'],
    createdAt: Date.now()
  },
  {
    id: 'app-7',
    name: '投资追踪',
    icon: '📈',
    shortDesc: '投资组合管理，实时行情推送',
    fullDesc: '投资追踪是一款专业的PWA金融工具。支持股票、基金行情追踪，价格预警推送，投资组合分析。可安装到桌面，随时查看市场动态。',
    downloadUrl: 'https://example.com/invest',
    qrcodeUrl: '',
    category: '金融投资',
    tags: ['PWA', '投资', '行情'],
    createdAt: Date.now()
  }
];

// 默认评论数据
export const defaultComments: Comment[] = [
  {
    id: 'c1',
    appId: 'app-1',
    author: '小明',
    content: '非常好用，离线也能访问！',
    rating: 5,
    createdAt: Date.now() - 86400000
  },
  {
    id: 'c2',
    appId: 'app-1',
    author: '测试用户',
    content: '添加到桌面后体验很流畅',
    rating: 4,
    createdAt: Date.now() - 172800000
  }
];

// 分类列表
export const categories = [
  '全部',
  '效率工具',
  '金融投资',
  '生活服务',
  '社交通讯',
  '学习教育',
  '其他'
];
