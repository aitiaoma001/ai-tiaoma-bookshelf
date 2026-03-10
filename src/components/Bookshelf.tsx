'use client';

import Book, { BookProps } from './Book';
import { cn } from '@/lib/utils';

interface Shelf {
  id: string;
  name: string;
  books: BookProps[];
  level: 'main' | 'loft';
  privacy?: 'public' | 'semi-private' | 'private';
}

interface BookshelfProps {
  shelves: Shelf[];
}

export default function Bookshelf({ shelves }: BookshelfProps) {
  const mainShelves = shelves.filter((s) => s.level === 'main');
  const loftShelves = shelves.filter((s) => s.level === 'loft');

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyODIiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAtMThjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTE4IDBjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-4">
            📚 我的思维书架
          </h1>
          <p className="text-lg text-amber-700 dark:text-amber-300">
            知识的殿堂，思想的栖息地
          </p>
        </div>

        {/* 跃层区域 */}
        {loftShelves.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              <span className="px-4 py-1 bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium">
                🔐 私密跃层
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            </div>

            {/* 跃层书架 */}
            <div className="relative bg-gradient-to-br from-amber-800/10 to-amber-900/10 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 border-2 border-amber-300/30 dark:border-gray-600">
              {/* 阁楼顶部 */}
              <div className="absolute -top-4 left-0 right-0 h-8 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 dark:from-gray-600 dark:via-gray-500 dark:to-gray-600 opacity-60 rounded-t-lg" />
              
              {/* 装饰：楼梯 */}
              <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 flex flex-col gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-2 bg-gradient-to-r from-amber-600 to-amber-500 dark:from-gray-600 dark:to-gray-500 rounded-sm shadow"
                    style={{ marginLeft: `${i * 8}px` }}
                  />
                ))}
              </div>

              {loftShelves.map((shelf) => (
                <div key={shelf.id} className="mb-8 last:mb-0">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm text-amber-700 dark:text-amber-300 font-medium">
                      {shelf.name}
                    </span>
                    {shelf.privacy === 'private' && (
                      <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 text-xs rounded-full">
                        🔒 需密码
                      </span>
                    )}
                  </div>
                  
                  {/* 书架隔板 */}
                  <div className="relative bg-gradient-to-b from-amber-200/50 to-amber-100/30 dark:from-gray-700 dark:to-gray-800 rounded-lg p-4 shadow-inner">
                    {/* 木纹效果 */}
                    <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-transparent via-amber-600 to-transparent rounded-lg" />
                    
                    <div className="relative flex items-end gap-4 min-h-[280px] overflow-x-auto pb-2">
                      {shelf.books.map((book) => (
                        <Book key={book.id} {...book} />
                      ))}
                    </div>
                  </div>

                  {/* 书架底部装饰 */}
                  <div className="h-4 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 dark:from-gray-600 dark:via-gray-500 dark:to-gray-600 rounded-b-lg shadow-lg mt-1" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 主层书架 */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <span className="px-4 py-1 bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium">
              📖 主藏书区
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>

          {mainShelves.map((shelf, shelfIndex) => (
            <div key={shelf.id} className="mb-10 last:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-amber-700 dark:text-amber-300 font-medium">
                  {shelf.name}
                </span>
              </div>
              
              {/* 书架隔板 */}
              <div className="relative bg-gradient-to-b from-amber-100/80 to-amber-50/60 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 shadow-inner border border-amber-200/30 dark:border-gray-700">
                {/* 木纹效果 */}
                <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-transparent via-amber-800 to-transparent rounded-lg" />
                
                <div className="relative flex items-end gap-3 min-h-[260px] overflow-x-auto pb-2 flex-wrap">
                  {shelf.books.map((book) => (
                    <Book key={book.id} {...book} />
                  ))}
                </div>
              </div>

              {/* 书架底部装饰 */}
              <div className="h-6 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-b-lg shadow-xl mt-1 relative overflow-hidden">
                {/* 木纹纹理 */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute h-px bg-amber-900/30"
                      style={{
                        top: `${(i + 1) * 25}%`,
                        left: '10%',
                        right: '10%',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 底部装饰 */}
        <div className="mt-16 text-center">
          <div className="inline-block px-6 py-3 bg-white/50 dark:bg-gray-800/50 rounded-full backdrop-blur-sm border border-amber-200 dark:border-gray-700">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              💡 书架上的每一本书，都是思维的结晶
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
