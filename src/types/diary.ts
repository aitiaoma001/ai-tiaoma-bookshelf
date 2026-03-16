// 日记数据类型
export interface Diary {
  id: string;
  title: string;
  content: string;
  mood: string; // 心情图标
  weather: string; // 天气图标
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

// 心情选项
export const moodOptions = ['😊', '😢', '😠', '😍', '😴', '🤔', '😎', '🥳', '😢', '😌'];

// 天气选项
export const weatherOptions = ['☀️', '⛅', '🌧️', '❄️', '🌈', '🌙', '🌡️'];

// 默认日记数据
export const defaultDiaries: Diary[] = [
  {
    id: 'd1',
    title: '今天是个好日子',
    content: '天气不错，心情也很好。网站终于上线了，接下来要继续完善功能。\n\n- PWA导航网站\n- 日记本功能\n- 更多网站推荐',
    mood: '😊',
    weather: '☀️',
    tags: ['日记', '网站'],
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 86400000
  }
];
