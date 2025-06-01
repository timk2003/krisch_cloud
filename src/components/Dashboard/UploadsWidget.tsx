import { UploadItem } from '../../types';
import { FileIcon, ImageIcon, FileTextIcon, FileSpreadsheetIcon } from 'lucide-react';

interface UploadsWidgetProps {
  uploads: UploadItem[];
}

const getFileIcon = (fileType: string) => {
  switch (fileType.toLowerCase()) {
    case 'image':
      return <ImageIcon size={16} className="text-blue-500" />;
    case 'document':
      return <FileTextIcon size={16} className="text-green-500" />;
    case 'spreadsheet':
      return <FileSpreadsheetIcon size={16} className="text-emerald-500" />;
    default:
      return <FileIcon size={16} className="text-gray-500" />;
  }
};

const UploadsWidget = ({ uploads }: UploadsWidgetProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm transition-all hover:shadow-md h-full">
      <h3 className="font-medium mb-3">Letzte Uploads</h3>
      <div className="space-y-2">
        {uploads.map((upload, index) => (
          <div key={index} className="flex items-center p-2 hover:bg-secondary/50 rounded-md transition-colors">
            <div className="mr-3">
              {getFileIcon(upload.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{upload.name}</p>
              <p className="text-xs text-muted-foreground">{upload.date} • {upload.size}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadsWidget;