import { useCallback, useState } from "react";
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useDragDrop } from "@/hooks/use-drag-drop";

interface FileUpload {
  id: string;
  file: File;
  progress: number;
  status: "uploading" | "completed" | "error";
  error?: string;
}

interface DragDropZoneProps {
  onFilesUploaded?: (files: File[]) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  multiple?: boolean;
  description?: string;
}

export default function DragDropZone({
  onFilesUploaded,
  acceptedFileTypes = [".pdf", ".jpg", ".jpeg", ".png", ".csv", ".xlsx"],
  maxFileSize = 10 * 1024 * 1024, // 10MB
  multiple = true,
  description = "Drag and drop files here, or click to browse"
}: DragDropZoneProps) {
  const [uploads, setUploads] = useState<FileUpload[]>([]);
  const { processFiles } = useDragDrop();

  // Simple drag and drop implementation without react-dropzone
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newUploads = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      progress: 0,
      status: "uploading" as const
    }));

    setUploads(prev => [...prev, ...newUploads]);

    // Simulate file processing
    for (const upload of newUploads) {
      try {
        await processFiles([upload.file], (progress) => {
          setUploads(prev => prev.map(u => 
            u.id === upload.id ? { ...u, progress } : u
          ));
        });

        setUploads(prev => prev.map(u => 
          u.id === upload.id ? { ...u, status: "completed", progress: 100 } : u
        ));
      } catch (error) {
        setUploads(prev => prev.map(u => 
          u.id === upload.id ? { 
            ...u, 
            status: "error", 
            error: error instanceof Error ? error.message : "Upload failed"
          } : u
        ));
      }
    }

    if (onFilesUploaded) {
      onFilesUploaded(acceptedFiles);
    }
  }, [processFiles, onFilesUploaded]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => {
      const extension = '.' + file.name.split('.').pop()?.toLowerCase();
      return acceptedFileTypes.includes(extension) && file.size <= maxFileSize;
    });
    
    if (validFiles.length > 0) {
      onDrop(multiple ? validFiles : [validFiles[0]]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onDrop(multiple ? files : [files[0]]);
    }
  };

  const removeUpload = (id: string) => {
    setUploads(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive 
            ? "border-app-purple bg-purple-50" 
            : "border-gray-300 hover:border-app-purple hover:bg-gray-50"
        }`}
      >
        <input 
          type="file"
          multiple={multiple}
          accept={acceptedFileTypes.join(',')}
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
        />
        
        <div className="w-16 h-16 mx-auto mb-4 app-purple bg-opacity-10 rounded-lg flex items-center justify-center">
          <Upload className="w-8 h-8 text-app-purple" />
        </div>
        
        <h3 className="text-lg font-semibold text-app-black mb-2">
          {isDragActive ? "Drop files here" : "Upload Documents"}
        </h3>
        
        <p className="text-gray-600 mb-4">{description}</p>
        
        <Button 
          className="app-purple hover:app-purple-light"
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          Choose Files
        </Button>
        
        <p className="text-xs text-gray-500 mt-2">
          Supports: {acceptedFileTypes.join(", ")} up to {Math.round(maxFileSize / (1024 * 1024))}MB
        </p>
      </div>

      {/* Upload Progress */}
      {uploads.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-app-black">Uploaded Files</h4>
          
          {uploads.map(upload => (
            <div key={upload.id} className="flex items-center space-x-3 p-4 bg-white rounded-lg border">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <File className="w-5 h-5 text-gray-600" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-app-black">
                    {upload.file.name}
                  </p>
                  <div className="flex items-center space-x-2">
                    {upload.status === "completed" && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                    {upload.status === "error" && (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeUpload(upload.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Progress value={upload.progress} className="flex-1 h-2" />
                  <span className="text-xs text-gray-500">
                    {upload.status === "completed" ? "Complete" : `${upload.progress}%`}
                  </span>
                </div>
                
                {upload.error && (
                  <p className="text-xs text-red-600 mt-1">{upload.error}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
