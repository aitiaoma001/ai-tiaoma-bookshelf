// 书籍数据类型
export interface Book {
  id: string;
  title: string;
  link: string;
  color: string;
  accent: string;
  location: 'shelf' | 'floor' | 'table' | 'sideTable';
  shelfRow?: number; // 书架行号 1-3
  order?: number; // 在某个位置的顺序
}

// 布局元素类型
export interface LayoutElement {
  id: string;
  name: string;
  x: string; // 百分比
  y: string; // 百分比
  width?: string;
  height?: string;
  visible: boolean;
}

// 链接数据类型
export interface ExternalLink {
  id: string;
  title: string;
  url: string;
  icon: string;
}

// 默认书籍数据
export const defaultBooks: Book[] = [
  { id: '1', title: '人生哲学', link: '/philosophy', color: '#5D3A1A', accent: '#C49A6C', location: 'floor', order: 1 },
  { id: '2', title: '创业笔记', link: '/startup', color: '#8B4513', accent: '#D4A574', location: 'floor', order: 2 },
  { id: '3', title: '技术手册', link: '/tech', color: '#654321', accent: '#B8956E', location: 'floor', order: 3 },
  { id: '4', title: '诗词集', link: '/poetry', color: '#4A3728', accent: '#E8C89E', location: 'sideTable', order: 1 },
  { id: '5', title: '投资理财', link: '/finance', color: '#6B4423', accent: '#C49A6C', location: 'sideTable', order: 2 },
  { id: '6', title: '健康生活', link: '/health', color: '#7B5B3A', accent: '#D4A574', location: 'shelf', shelfRow: 3, order: 1 },
  { id: '7', title: '设计思维', link: '/design', color: '#5D4037', accent: '#A0826D', location: 'shelf', shelfRow: 1, order: 1 },
  { id: '8', title: '产品感悟', link: '/product', color: '#6B4423', accent: '#B8956E', location: 'shelf', shelfRow: 1, order: 2 },
];

// 默认外部链接
export const defaultExternalLinks: ExternalLink[] = [
  { id: 'l1', title: 'GitHub', url: 'https://github.com', icon: '⟨⟩' },
  { id: 'l2', title: '博客', url: 'https://blog.example.com', icon: '✦' },
  { id: 'l3', title: '作品集', url: 'https://portfolio.example.com', icon: '◈' },
  { id: 'l4', title: '联系', url: 'mailto:hello@example.com', icon: '✉' },
];

// 默认布局元素
export const defaultLayoutElements: LayoutElement[] = [
  { id: 'sofa', name: '沙发', x: '4%', y: '10%', visible: true },
  { id: 'table', name: '大桌子', x: '12%', y: '12%', visible: true },
  { id: 'lamp', name: '台灯', x: '15%', y: '24%', visible: true },
  { id: 'sideTable', name: '小桌子', x: '3%', y: '8%', visible: true },
  { id: 'bookshelf', name: '书架', x: '22%', y: '8%', visible: true },
  { id: 'painting', name: '画作', x: '8%', y: '6%', visible: true },
  { id: 'fireplace', name: '壁炉', x: '50%', y: '32%', visible: true },
  { id: 'cat', name: '猫咪', x: '22%', y: '5%', visible: true },
  { id: 'floorBooks', name: '地上书堆', x: '6%', y: '5%', visible: true },
];

// 可选颜色
export const bookColors = [
  { name: '深褐', color: '#5D3A1A', accent: '#C49A6C' },
  { name: '赭石', color: '#8B4513', accent: '#D4A574' },
  { name: '深棕', color: '#654321', accent: '#B8956E' },
  { name: '暗褐', color: '#4A3728', accent: '#E8C89E' },
  { name: '栗色', color: '#6B4423', accent: '#C49A6C' },
  { name: '棕褐', color: '#7B5B3A', accent: '#D4A574' },
  { name: '灰褐', color: '#5D4037', accent: '#A0826D' },
  { name: '茶色', color: '#8B7355', accent: '#D4A574' },
];
