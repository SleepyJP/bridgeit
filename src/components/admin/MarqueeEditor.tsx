// ═══════════════════════════════════════════════════════════════════════════════
// BRIDGEIT - MARQUEE EDITOR COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import {
  Megaphone, Plus, Trash2, GripVertical, Eye, EyeOff,
  Link, Image, Sparkles, Save, RotateCcw
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useSettings } from '@/hooks/useSettings';
import { Button } from '@/components/ui/Button';
import { AdBannerItem } from '@/types/marquee.types';
import { generateId } from '@/lib/utils';

export function MarqueeEditor() {
  const {
    marqueeConfig,
    setMarqueeConfig,
    addMarqueeItem,
    updateMarqueeItem,
    removeMarqueeItem,
    reorderMarqueeItems,
    resetMarquee
  } = useSettings();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [colorTarget, setColorTarget] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(marqueeConfig.items);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    reorderMarqueeItems(items);
  };

  const handleAddItem = () => {
    const newItem: AdBannerItem = {
      id: generateId(),
      type: 'text',
      title: 'New Ad',
      subtitle: 'Click to edit',
      backgroundColor: 'rgba(255,255,255,0.1)',
      textColor: '#FFFFFF',
      accentColor: '#00FF88',
      glowEffect: true,
      isActive: true,
      priority: marqueeConfig.items.length,
    };
    addMarqueeItem(newItem);
    setEditingId(newItem.id);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const editingItem = marqueeConfig.items.find(item => item.id === editingId);

  return (
    <div className="space-y-8">
      {/* Marquee Settings */}
      <section className="bg-[var(--color-surface)] rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Megaphone className="w-5 h-5 text-[var(--color-primary)]" />
            <h3 className="text-lg font-bold text-[var(--color-text)]">Marquee Settings</h3>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={marqueeConfig.enabled}
              onChange={(e) => setMarqueeConfig({ enabled: e.target.checked })}
              className="w-5 h-5 rounded accent-[var(--color-primary)]"
            />
            <span className="text-sm text-[var(--color-text)]">Enabled</span>
          </label>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-[var(--color-text-muted)] mb-2">Position</label>
            <select
              value={marqueeConfig.position}
              onChange={(e) => setMarqueeConfig({ position: e.target.value as any })}
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-[var(--color-text)] focus:outline-none"
            >
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="both">Both</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-[var(--color-text-muted)] mb-2">Direction</label>
            <select
              value={marqueeConfig.direction}
              onChange={(e) => setMarqueeConfig({ direction: e.target.value as any })}
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-[var(--color-text)] focus:outline-none"
            >
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-[var(--color-text-muted)] mb-2">Speed</label>
            <input
              type="number"
              value={marqueeConfig.speed}
              onChange={(e) => setMarqueeConfig({ speed: parseInt(e.target.value) || 50 })}
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-[var(--color-text)] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-[var(--color-text-muted)] mb-2">Height (px)</label>
            <input
              type="number"
              value={marqueeConfig.height}
              onChange={(e) => setMarqueeConfig({ height: parseInt(e.target.value) || 60 })}
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-[var(--color-text)] focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Ad Items */}
      <section className="bg-[var(--color-surface)] rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[var(--color-text)]">Ad Items</h3>
          <Button onClick={handleAddItem} size="sm" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Item
          </Button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="marquee-items">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {marqueeConfig.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
                          editingId === item.id
                            ? 'bg-[var(--color-primary)]/20 ring-2 ring-[var(--color-primary)]'
                            : 'bg-black/20 hover:bg-black/30'
                        }`}
                      >
                        <div {...provided.dragHandleProps}>
                          <GripVertical className="w-5 h-5 text-[var(--color-text-muted)] cursor-grab" />
                        </div>

                        <div
                          className="w-10 h-10 rounded-lg flex-shrink-0"
                          style={{
                            background: item.gradientColors
                              ? `linear-gradient(135deg, ${item.gradientColors[0]}, ${item.gradientColors[1]})`
                              : item.backgroundColor,
                          }}
                        />

                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-[var(--color-text)] truncate">
                            {item.title || 'Untitled'}
                          </div>
                          <div className="text-sm text-[var(--color-text-muted)] truncate">
                            {item.subtitle || 'No subtitle'}
                          </div>
                        </div>

                        <button
                          onClick={() => updateMarqueeItem(item.id, { isActive: !item.isActive })}
                          className="p-2 hover:bg-white/10 rounded-lg"
                        >
                          {item.isActive ? (
                            <Eye className="w-5 h-5 text-[var(--color-success)]" />
                          ) : (
                            <EyeOff className="w-5 h-5 text-[var(--color-text-muted)]" />
                          )}
                        </button>

                        <button
                          onClick={() => setEditingId(editingId === item.id ? null : item.id)}
                          className="p-2 hover:bg-white/10 rounded-lg"
                        >
                          <Sparkles className="w-5 h-5 text-[var(--color-primary)]" />
                        </button>

                        <button
                          onClick={() => removeMarqueeItem(item.id)}
                          className="p-2 hover:bg-[var(--color-error)]/20 rounded-lg"
                        >
                          <Trash2 className="w-5 h-5 text-[var(--color-error)]" />
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>

      {/* Edit Panel */}
      {editingItem && (
        <section className="bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-primary)]/50">
          <h3 className="text-lg font-bold text-[var(--color-text)] mb-4">
            Edit: {editingItem.title || 'Untitled'}
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[var(--color-text-muted)] mb-2">Title</label>
              <input
                type="text"
                value={editingItem.title || ''}
                onChange={(e) => updateMarqueeItem(editingItem.id, { title: e.target.value })}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-[var(--color-text)] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--color-text-muted)] mb-2">Subtitle</label>
              <input
                type="text"
                value={editingItem.subtitle || ''}
                onChange={(e) => updateMarqueeItem(editingItem.id, { subtitle: e.target.value })}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-[var(--color-text)] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--color-text-muted)] mb-2">Icon URL</label>
              <input
                type="text"
                value={editingItem.icon || ''}
                onChange={(e) => updateMarqueeItem(editingItem.id, { icon: e.target.value })}
                placeholder="https://..."
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-[var(--color-text)] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--color-text-muted)] mb-2">Link URL</label>
              <input
                type="text"
                value={editingItem.linkUrl || ''}
                onChange={(e) => updateMarqueeItem(editingItem.id, { linkUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-[var(--color-text)] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={editingItem.glowEffect || false}
                onChange={(e) => updateMarqueeItem(editingItem.id, { glowEffect: e.target.checked })}
                className="w-5 h-5 rounded accent-[var(--color-primary)]"
              />
              <span className="text-sm text-[var(--color-text)]">Glow Effect</span>
            </label>
          </div>

          {/* Color Pickers */}
          <div className="flex gap-4 mt-4">
            {['backgroundColor', 'textColor', 'accentColor', 'borderColor'].map((colorKey) => (
              <button
                key={colorKey}
                onClick={() => setColorTarget(colorTarget === colorKey ? null : colorKey)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg ${
                  colorTarget === colorKey ? 'ring-2 ring-[var(--color-primary)]' : ''
                }`}
              >
                <div
                  className="w-8 h-8 rounded border border-white/20"
                  style={{ backgroundColor: (editingItem as any)[colorKey] || '#000' }}
                />
                <span className="text-xs text-[var(--color-text-muted)]">
                  {colorKey.replace('Color', '').replace('background', 'BG')}
                </span>
              </button>
            ))}
          </div>

          {colorTarget && (
            <div className="mt-4 flex justify-center">
              <HexColorPicker
                color={(editingItem as any)[colorTarget] || '#000000'}
                onChange={(color) => updateMarqueeItem(editingItem.id, { [colorTarget]: color })}
              />
            </div>
          )}
        </section>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={resetMarquee} className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset to Default
        </Button>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
