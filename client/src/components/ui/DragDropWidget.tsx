import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

interface DragDropWidgetProps {
  children: React.ReactNode;
  className?: string;
  id: string;
  onDragStart?: (id: string) => void;
  onDragEnd?: () => void;
  draggable?: boolean;
}

export function DragDropWidget({
  children,
  className,
  id,
  onDragStart,
  onDragEnd,
  draggable = true,
}: DragDropWidgetProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    if (!draggable) return;
    
    setIsDragging(true);
    e.dataTransfer.setData("text/plain", id);
    onDragStart?.(id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    onDragEnd?.();
  };

  return (
    <div
      draggable={draggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={cn(
        "bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover relative group",
        isDragging && "opacity-50 transform rotate-1",
        draggable && "cursor-move",
        className
      )}
    >
      {draggable && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>
      )}
      {children}
    </div>
  );
}

interface DropZoneProps {
  children: React.ReactNode;
  onDrop?: (draggedId: string, droppedOnId: string) => void;
  id: string;
  className?: string;
}

export function DropZone({ children, onDrop, id, className }: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const draggedId = e.dataTransfer.getData("text/plain");
    if (draggedId !== id) {
      onDrop?.(draggedId, id);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "transition-all duration-200",
        isDragOver && "bg-purple-50 border-2 border-dashed border-app-purple",
        className
      )}
    >
      {children}
    </div>
  );
}
