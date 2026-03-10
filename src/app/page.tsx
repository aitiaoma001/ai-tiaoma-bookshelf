import type { Metadata } from 'next';
import StudyRoom from '@/components/StudyRoom';

export const metadata: Metadata = {
  title: 'AI 跳马 - 思维书房',
  description: '一个充满古典气息的虚拟书房，藏书万卷，思想无限',
  keywords: ['AI跳马', '书房', '思维', '藏书', '古典'],
};

export default function Home() {
  return <StudyRoom />;
}
