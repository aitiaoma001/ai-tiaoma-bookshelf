'use client';

import React from 'react';
import { useStudy } from '@/store/StudyContext';

export default function LayoutManager() {
  const { layout, updateLayoutElement } = useStudy();

  const handleToggleVisibility = (id: string, currentVisible: boolean) => {
    updateLayoutElement(id, { visible: !currentVisible });
  };

  const handlePositionChange = (id: string, axis: 'x' | 'y', value: string) => {
    updateLayoutElement(id, { [axis]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#D4A574]">布局管理</h3>
      
      <div className="space-y-2">
        {layout.map((element) => (
          <div
            key={element.id}
            className={`bg-[#2D1F0F] p-3 rounded-lg border transition-all ${
              element.visible ? 'border-[#3D2A15]' : 'border-[#2D1F0F] opacity-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#D4A574] font-medium">{element.name}</span>
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-sm text-[#8B7355]">显示</span>
                <div
                  className={`w-10 h-5 rounded-full transition-colors relative ${
                    element.visible ? 'bg-[#D4A574]' : 'bg-[#3D2A15]'
                  }`}
                  onClick={() => handleToggleVisibility(element.id, element.visible)}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                      element.visible ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </div>
              </label>
            </div>
            
            {element.visible && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#8B7355] mb-1">水平位置 (X)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={parseInt(element.x) || 0}
                      onChange={(e) => handlePositionChange(element.id, 'x', `${e.target.value}%`)}
                      className="flex-1 h-1 bg-[#3D2A15] rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-xs text-[#D4A574] w-12 text-right">{element.x}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#8B7355] mb-1">垂直位置 (Y)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={parseInt(element.y) || 0}
                      onChange={(e) => handlePositionChange(element.id, 'y', `${e.target.value}%`)}
                      className="flex-1 h-1 bg-[#3D2A15] rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-xs text-[#D4A574] w-12 text-right">{element.y}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
