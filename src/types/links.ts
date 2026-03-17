export interface QuickLink {
  id: string;
  title: string;
  url: string;
  icon: string;
  createdAt: number;
}

export const defaultQuickLinks: QuickLink[] = [
  {
    id: 'link-1',
    title: 'GitHub',
    url: 'https://github.com',
    icon: '🔗',
    createdAt: Date.now()
  },
  {
    id: 'link-2',
    title: 'Google',
    url: 'https://google.com',
    icon: '🔍',
    createdAt: Date.now() + 1
  }
];

export const iconOptions = ['🔗', '🔍', '📚', '💼', '🎮', '🎵', '📷', '💰', '🌐', '📱', '🛠️', '📧', '📺', '🛒', '📰'];
