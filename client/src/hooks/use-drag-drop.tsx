import { useCallback } from "react";

export function useDragDrop() {
  const processFiles = useCallback(async (files: File[], onProgress?: (progress: number) => void) => {
    // Simulate file processing with progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      onProgress?.(i);
    }
    
    // Mock successful processing
    return files.map(file => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      processed: true,
    }));
  }, []);

  return {
    processFiles,
  };
}